export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
        return res.status(500).json({ error: 'Configuration Cloudinary manquante sur le serveur.' });
    }

    const authHeader = 'Basic ' + Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64');
    const baseUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`;

    // ─── GET: liste toutes les annonces ───────────────────────────────────────
    if (req.method === 'GET') {
        try {
            const response = await fetch(
                `${baseUrl}/resources/image?type=upload&prefix=carxlab/annonces&context=true&tags=true&max_results=100`,
                { headers: { Authorization: authHeader } }
            );

            if (!response.ok) {
                const err = await response.json();
                return res.status(response.status).json({ error: err.error?.message || 'Erreur Cloudinary' });
            }

            const data = await response.json();

            // Grouping by carId
            const groupedAnnonces = {};

            (data.resources || []).forEach((r) => {
                const ctx = r.context?.custom || {};
                const carId = ctx.carId || r.public_id; // Fallback to public_id for legacy ads

                if (!groupedAnnonces[carId]) {
                    groupedAnnonces[carId] = {
                        id: carId,
                        publicIds: [],
                        photos: [],
                        marque: ctx.marque || '',
                        modele: ctx.modele || '',
                        annee: ctx.annee || '',
                        km: ctx.km || '',
                        prix: ctx.prix || '',
                        carburant: ctx.carburant || '',
                        transmission: ctx.transmission || '',
                        couleur: ctx.couleur || '',
                        description: ctx.description || '',
                        created_at: r.created_at,
                    };
                }

                groupedAnnonces[carId].publicIds.push(r.public_id);
                groupedAnnonces[carId].photos.push({
                    url: r.secure_url,
                    type: ctx.type || 'exterior',
                    isMain: ctx.isMain === 'true' || ctx.isMain === true || !ctx.type
                });

                // Update metadata if this is the "main" photo or if the current metadata is empty
                if (ctx.isMain === 'true' || !groupedAnnonces[carId].marque) {
                    groupedAnnonces[carId].marque = ctx.marque || groupedAnnonces[carId].marque;
                    groupedAnnonces[carId].modele = ctx.modele || groupedAnnonces[carId].modele;
                    groupedAnnonces[carId].prix = ctx.prix || groupedAnnonces[carId].prix;
                    groupedAnnonces[carId].url = r.secure_url; // Main image URL for preview
                }
            });

            const annonces = Object.values(groupedAnnonces)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            return res.json({ annonces });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // ─── DELETE: supprimer une annonce (un ou plusieurs public_ids) ─────────────
    if (req.method === 'DELETE') {
        const publicIdsPath = req.query.ids || req.query.id;
        if (!publicIdsPath) return res.status(400).json({ error: 'Paramètre ids requis' });

        const publicIds = publicIdsPath.split(',');
        const idsQuery = publicIds.map(id => `public_ids[]=${encodeURIComponent(id)}`).join('&');

        try {
            const response = await fetch(
                `${baseUrl}/resources/image/upload?${idsQuery}`,
                { method: 'DELETE', headers: { Authorization: authHeader } }
            );

            if (!response.ok) {
                const err = await response.json();
                return res.status(response.status).json({ error: err.error?.message || 'Erreur suppression' });
            }

            const data = await response.json();
            return res.json({ success: true, deleted: data.deleted });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // ─── PUT: mettre à jour les métadonnées (context) d'un ou plusieurs public_ids ─
    if (req.method === 'PUT') {
        try {
            const { publicIds, context } = await req.json();
            if (!publicIds || !context) return res.status(400).json({ error: 'publicIds et context requis' });

            const contextStr = Object.entries(context)
                .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
                .join('|');

            const params = new URLSearchParams();
            publicIds.forEach(id => params.append('public_ids[]', id));
            params.append('command', 'add');
            params.append('context', contextStr);

            const response = await fetch(`${baseUrl}/resources/context`, {
                method: 'POST',
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            if (!response.ok) {
                const err = await response.json();
                return res.status(response.status).json({ error: err.error?.message || 'Erreur mise à jour context' });
            }

            const data = await response.json();
            return res.json({ success: true, updated: data.updated });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}
