import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Zap, Settings2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatPrix = (prix) =>
    Number(prix).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const formatKm = (km) =>
    Number(km).toLocaleString('fr-FR') + ' km';

const AnnonceCard = ({ annonce, index = 0 }) => {
    const { url, marque, modele, annee, km, prix, carburant, transmission, description } = annonce;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group glass-panel border border-white/5 hover:border-accent-gold/20 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                {url ? (
                    <img
                        src={url}
                        alt={`${marque} ${modele}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                        <Gauge size={40} />
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Prix badge */}
                <div className="absolute bottom-4 left-4">
                    <span className="text-accent-gold font-black text-xl drop-shadow-lg">
                        {prix ? formatPrix(prix) : 'Prix sur demande'}
                    </span>
                </div>

                {/* Année badge */}
                {annee && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full">
                        <span className="text-white/70 text-xs font-bold tracking-widest">{annee}</span>
                    </div>
                )}
            </div>

            {/* Infos */}
            <div className="p-8">
                <h3 className="font-black text-2xl uppercase tracking-tight mb-2">
                    {marque} <span className="text-white/60 font-semibold">{modele}</span>
                </h3>

                {/* Specs */}
                <div className="flex flex-wrap gap-3 my-6">
                    {km && (
                        <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/40 bg-white/5 px-3 py-1.5 rounded-full">
                            <Gauge size={10} /> {formatKm(km)}
                        </span>
                    )}
                    {carburant && (
                        <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/40 bg-white/5 px-3 py-1.5 rounded-full">
                            <Zap size={10} /> {carburant}
                        </span>
                    )}
                    {transmission && (
                        <span className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-white/40 bg-white/5 px-3 py-1.5 rounded-full">
                            <Settings2 size={10} /> {transmission}
                        </span>
                    )}
                </div>

                {description && (
                    <p className="text-white/40 text-[15px] leading-loose line-clamp-2 mb-8 font-light">
                        {description}
                    </p>
                )}

                <Link
                    to={`/stock/${encodeURIComponent(annonce.id)}`}
                    className="gold-button w-full py-4 text-xs tracking-[0.3em] font-black flex items-center justify-center gap-3 rounded-xl"
                >
                    VOIR L'ANNONCE
                </Link>
            </div>
        </motion.div>
    );
};

export default AnnonceCard;
