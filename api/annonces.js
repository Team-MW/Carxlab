export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
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

            const annonces = (data.resources || [])
                .map((r) => {
                    const ctx = r.context?.custom || {};
                    return {
                        id: r.public_id,
                        url: r.secure_url,
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
                })
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            return res.json({ annonces });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    // ─── DELETE: supprimer une annonce par son public_id ──────────────────────
    if (req.method === 'DELETE') {
        const publicId = req.query.id;
        if (!publicId) return res.status(400).json({ error: 'Paramètre id requis' });

        try {
            const response = await fetch(
                `${baseUrl}/resources/image?public_ids[]=${encodeURIComponent(publicId)}`,
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

    return res.status(405).json({ error: 'Méthode non autorisée' });
}
