import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Car } from 'lucide-react';
import AnnonceCard from '../components/AnnonceCard';

const CARBURANTS = ['Essence', 'Diesel', 'Hybride', 'Hybride Rechargeable', 'Électrique'];

const Stock = () => {
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterCarburant, setFilterCarburant] = useState('');
    const [filterMaxPrix, setFilterMaxPrix] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const res = await fetch('/api/annonces');
                const data = await res.json();
                setAnnonces(data.annonces || []);
            } catch (err) {
                console.error('Erreur chargement stock:', err);
            }
            setLoading(false);
        };
        fetchAnnonces();
    }, []);

    const filtered = annonces.filter((a) => {
        const matchSearch = !search || `${a.marque} ${a.modele}`.toLowerCase().includes(search.toLowerCase());
        const matchCarburant = !filterCarburant || a.carburant === filterCarburant;
        const matchPrix = !filterMaxPrix || Number(a.prix) <= Number(filterMaxPrix);
        return matchSearch && matchCarburant && matchPrix;
    });

    const hasFilters = search || filterCarburant || filterMaxPrix;

    const clearFilters = () => {
        setSearch('');
        setFilterCarburant('');
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
                        <h1 className="hero-title mb-8">
                            STOCK <span className="gold-gradient">RÉEL</span>
                        </h1>
                        <p className="text-white/40 text-lg font-light">
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

            {/* Filters Bar */}
            <div className="sticky top-[80px] md:top-[120px] z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="main-container py-4">
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un véhicule..."
                                className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 rounded-xl focus:border-accent-gold outline-none text-white/70 text-sm transition-all"
                            />
                        </div>

                        {/* Filter toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${showFilters || hasFilters
                                    ? 'border-accent-gold/40 text-accent-gold bg-accent-gold/5'
                                    : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
                                }`}
                        >
                            <SlidersHorizontal size={14} />
                            Filtres {hasFilters && `(actifs)`}
                        </button>

                        {/* Clear filters */}
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1.5 px-3 py-3 text-white/30 hover:text-white/60 text-xs transition-colors"
                            >
                                <X size={12} /> Effacer
                            </button>
                        )}
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5"
                        >
                            <div className="flex items-center gap-2">
                                <label className="text-[10px] tracking-widest uppercase text-white/40">Carburant</label>
                                <select
                                    value={filterCarburant}
                                    onChange={(e) => setFilterCarburant(e.target.value)}
                                    className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-white/70 text-sm focus:border-accent-gold outline-none"
                                >
                                    <option value="">Tous</option>
                                    {CARBURANTS.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-[10px] tracking-widest uppercase text-white/40">Prix max</label>
                                <select
                                    value={filterMaxPrix}
                                    onChange={(e) => setFilterMaxPrix(e.target.value)}
                                    className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-white/70 text-sm focus:border-accent-gold outline-none"
                                >
                                    <option value="">Illimité</option>
                                    {[50000, 100000, 150000, 200000, 300000, 500000].map((p) => (
                                        <option key={p} value={p}>{p.toLocaleString('fr-FR')} €</option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Content */}
            <section className="section-padding">
                <div className="main-container">
                    {loading ? (
                        <div className="flex-center py-32">
                            <div className="w-12 h-12 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex-center-col py-32 gap-4"
                        >
                            <Car size={48} className="text-white/10" />
                            <p className="text-white/30 text-lg font-light">
                                {hasFilters ? 'Aucun véhicule ne correspond à votre recherche' : 'Aucun véhicule disponible pour le moment'}
                            </p>
                            {hasFilters && (
                                <button onClick={clearFilters} className="gold-button-outline px-6 py-3 text-xs rounded-xl mt-2">
                                    Effacer les filtres
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <>
                            {hasFilters && (
                                <p className="text-white/30 text-sm mb-8">
                                    {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
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
        </div>
    );
};

export default Stock;
