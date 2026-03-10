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
        // On veut qu'elle occupe environ 75% de la largeur du garage
        const targetWidth = bgImg.width * 0.75;
        const scale = targetWidth / carImg.width;
        const targetHeight = carImg.height * scale;

        // Positionner la voiture horizontalement au centre
        const x = (bgImg.width - targetWidth) / 2;

        // Positionner la voiture verticalement sur le sol
        // Le sol dans Carxlab.png commence vers le bas (environ 70% de la hauteur)
        // On ajuste pour que les roues touchent le sol
        const y = (bgImg.height * 0.88) - targetHeight;

        // Dessiner la voiture par-dessus
        ctx.drawImage(carImg, x, y, targetWidth, targetHeight);

        // Ajouter une petite ombre sous la carrosserie pour plus de réalisme
        ctx.shadowBlur = 50;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowOffsetY = 10;
        // On redessine la voiture pour que l'ombre s'applique (optionnel mais sympa)
        // ctx.drawImage(carImg, x, y, targetWidth, targetHeight);

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
