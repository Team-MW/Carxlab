import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatPrix = (prix) =>
    Number(prix).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const formatKm = (km) =>
    Number(km).toLocaleString('fr-FR') + ' km';

const AnnonceCard = ({ annonce, index = 0 }) => {
    const { url, marque, modele, annee, km, prix, carburant, transmission, description } = annonce;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="group flex flex-col gap-12"
        >
            {/* Image Wrapper - Large & Clean */}
            <Link to={`/stock/${encodeURIComponent(annonce.id)}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/5 transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                    {url ? (
                        <img
                            src={url}
                            alt={`${marque} ${modele}`}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/5 italic font-black text-8xl uppercase">
                            No Visual
                        </div>
                    )}
                    
                    {/* Minimal Price Tag */}
                    <div className="absolute top-10 right-10">
                        <div className="px-6 py-3 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full">
                            <span className="text-white font-black text-xs tracking-[0.2em]">
                                {prix ? formatPrix(prix) : 'P.S.D'}
                            </span>
                        </div>
                    </div>

                    {/* Photo count if any */}
                    {annonce.photos?.length > 1 && (
                        <div className="absolute bottom-10 left-10">
                            <span className="text-accent-gold/40 text-[9px] font-black uppercase tracking-[0.4em]">
                                {annonce.photos.length} DOSSIER PHOTOS
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Infos - Spacious & Minimal */}
            <div className="px-4 space-y-10">
                <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-accent-gold transition-colors duration-500">
                        {marque} {modele}
                    </h3>
                    <div className="flex items-center gap-6">
                        <span className="h-[2px] w-12 bg-accent-gold/20" />
                        <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">SÉLECTION OFFICIELLE 2024</p>
                    </div>
                </div>

                {/* Specs in a clean row */}
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                    {[
                        { label: 'KM', val: km ? formatKm(km) : '--' },
                        { label: 'BOÎTE', val: transmission ? transmission.toUpperCase() : '--' },
                        { label: 'ÉNERGIE', val: carburant ? carburant.toUpperCase() : '--' },
                        { label: 'ANNÉE', val: annee || '--' }
                    ].map((s, i) => (
                        <div key={i} className="space-y-2">
                            <h4 className="text-[9px] font-black text-white/10 tracking-[0.3em]">{s.label}</h4>
                            <p className="text-xs text-white/40 font-bold tracking-widest">{s.val}</p>
                        </div>
                    ))}
                </div>

                <div className="pt-6">
                    <Link
                        to={`/stock/${encodeURIComponent(annonce.id)}`}
                        className="inline-flex items-center gap-6 text-white text-[10px] font-black uppercase tracking-[0.5em] hover:text-accent-gold transition-all group/link"
                    >
                        VOIR LE DOSSIER COMPLET
                        <ArrowRight size={14} className="group-hover/link:translate-x-3 transition-all duration-500" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default AnnonceCard;
