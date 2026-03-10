import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, Plus, Trash2, Eye, EyeOff, Upload, X, Check,
    Car, AlertCircle, LogOut, RefreshCw,
} from 'lucide-react';
import { uploadToCloudinary } from '../services/cloudinary';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
const MARQUES = ['Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Bentley', 'Rolls-Royce',
    'Aston Martin', 'Maserati', 'Mercedes-AMG', 'BMW M', 'Audi RS', 'Range Rover', 'Autre'];
const CARBURANTS = ['Essence', 'Diesel', 'Hybride', 'Hybride Rechargeable', 'Électrique'];
const TRANSMISSIONS = ['Automatique', 'Manuelle'];

const defaultForm = {
    marque: '', modele: '', annee: '', km: '',
    prix: '', carburant: 'Essence', transmission: 'Automatique',
    couleur: '', description: '',
};

// ─── Page Login ──────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            onLogin();
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 600);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center relative overflow-hidden pt-[var(--header-height)]">
            <div className="absolute inset-0 lab-grid opacity-50 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="scan-overlay" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`w-full max-w-md mx-4 ${shake ? 'animate-shake' : ''}`}
            >
                <div className="glass-panel border border-white/5 rounded-2xl p-10">
                    <div className="flex-center-col mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex-center mb-6">
                            <Lock size={26} className="text-accent-gold" />
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-[1px] w-8 bg-accent-gold/30" />
                            <span className="text-accent-gold text-[10px] tracking-[0.4em] uppercase font-bold">Accès Sécurisé</span>
                            <span className="h-[1px] w-8 bg-accent-gold/30" />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mt-1">Admin Panel</h1>
                        <p className="text-white/30 text-sm mt-2 font-light">CarXLab — Gestion du stock</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoFocus
                                    placeholder="••••••••••"
                                    className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} p-4 pr-12 rounded-xl focus:border-accent-gold outline-none text-white/80 transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-400/80 text-xs flex items-center gap-2 mt-1">
                                    <AlertCircle size={12} /> Mot de passe incorrect
                                </p>
                            )}
                        </div>
                        <button type="submit" className="gold-button w-full py-5 text-sm tracking-[0.2em] rounded-xl">
                            ACCÉDER AU PANEL
                        </button>
                    </form>
                </div>
            </motion.div>

            <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
        </div>
    );
};

// ─── Formulaire Nouvelle Annonce ─────────────────────────────────────────────
const AnnonceForm = ({ onSuccess, onCancel }) => {
    const [form, setForm] = useState(defaultForm);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef();

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) return alert('Veuillez sélectionner une photo principale.');
        setUploading(true);
        try {
            await uploadToCloudinary(imageFile, form);
            setSuccess(true);
            setTimeout(() => { onSuccess(); }, 2000);
        } catch (err) {
            alert("Erreur : " + err.message);
        }
        setUploading(false);
    };

    const inputCls = 'w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-accent-gold outline-none text-white/80 text-sm transition-all';
    const labelCls = 'block text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold mb-2';

    if (success) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex-center-col py-20 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex-center">
                    <Check size={28} className="text-green-400" />
                </div>
                <p className="text-green-400 font-bold uppercase tracking-widest text-sm">Annonce publiée !</p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            {/* Photo Upload */}
            <div>
                <label className={labelCls}>Photo principale *</label>
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full aspect-[4/3] border-2 border-dashed rounded-2xl cursor-pointer transition-all overflow-hidden ${imagePreview ? 'border-accent-gold/40' : 'border-white/10 hover:border-accent-gold/30'
                        }`}
                >
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex-center">
                                <p className="text-sm font-bold">Changer la photo</p>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex-center-col gap-3">
                            <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex-center">
                                <Upload size={20} className="text-accent-gold" />
                            </div>
                            <p className="text-white/40 text-sm font-bold">Glissez ou cliquez</p>
                            <p className="text-white/20 text-xs">JPG, PNG, WEBP — max 10MB</p>
                        </div>
                    )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
            </div>

            {/* Champs */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>Marque</label>
                        <input
                            type="text"
                            value={form.marque}
                            onChange={set('marque')}
                            list="marques-list"
                            placeholder="Ex: Porsche"
                            className={inputCls}
                        />
                        <datalist id="marques-list">
                            {MARQUES.map((m) => <option key={m} value={m} />)}
                        </datalist>
                    </div>
                    <div>
                        <label className={labelCls}>Modèle</label>
                        <input type="text" value={form.modele} onChange={set('modele')} placeholder="Ex: 911 GT3" className={inputCls} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>Année</label>
                        <input type="number" value={form.annee} onChange={set('annee')} placeholder="Ex: 2022" className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Kilométrage</label>
                        <input type="number" value={form.km} onChange={set('km')} placeholder="Ex: 15000" className={inputCls} />
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Prix (€) *</label>
                    <input type="number" value={form.prix} onChange={set('prix')} required placeholder="Ex: 120000" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelCls}>Carburant</label>
                        <input
                            type="text"
                            value={form.carburant}
                            onChange={set('carburant')}
                            list="carburants-list"
                            placeholder="Ex: Essence"
                            className={inputCls}
                        />
                        <datalist id="carburants-list">
                            {CARBURANTS.map((c) => <option key={c} value={c} />)}
                        </datalist>
                    </div>
                    <div>
                        <label className={labelCls}>Boîte</label>
                        <input
                            type="text"
                            value={form.transmission}
                            onChange={set('transmission')}
                            list="transmissions-list"
                            placeholder="Ex: Automatique"
                            className={inputCls}
                        />
                        <datalist id="transmissions-list">
                            {TRANSMISSIONS.map((t) => <option key={t} value={t} />)}
                        </datalist>
                    </div>
                </div>
                <div>
                    <label className={labelCls}>Couleur</label>
                    <input type="text" value={form.couleur} onChange={set('couleur')} placeholder="Noir, Blanc, Rouge..." className={inputCls} />
                </div>
            </div>

            {/* Description full width */}
            <div className="md:col-span-2">
                <label className={labelCls}>Description</label>
                <textarea
                    rows={3}
                    value={form.description}
                    onChange={set('description')}
                    placeholder="Options, historique, état général..."
                    className={`${inputCls} resize-none`}
                />
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-4 border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 gold-button py-4 text-xs tracking-[0.2em] font-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Publication…
                        </span>
                    ) : "PUBLIER L'ANNONCE"}
                </button>
            </div>
        </form>
    );
};

// ─── Dashboard Principal ──────────────────────────────────────────────────────
const AdminDashboard = ({ onLogout }) => {
    const [annonces, setAnnonces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchAnnonces = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/annonces');
            const data = await res.json();
            setAnnonces(data.annonces || []);
        } catch (err) {
            console.error('Erreur:', err);
        }
        setLoading(false);
    };

    useEffect(() => { fetchAnnonces(); }, []);

    const handleSuccess = () => {
        setShowForm(false);
        fetchAnnonces();
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/annonces?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
            setAnnonces((prev) => prev.filter((a) => a.id !== id));
            setDeleteId(null);
        } catch (err) {
            alert('Erreur suppression : ' + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] relative pt-[var(--header-height)]">
            <div className="absolute inset-0 lab-grid opacity-20 pointer-events-none" />
            <div className="scan-overlay" />

            {/* Header */}
            <header className="sticky top-[var(--header-height)] z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
                <div className="main-container py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex-center">
                            <Car size={15} className="text-accent-gold" />
                        </div>
                        <div>
                            <span className="text-[10px] text-accent-gold tracking-[0.3em] uppercase font-bold block">CarXLab</span>
                            <span className="text-white font-black text-sm tracking-wide uppercase">Admin Panel</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-accent-gold/5 border border-accent-gold/15 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs text-white/50">
                                {annonces.length} annonce{annonces.length !== 1 ? 's' : ''} en ligne
                            </span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 rounded-xl transition-all text-xs uppercase tracking-widest"
                        >
                            <LogOut size={13} /> Déconnexion
                        </button>
                    </div>
                </div>
            </header>

            <div className="main-container py-12">
                {/* Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight">
                            Gestion du <span className="gold-gradient">Stock</span>
                        </h1>
                        <p className="text-white/30 text-sm font-light mt-1">Déposez et gérez vos annonces véhicules</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchAnnonces}
                            className="p-3 border border-white/10 rounded-xl text-white/30 hover:text-white/60 hover:border-white/20 transition-all"
                        >
                            <RefreshCw size={15} />
                        </button>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${showForm ? 'border border-white/15 text-white/50' : 'gold-button'
                                }`}
                        >
                            {showForm ? <X size={15} /> : <Plus size={15} />}
                            {showForm ? 'Fermer' : 'Nouvelle Annonce'}
                        </button>
                    </div>
                </div>

                {/* Form Panel */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-12 overflow-hidden"
                        >
                            <div className="glass-panel border border-accent-gold/15 rounded-2xl p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="h-[2px] w-6 bg-accent-gold" />
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em]">Nouvelle Annonce</h2>
                                </div>
                                <AnnonceForm onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Annonces Grid */}
                <div>
                    <div className="flex items-center gap-4 mb-7">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Annonces Publiées</span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>

                    {loading ? (
                        <div className="flex-center py-24">
                            <div className="w-10 h-10 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
                        </div>
                    ) : annonces.length === 0 ? (
                        <div className="flex-center-col py-24 gap-4 border border-white/5 rounded-2xl">
                            <Car size={40} className="text-white/10" />
                            <p className="text-white/25 text-sm">Aucune annonce pour le moment</p>
                            <button onClick={() => setShowForm(true)} className="gold-button-outline px-6 py-3 text-xs rounded-xl mt-2">
                                Créer la première annonce
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {annonces.map((annonce, i) => (
                                <motion.div
                                    key={annonce.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group glass-panel border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-white/3">
                                        <img
                                            src={annonce.url}
                                            alt={`${annonce.marque} ${annonce.modele}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <span className="absolute bottom-3 left-3 text-accent-gold font-black text-lg">
                                            {Number(annonce.prix).toLocaleString('fr-FR')} €
                                        </span>


                                    </div>

                                    {/* Infos */}
                                    <div className="p-5">
                                        <h3 className="font-black uppercase tracking-tight">
                                            {annonce.marque} <span className="text-white/60 font-semibold">{annonce.modele}</span>
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {[annonce.annee, annonce.km ? `${Number(annonce.km).toLocaleString('fr-FR')} km` : null, annonce.carburant]
                                                .filter(Boolean).map((v, idx) => (
                                                    <span key={idx} className="text-[10px] tracking-widest uppercase text-white/35 bg-white/5 px-2 py-1 rounded-md">
                                                        {v}
                                                    </span>
                                                ))}
                                        </div>
                                        {annonce.description && (
                                            <p className="text-white/25 text-xs leading-relaxed mt-3 line-clamp-2 font-light">
                                                {annonce.description}
                                            </p>
                                        )}

                                        {/* Nouveau bouton de suppression explicite */}
                                        <div className="mt-6 pt-4 border-t border-white/5">
                                            {deleteId === annonce.id ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete(annonce.id)}
                                                        className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
                                                    >
                                                        Confirmer
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(null)}
                                                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
                                                    >
                                                        Annuler
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setDeleteId(annonce.id)}
                                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-white/40 hover:text-red-400 group/btn transition-all text-[10px] font-black uppercase tracking-widest rounded-lg"
                                                >
                                                    <Trash2 size={12} className="group-hover/btn:scale-110 transition-transform" />
                                                    Supprimer l'annonce
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Composant Principal ──────────────────────────────────────────────────────
const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => sessionStorage.getItem('carxlab_admin') === 'true'
    );

    const handleLogin = () => {
        sessionStorage.setItem('carxlab_admin', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('carxlab_admin');
        setIsAuthenticated(false);
    };

    return isAuthenticated
        ? <AdminDashboard onLogout={handleLogout} />
        : <Login onLogin={handleLogin} />;
};

export default Admin;
