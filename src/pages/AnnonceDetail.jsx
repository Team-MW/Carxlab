import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Gauge, Zap, Settings2, Calendar,
    Palette, Info, Phone, MessageSquare,
    ShieldCheck, Star, ArrowRight
} from 'lucide-react';

const formatPrix = (prix) =>
    Number(prix).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const formatKm = (km) =>
    Number(km).toLocaleString('fr-FR') + ' km';

const AnnonceDetail = () => {
    const { id } = useParams();
    const [annonce, setAnnonce] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnonce = async () => {
            try {
                const res = await fetch('/api/annonces');
                const data = await res.json();
                // On cherche l'annonce par son public_id (id dans l'URL)
                const found = data.annonces.find(a => a.id === decodeURIComponent(id));
                if (found) {
                    setAnnonce(found);
                } else {
                    setError("Annonce introuvable");
                }
            } catch (err) {
                console.error('Erreur:', err);
                setError("Erreur de chargement");
            }
            setLoading(false);
        };
        fetchAnnonce();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-black flex-center">
            <div className="w-12 h-12 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
        </div>
    );

    if (error || !annonce) return (
        <div className="min-h-screen bg-black flex-center-col gap-6 text-center px-4">
            <h1 className="text-4xl font-black text-white/20 uppercase tracking-tighter">Oups !</h1>
            <p className="text-white/40 max-w-md">{error || "Cette annonce n'existe plus ou a été déplacée."}</p>
        </div>
    );

    const specs = [
        { icon: <Calendar size={18} />, label: "Année", value: annonce.annee },
        { icon: <Gauge size={18} />, label: "Kilométrage", value: annonce.km ? formatKm(annonce.km) : null },
        { icon: <Zap size={18} />, label: "Énergie", value: annonce.carburant },
        { icon: <Settings2 size={18} />, label: "Boîte", value: annonce.transmission },
        { icon: <Palette size={18} />, label: "Couleur", value: annonce.couleur },
    ].filter(s => s.value);

    return (
        <div className="min-h-screen bg-[var(--bg-color)] pt-24 md:pt-60 pb-24">


            <div className="main-container mt-24 md:mt-48">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Gauche : Image & Details */}
                    <div className="lg:col-span-7 space-y-12">
                        {/* Image Principale */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-[16/10] rounded-3xl overflow-hidden glass-panel border border-white/10 group relative"
                        >
                            <img
                                src={annonce.url}
                                alt={annonce.marque}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Description */}
                        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5">
                            <div className="flex items-center gap-3 mb-8">
                                <ShieldCheck size={20} className="text-accent-gold" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/80">Description du véhicule</h2>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-white/40 text-lg leading-relaxed font-light whitespace-pre-line">
                                    {annonce.description || "Aucune description détaillée n'a été fournie pour ce véhicule. Contactez l'un de nos conseillers pour plus d'informations."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Droite : Infos & Achat */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="lg:sticky lg:top-[280px]">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-panel p-8 md:p-10 rounded-3xl border border-accent-gold/20 relative"
                            >
                                {/* Badge Rare */}
                                <div className="absolute top-0 left-10 transform -translate-y-1/2 px-4 py-1.5 bg-accent-gold text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] z-10">
                                    DISPONIBLE IMMÉDIATEMENT
                                </div>

                                <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                                    {annonce.marque} <br />
                                    <span className="gold-gradient">{annonce.modele}</span>
                                </h1>

                                <div className="text-3xl font-light text-white/80 mb-10 tracking-tight">
                                    {formatPrix(annonce.prix)}
                                </div>

                                {/* Specs Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    {specs.map((spec, i) => (
                                        <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                            <div className="text-accent-gold mb-2">{spec.icon}</div>
                                            <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">{spec.label}</div>
                                            <div className="text-sm text-white font-medium">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Call to action */}
                                <div className="space-y-4">
                                    <Link
                                        to="/contact"
                                        className="gold-button w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] shadow-[0_4px_30px_rgba(212,175,55,0.1)] hover:shadow-[0_4px_40px_rgba(212,175,55,0.2)] transition-all"
                                    >
                                        <Phone size={16} /> RÉSERVER CETTE VOITURE
                                    </Link>
                                    <button className="w-full flex items-center justify-center gap-3 py-5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                                        <MessageSquare size={16} /> Demander plus d'infos
                                    </button>
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-8 border-t border-white/5 pt-8">
                                    <div className="flex-center-col gap-2">
                                        <div className="flex text-accent-gold"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                                        <span className="text-[8px] text-white/20 uppercase font-black tracking-widest">CarXLab Quality</span>
                                    </div>
                                    <div className="h-8 w-[1px] bg-white/5" />
                                    <div className="flex-center-col gap-1">
                                        <span className="text-white font-black text-sm uppercase">12 MOIS</span>
                                        <span className="text-[8px] text-white/20 uppercase font-bold">Garantie incluse</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Conseil Expert */}
                            <div className="mt-8 p-6 bg-accent-gold/5 border border-accent-gold/10 rounded-2xl flex gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-accent-gold/30">
                                    <div className="w-full h-full bg-accent-gold/20 flex-center text-accent-gold font-black italic">CX</div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-accent-gold tracking-widest mb-1">L'avis CarXLab</p>
                                    <p className="text-xs text-white/40 leading-relaxed italic">
                                        "Un modèle d'exception dans une configuration rare. Nous avons vérifié les 120 points de contrôle caractéristiques de notre exigence."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnnonceDetail;
