import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Car, RefreshCw } from 'lucide-react';
import AnnonceCard from '../components/AnnonceCard';

const CARBURANTS = ['Essence', 'Diesel', 'Hybride', 'Hybride Rechargeable', 'Électrique'];
const TRANSMISSIONS = ['Automatique', 'Manuelle'];

const Stock = () => {
    const [annonces, setAnnonces] = useState([]);
    const [marquesDisponibles, setMarquesDisponibles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterMarque, setFilterMarque] = useState('');
    const [filterCarburant, setFilterCarburant] = useState('');
    const [filterTransmission, setFilterTransmission] = useState('');
    const [filterMaxPrix, setFilterMaxPrix] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const res = await fetch('/api/annonces');
                const data = await res.json();
                const list = data.annonces || [];
                setAnnonces(list);

                // Extraire les marques uniques pour le filtre
                const uniqueMarques = [...new Set(list.map(a => a.marque).filter(Boolean))].sort();
                setMarquesDisponibles(uniqueMarques);
            } catch (err) {
                console.error('Erreur chargement stock:', err);
            }
            setLoading(false);
        };
        fetchAnnonces();
    }, []);

    const filtered = annonces.filter((a) => {
        const matchSearch = !search || `${a.marque} ${a.modele}`.toLowerCase().includes(search.toLowerCase());
        const matchMarque = !filterMarque || a.marque === filterMarque;
        const matchCarburant = !filterCarburant || a.carburant === filterCarburant;
        const matchTransmission = !filterTransmission || a.transmission === filterTransmission;
        const matchPrix = !filterMaxPrix || Number(a.prix) <= Number(filterMaxPrix);
        return matchSearch && matchMarque && matchCarburant && matchTransmission && matchPrix;
    });

    const hasFilters = search || filterMarque || filterCarburant || filterTransmission || filterMaxPrix;

    const clearFilters = () => {
        setSearch('');
        setFilterMarque('');
        setFilterCarburant('');
        setFilterTransmission('');
        setFilterMaxPrix('');
    };

    return (
        <div className="relative">
            {/* Hero */}
            <section className="page-hero">
                <div className="absolute top-0 left-0 w-[60%] h-full bg-accent-gold/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[40%] h-full bg-accent-gold/3 blur-[120px] pointer-events-none" />
                <div className="main-container relative z-10 flex-center-col text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl"
                    >
                        <div className="flex-center gap-4 mb-10">
                            <span className="h-[2px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Inventaire Exclusif</span>
                            <span className="h-[2px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                        </div>
                        <h1 className="hero-title mb-12">
                            STOCK <span className="gold-gradient">RÉEL</span>
                        </h1>
                        <p className="text-white/40 text-xl font-light leading-relaxed">
                            Notre sélection de véhicules d'exception, disponibles immédiatement.
                        </p>
                        {!loading && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-accent-gold/60 text-sm font-bold tracking-widest mt-4"
                            >
                                {annonces.length} véhicule{annonces.length !== 1 ? 's' : ''} disponible{annonces.length !== 1 ? 's' : ''}
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Luxury Control Panel */}
            <div className="sticky top-[80px] md:top-[100px] z-40 bg-black/95 backdrop-blur-3xl border-b border-white/5 py-8 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="main-container">
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

                        {/* Search Bar: Floating Pill Design */}
                        <div className="relative w-full lg:max-w-xl group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold/20 to-transparent blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full px-8 py-5 focus-within:border-accent-gold/50 focus-within:bg-white/[0.05] transition-all duration-300">
                                <Search size={22} className="text-white/10 group-focus-within:text-accent-gold transition-colors shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="MODELE, MARQUE, MOTORISATION..."
                                    className="w-full bg-transparent border-none pl-6 text-white placeholder:text-white/10 text-[11px] font-black uppercase tracking-[0.3em] outline-none"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="text-white/20 hover:text-white transition-colors ml-4">
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Actions Control */}
                        <div className="flex items-center gap-6 w-full lg:w-auto">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 border ${showFilters || hasFilters
                                    ? 'bg-accent-gold text-black border-accent-gold shadow-[0_0_40px_rgba(212,175,55,0.4)]'
                                    : 'bg-white/5 text-white/40 border-white/10 hover:border-accent-gold/50 hover:text-white'
                                    }`}
                            >
                                <SlidersHorizontal size={18} />
                                {showFilters ? 'FERMER LES OPTIONS' : 'PARAMÈTRES DE RECHERCHE'}
                            </button>

                            {hasFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="p-5 bg-white/5 border border-white/10 rounded-full text-white/40 hover:text-red-400 transition-all hover:bg-red-500/5 group"
                                    title="Réinitialiser"
                                >
                                    <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Advanced Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, scaleY: 0.95, y: -20 }}
                                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                                exit={{ opacity: 0, scaleY: 0.95, y: -20 }}
                                className="mt-12 overflow-hidden"
                            >
                                <div className="p-10 bg-white/[0.02] border border-white/[0.05] rounded-[3rem]">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                                        {[
                                            { label: 'Manufacture', value: filterMarque, setter: setFilterMarque, options: marquesDisponibles, placeholder: 'Toutes les marques' },
                                            { label: 'Propulsion', value: filterCarburant, setter: setFilterCarburant, options: CARBURANTS, placeholder: 'Toutes motorisations' },
                                            { label: 'Ingénierie', value: filterTransmission, setter: setFilterTransmission, options: TRANSMISSIONS, placeholder: 'Toutes les boîtes' },
                                            { label: 'Allocation Budget', value: filterMaxPrix, setter: setFilterMaxPrix, options: [50000, 100000, 150000, 200000, 300000, 500000, 1000000], placeholder: 'No limit', isPrice: true }
                                        ].map((f, i) => (
                                            <div key={i} className="flex flex-col gap-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="w-8 h-[1px] bg-accent-gold/40" />
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-gold/60">{f.label}</h4>
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        value={f.value}
                                                        onChange={(e) => f.setter(e.target.value)}
                                                        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white/80 text-[11px] font-black uppercase tracking-widest focus:border-accent-gold focus:bg-white/[0.08] outline-none cursor-pointer transition-all appearance-none"
                                                    >
                                                        <option value="" className="bg-black text-white/50">{f.placeholder}</option>
                                                        {f.options.map((opt) => (
                                                            <option key={opt} value={opt} className="bg-black text-white">
                                                                {f.isPrice ? `${opt.toLocaleString('fr-FR')} €` : opt}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                                        <Car size={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Content */}
            <section className="section-padding bg-black/30">
                <div className="main-container">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="h-[1px] w-12 bg-accent-gold/50" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-gold">Catalogue Live</h2>
                        </div>
                        <p className="text-white/20 text-xs font-bold tracking-widest uppercase">Sélection exclusive CarXLab</p>
                    </div>

                    {loading ? (
                        <div className="flex-center py-24">
                            <div className="w-12 h-12 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-center-col py-24 gap-8"
                        >
                            <Car size={64} className="text-white/5" />
                            <div className="text-center">
                                <p className="text-white/40 text-xl font-light mb-4">
                                    {hasFilters ? 'Aucun véhicule ne correspond à votre recherche' : 'Aucun véhicule disponible pour le moment'}
                                </p>
                                {hasFilters && (
                                    <button onClick={clearFilters} className="gold-button-outline px-10 py-5 text-[10px] rounded-full mt-6">
                                        RÉINITIALISER TOUS LES FILTRES
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            {hasFilters && (
                                <p className="text-accent-gold/40 text-[10px] font-black uppercase tracking-[0.3em] mb-12">
                                    {filtered.length} véhicule{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''} correspondant à vos critères
                                </p>
                            )}
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filtered.map((annonce, i) => (
                                    <AnnonceCard key={annonce.id} annonce={annonce} index={i} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Local SEO Text Section */}
            <section className="section-padding bg-black border-t border-white/5">
                <div className="main-container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-8">VÉHICULES D'OCCASION À TOULOUSE - LAUNAGUET</h2>
                        <div className="space-y-6 text-white/30 text-sm md:text-base font-light leading-relaxed">
                            <p>
                                Bienvenue chez <strong>CarXLab</strong>, votre garage spécialisé dans la vente de <strong>voitures d'occasion premium</strong>. Notre laboratoire automobile est stratégiquement situé à <strong>Launaguet</strong>, à quelques minutes de <strong>Toulouse</strong>, Blagnac, et l'Union. Nous sélectionnons rigoureusement chaque véhicule pour vous offrir une qualité irréprochable en Haute-Garonne.
                            </p>
                            <p>
                                Que vous recherchiez une <strong>berline de luxe</strong>, un SUV familial ou une <strong>sportive d'exception</strong>, notre catalogue live est mis à jour quotidiennement. Chaque annonce détaille précisément l'historique du véhicule, son kilométrage certifié et ses options exclusives. Nos services s'étendent à tout le secteur de <strong>Toulouse métropole</strong>, incluant Aucamville, Saint-Alban et Castelginest.
                            </p>
                            <p>
                                En plus de la vente, profitez de notre expertise gratuite pour le rachat de votre voiture cash. Nous rachetons tous types de modèles récents au meilleur prix du marché local. Faites confiance à l'expertise CarXLab pour votre prochain achat automobile dans le <strong>31</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Stock;
