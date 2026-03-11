import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ReviewCard = ({ name, date, text, rating = 5 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-10 rounded-[2.5rem] shadow-xl flex flex-col gap-6 relative group h-full"
    >
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-gold rounded-2xl flex items-center justify-center text-black shadow-lg shadow-accent-gold/20">
            <Quote size={20} fill="currentColor" />
        </div>

        <div className="flex gap-1 mb-2">
            {[...Array(rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-accent-gold text-accent-gold" />
            ))}
        </div>

        <p className="text-black/70 text-lg leading-relaxed font-light italic flex-grow">
            "{text}"
        </p>

        <div className="pt-6 border-t border-black/5 flex justify-between items-center">
            <div>
                <h4 className="text-black font-black uppercase tracking-widest text-sm">{name}</h4>
                <p className="text-black/30 text-[10px] uppercase font-bold tracking-widest mt-1">{date}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" className="w-4" />
            </div>
        </div>
    </motion.div>
);

const Reviews = () => {
    const reviews = [
        {
            name: "Jean-Pierre Durand",
            date: "Il y a 2 semaines",
            text: "Une expérience d'achat incomparable. Le protocole de vérification m'a donné une confiance totale dans mon acquisition. Équipe ultra-professionnelle.",
            rating: 5
        },
        {
            name: "Marc-Antoine Lefebvre",
            date: "Il y a 1 mois",
            text: "Service de sourcing d'une efficacité redoutable. Ils ont trouvé exactement le modèle Porsche que je cherchais en moins de 10 jours. État clinique.",
            rating: 5
        },
        {
            name: "Sophie Vallet",
            date: "Il y a 3 mois",
            text: "Vente de ma RS6 effectuée via leur plateforme. Estimation juste, paiement rapide et dossier administratif géré de A à Z. Je recommande sans hésiter.",
            rating: 5
        }
    ];

    return (
        <section className="section-padding bg-[#f8f8f8] relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03)_0%,transparent_100%)]" />

            <div className="main-container relative z-10">
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <span className="h-[2px] w-12 bg-accent-gold"></span>
                        <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Témoignages</span>
                        <span className="h-[2px] w-12 bg-accent-gold"></span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tight leading-[1.2] mb-10">
                        L'AVIS DE NOS <br /><span className="text-accent-gold">PARTENAIRES</span>
                    </h2>
                    <div className="flex justify-center items-center gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <Star className="text-accent-gold fill-accent-gold" size={24} />
                            <span className="text-black font-black text-3xl">4.9/5</span>
                        </div>
                        <div className="h-10 w-px bg-black/10"></div>
                        <p className="text-black/40 uppercase font-black tracking-widest text-[10px]">Basé sur +250 avis Google</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} {...review} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
