import { removeBackground } from '@imgly/background-removal';

/**
 * Charge une image à partir d'un fichier ou d'une URL
 */
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Traite l'image de la voiture : enlève le fond et l'incruste dans le garage.
 * @param {File} carFile - L'image originale de la voiture
 * @param {string} backgroundUrl - L'URL de l'image du garage (Carxlab.png)
 * @returns {Promise<File>} - Le fichier final (voiture + garage)
 */
export const processCarImage = async (carFile, backgroundUrl) => {
    try {
        // 1. Enlever le fond de la voiture (IA dans le navigateur)
        console.log('Suppression du fond en cours...');
        const carBlob = await removeBackground(carFile, {
            progress: (p) => console.log(`Progress: ${Math.round(p * 100)}%`),
            model: 'medium'
        });

        // 2. Charger les images pour le montage
        const carImg = await loadImage(URL.createObjectURL(carBlob));
        const bgImg = await loadImage(backgroundUrl);

        // 3. Créer le montage sur un canvas
        const canvas = document.createElement('canvas');
        canvas.width = bgImg.width;
        canvas.height = bgImg.height;
        const ctx = canvas.getContext('2d');

        // Dessiner le fond (le garage)
        ctx.drawImage(bgImg, 0, 0);

        // Calculer la taille et la position de la voiture
        // On réduit la taille pour un rendu plus réaliste (65% de la largeur)
        const targetWidth = bgImg.width * 0.65;
        const scale = targetWidth / carImg.width;
        const targetHeight = carImg.height * scale;

        // Positionner la voiture horizontalement au centre
        const x = (bgImg.width - targetWidth) / 2;

        // Positionner la voiture verticalement plus bas (94% du bas)
        // On ajuste pour que les roues "mordent" bien sur le sol réfléchi
        const y = (bgImg.height * 0.94) - targetHeight;

        // Ajouter une ombre portée plus réaliste sous la voiture
        ctx.shadowBlur = 40;
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowOffsetY = 15;

        // Dessiner la voiture par-dessus
        ctx.drawImage(carImg, x, y, targetWidth, targetHeight);

        // 4. Convertir le canvas en File pour Cloudinary
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const finalFile = new File([blob], carFile.name, { type: 'image/jpeg' });
                resolve(finalFile);
            }, 'image/jpeg', 0.9);
        });

    } catch (error) {
        console.error("Erreur lors du traitement de l'image:", error);
        throw error;
    }
};
