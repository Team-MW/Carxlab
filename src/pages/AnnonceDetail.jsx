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
    const [activePhoto, setActivePhoto] = useState(null);

    useEffect(() => {
        const fetchAnnonce = async () => {
            try {
                const res = await fetch('/api/annonces');
                const data = await res.json();
                // On cherche l'annonce par son public_id (id dans l'URL)
                const found = data.annonces.find(a => a.id === decodeURIComponent(id));
                if (found) {
                    setAnnonce(found);
                    setActivePhoto(found.url); // Use main image initially
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
        <div className="min-h-screen bg-[var(--bg-color)] pb-24">
            {/* Espaceur physique forcé par style CSS direct */}
            <div style={{ height: '120px' }} className="w-full"></div>

            <div className="main-container mt-10 md:mt-20">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Gauche : Image & Details */}
                    <div className="lg:col-span-7 space-y-20">
                        {/* Image Principale Display */}
                        <div className="relative">
                            <motion.div
                                key={activePhoto}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="aspect-square md:aspect-[16/10] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 group relative shadow-2xl"
                            >
                                <img
                                    src={activePhoto}
                                    alt={annonce.marque}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent-gold/20 rounded-tl-3xl pointer-events-none" />
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent-gold/20 rounded-br-3xl pointer-events-none" />
                        </div>

                        {/* Gallery Categories */}
                        <div className="space-y-16">
                            {/* Exterior Section */}
                            {annonce.photos?.some(p => p.type === 'exterior') && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="h-[2px] w-10 bg-accent-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
                                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white">Vues Extérieures</h3>
                                    </div>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                        {annonce.photos.filter(p => p.type === 'exterior').map((photo, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActivePhoto(photo.url)}
                                                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:scale-105 ${activePhoto === photo.url ? 'border-accent-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-white/5 hover:border-white/20 opacity-40 hover:opacity-100'}`}
                                            >
                                                <img src={photo.url} alt={`EXT ${i}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Interior Section */}
                            {annonce.photos?.some(p => p.type === 'interior') && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="h-[2px] w-10 bg-white/10" />
                                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Vues Intérieures</h3>
                                    </div>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                        {annonce.photos.filter(p => p.type === 'interior').map((photo, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActivePhoto(photo.url)}
                                                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:scale-105 ${activePhoto === photo.url ? 'border-accent-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-white/5 hover:border-white/20 opacity-30 hover:opacity-100'}`}
                                            >
                                                <img src={photo.url} alt={`INT ${i}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="glass-panel p-10 md:p-14 rounded-[2.5rem] border border-white/5 relative bg-white/[0.01]">
                            <div className="flex items-center gap-4 mb-10">
                                <ShieldCheck size={20} className="text-accent-gold" />
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">Expertise CarXLab</h2>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-white/40 text-lg leading-relaxed font-light whitespace-pre-line italic">
                                    "{annonce.description || "Aucune description détaillée n'a été fournie pour ce véhicule. Contactez l'un de nos conseillers pour plus d'informations."}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Droite : Infos & Achat */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-[160px] space-y-16">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-panel p-10 md:p-14 rounded-[3rem] border border-white/5 relative bg-white/[0.01]"
                            >
                                {/* Status Badge */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent-gold text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] z-10 whitespace-nowrap">
                                    DISPONIBLE // LAB SÉLECTION
                                </div>

                                <div className="space-y-10 text-center md:text-left">
                                    <div className="space-y-4">
                                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                            {annonce.marque} <br />
                                            <span className="gold-gradient">{annonce.modele}</span>
                                        </h1>
                                        <div className="h-px w-20 bg-accent-gold/20 mx-auto md:mx-0" />
                                    </div>

                                    <div className="text-4xl font-light text-white tracking-tighter">
                                        {formatPrix(annonce.prix)}
                                    </div>

                                    {/* Specs List (Replaced grid for more air) */}
                                    <div className="flex flex-col gap-6 pt-10 border-t border-white/5">
                                        {specs.map((spec, i) => (
                                            <div key={i} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-accent-gold/40 group-hover:text-accent-gold transition-colors">{spec.icon}</div>
                                                    <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black">{spec.label}</span>
                                                </div>
                                                <span className="text-sm text-white/60 font-medium tracking-widest uppercase">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-6 pt-10">
                                        <a
                                            href="tel:0659330312"
                                            className="gold-button w-full py-8 text-[10px] tracking-[0.4em] font-black rounded-2xl flex items-center justify-center gap-4"
                                        >
                                            <Phone size={18} /> RÉSERVER CE VÉHICULE
                                        </a>
                                        <div className="flex flex-col items-center gap-4 mt-6">
                                            <p className="text-[9px] text-white/10 uppercase font-black tracking-[0.5em]">Garanties & Financements Disponibles</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Conseil Expert - Minimal Design */}
                            <div className="px-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex-center text-accent-gold font-black italic">CX</div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-accent-gold tracking-[0.4em]">Expert CarXLab</p>
                                        <p className="text-[8px] text-white/20 uppercase font-bold tracking-widest italic">Authenticité Certifiée</p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/30 leading-relaxed font-light italic">
                                    "Cette configuration est particulièrement recherchée. Nous avons validé l'intégralité du carnet d'entretien conformément à notre charte Qualité Lab."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnnonceDetail;
