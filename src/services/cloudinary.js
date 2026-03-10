const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload une image vers Cloudinary avec les métadonnées de l'annonce dans le contexte.
 * @param {File} file - L'image sélectionnée par l'utilisateur
 * @param {Object} metadata - Les données du véhicule (marque, modele, prix, etc.)
 */
export const uploadToCloudinary = async (file, metadata) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
        throw new Error(
            "Cloudinary n'est pas configuré. Ajoutez VITE_CLOUDINARY_CLOUD_NAME et VITE_CLOUDINARY_UPLOAD_PRESET dans votre fichier .env"
        );
    }

    // Encode context: les valeurs ne doivent pas contenir | ou =
    const context = Object.entries(metadata)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${k}=${String(v).replace(/[|=]/g, ' ')}`)
        .join('|');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'carxlab/annonces');
    formData.append('tags', 'carxlab_annonce');
    if (context) formData.append('context', context);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    );

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "Erreur lors de l'upload");
    }

    return response.json();
};
