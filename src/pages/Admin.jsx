import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, Plus, Trash2, Eye, EyeOff, Upload, X, Check,
    Car, AlertCircle, LogOut, RefreshCw, Pencil
} from 'lucide-react';
import { uploadToCloudinary } from '../services/cloudinary';
import { processCarImage } from '../services/imageProcessor';
import CarxlabBg from '../assets/Carxlab.png';

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
        <div className="min-h-screen bg-[var(--bg-color)] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 lab-grid opacity-50 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="scan-overlay" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`w-full max-w-md mx-4 ${shake ? 'animate-shake' : ''}`}
            >
                <div className="glass-panel border border-white/5 rounded-2xl p-6 md:p-10">
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

// ─── Formulaire Annonce (Ajout / Modification) ──────────────────────────────
const AnnonceForm = ({ onSuccess, onCancel, editData = null }) => {
    const [form, setForm] = useState(editData ? { ...defaultForm, ...editData } : defaultForm);
    const [exteriorPhotos, setExteriorPhotos] = useState([]);
    const [interiorPhotos, setInteriorPhotos] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const extInputRef = useRef();
    const intInputRef = useRef();

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleAddExterior = async (files) => {
        if (!files || files.length === 0) return;
        setProcessing(true);
        const newPhotos = [];
        for (const file of Array.from(files)) {
            try {
                // Traitement Magique pour l'extérieur
                const processedFile = await processCarImage(file, CarxlabBg);
                newPhotos.push({ file: processedFile, preview: URL.createObjectURL(processedFile) });
            } catch (err) {
                console.error(err);
                newPhotos.push({ file, preview: URL.createObjectURL(file) });
            }
        }
        setExteriorPhotos((prev) => [...prev, ...newPhotos]);
        setProcessing(false);
    };

    const handleAddInterior = (files) => {
        if (!files || files.length === 0) return;
        const newPhotos = Array.from(files).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setInteriorPhotos((prev) => [...prev, ...newPhotos]);
    };

    const removePhoto = (type, index) => {
        if (type === 'ext') {
            setExteriorPhotos(prev => prev.filter((_, i) => i !== index));
        } else {
            setInteriorPhotos(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const carId = editData ? editData.id : `car-${Date.now()}`;

            // 1. Si on est en mode édition, on met d'abord à jour les métadonnées des photos EXISTANTES
            if (editData && editData.publicIds) {
                await fetch('/api/annonces', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        publicIds: editData.publicIds,
                        context: {
                            carId,
                            ...form,
                        }
                    })
                });
            }

            // 2. Upload des NOUVELLES photos (Extérieur + Intérieur)
            const allNewPhotos = [
                ...exteriorPhotos.map(p => ({ ...p, type: 'exterior' })),
                ...interiorPhotos.map(p => ({ ...p, type: 'interior' }))
            ];

            for (let i = 0; i < allNewPhotos.length; i++) {
                const p = allNewPhotos[i];
                const isMain = !editData && i === 0 && p.type === 'exterior'; // Seule la 1ère photo d'un NOUVEL ajout est main par défaut
                
                await uploadToCloudinary(p.file, {
                    ...form,
                    carId,
                    type: p.type,
                    isMain: isMain.toString()
                });
            }

            setSuccess(true);
            setTimeout(() => {
                onSuccess();
                setUploading(false);
            }, 1000);

        } catch (err) {
            console.error('Erreur:', err);
            alert('Une erreur est survenue lors de la publication.');
            setUploading(false);
        }
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
        <form onSubmit={handleSubmit} className="space-y-20">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
                <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-20 h-[2px] bg-accent-gold" />
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex-center">
                            <Car size={18} className="text-accent-gold" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Extérieur</h3>
                            <p className="text-[9px] text-accent-gold/60 uppercase font-black tracking-widest mt-1">Détourage Auto ✨</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {exteriorPhotos.map((p, i) => (
                            <motion.div
                                key={i}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group/item"
                            >
                                <img src={p.preview} alt="ext" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removePhoto('ext', i)}
                                    className="absolute top-2 right-2 p-2 bg-black/80 text-white rounded-xl opacity-0 group-hover/item:opacity-100 transition-all hover:bg-red-500"
                                >
                                    <X size={14} />
                                </button>
                                {i === 0 && !editData && (
                                    <div className="absolute bottom-0 inset-x-0 bg-accent-gold py-1 text-[8px] font-black text-black text-center uppercase tracking-widest">
                                        Principale
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        <button
                            type="button"
                            onClick={() => extInputRef.current?.click()}
                            disabled={processing}
                            className={`aspect-[4/3] rounded-2xl border-2 border-dashed border-white/5 hover:border-accent-gold/30 flex-center-col gap-3 transition-all bg-white/[0.01] hover:bg-white/[0.03] ${processing ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {processing ? (
                                <div className="w-6 h-6 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
                            ) : (
                                <Plus size={24} className="text-accent-gold/30 group-hover:text-accent-gold/60" />
                            )}
                            <span className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em]">Ajouter</span>
                        </button>
                    </div>
                </div>

                <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-20 h-[2px] bg-white/20" />
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex-center">
                            <div className="w-4 h-4 border-2 border-white/20 rounded-sm" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Intérieur</h3>
                            <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mt-1">Format Original</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {interiorPhotos.map((p, i) => (
                            <motion.div
                                key={i}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group/item"
                            >
                                <img src={p.preview} alt="int" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removePhoto('int', i)}
                                    className="absolute top-2 right-2 p-2 bg-black/80 text-white rounded-xl opacity-0 group-hover/item:opacity-100 transition-all hover:bg-red-500"
                                >
                                    <X size={14} />
                                </button>
                            </motion.div>
                        ))}
                        <button
                            type="button"
                            onClick={() => intInputRef.current?.click()}
                            className="aspect-[4/3] rounded-2xl border-2 border-dashed border-white/5 hover:border-accent-gold/30 flex-center-col gap-3 transition-all bg-white/[0.01] hover:bg-white/[0.03]"
                        >
                            <Plus size={24} className="text-accent-gold/30 group-hover:text-accent-gold/60" />
                            <span className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em]">Ajouter</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-10 md:p-16 rounded-[2.5rem] border border-white/5 relative bg-white/[0.01]">
                <div className="flex items-center gap-6 mb-16">
                    <span className="h-[2px] w-12 bg-accent-gold" />
                    <h2 className="text-lg font-black uppercase tracking-[0.4em]">Spécifications</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                    <div className="space-y-3">
                        <label className={labelCls}>Constructeur</label>
                        <input type="text" value={form.marque} onChange={set('marque')} list="marques-list" placeholder="Ex: Porsche" className={inputCls} />
                        <datalist id="marques-list">{MARQUES.map((m) => <option key={m} value={m} />)}</datalist>
                    </div>
                    <div className="space-y-3">
                        <label className={labelCls}>Modèle Précis</label>
                        <input type="text" value={form.modele} onChange={set('modele')} placeholder="Ex: 911 GT3 RS" className={inputCls} />
                    </div>
                    <div className="space-y-3">
                        <label className={labelCls}>Prix de Vente (€)</label>
                        <input type="number" value={form.prix} onChange={set('prix')} required placeholder="Ex: 245000" className={`${inputCls} !border-accent-gold/20 !bg-accent-gold/5 text-accent-gold font-black`} />
                    </div>
                    <div className="space-y-3">
                        <label className={labelCls}>Année</label>
                        <input type="number" value={form.annee} onChange={set('annee')} placeholder="2024" className={inputCls} />
                    </div>
                    <div className="space-y-3">
                        <label className={labelCls}>Kilométrage</label>
                        <input type="number" value={form.km} onChange={set('km')} placeholder="500" className={inputCls} />
                    </div>
                    <div className="space-y-3">
                        <label className={labelCls}>Teinte Extérieure</label>
                        <input type="text" value={form.couleur} onChange={set('couleur')} placeholder="Gris Craie" className={inputCls} />
                    </div>
                    <div className="space-y-3">
                        <label className={labelCls}>Motorisation</label>
                        <input type="text" value={form.carburant} onChange={set('carburant')} list="carburants-list" placeholder="Essence" className={inputCls} />
                        <datalist id="carburants-list">{CARBURANTS.map((c) => <option key={c} value={c} />)}</datalist>
                    </div>
                    <div className="space-y-3">
                        <label className={labelCls}>Transmission</label>
                        <input type="text" value={form.transmission} onChange={set('transmission')} list="transmissions-list" placeholder="PDK" className={inputCls} />
                        <datalist id="transmissions-list">{TRANSMISSIONS.map((t) => <option key={t} value={t} />)}</datalist>
                    </div>
                </div>

                <div className="mt-16 pt-16 border-t border-white/5 space-y-4">
                    <label className={labelCls}>Présentation & Options</label>
                    <textarea
                        rows={6}
                        value={form.description}
                        onChange={set('description')}
                        placeholder="Détaillez ici les équipements, l'historique et l'état général du véhicule..."
                        className={`${inputCls} resize-none p-6 leading-relaxed`}
                    />
                </div>
            </div>

            <input ref={extInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleAddExterior(e.target.files)} />
            <input ref={intInputRef} type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleAddInterior(e.target.files)} />

            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 pt-10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="py-6 border border-white/5 bg-white/[0.02] text-white/30 hover:text-white/60 hover:bg-white/[0.05] rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all"
                >
                    Annuler la saisie
                </button>
                <button
                    type="submit"
                    disabled={uploading}
                    className="gold-button py-6 text-[10px] tracking-[0.4em] font-black rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(212,175,55,0.15)]"
                >
                    {uploading ? (editData ? "MISE À JOUR..." : "TRANSFÈRE VERS LE CLOUD...") : (editData ? "ENREGISTRER LES MODIFICATIONS" : "VALIDER & PUBLIER L'ANNONCE")}
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
    const [editAnnonce, setEditAnnonce] = useState(null);
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

    const handleDelete = async (annonce) => {
        try {
            const ids = (annonce.publicIds || [annonce.id]).join(',');
            await fetch(`/api/annonces?ids=${encodeURIComponent(ids)}`, { method: 'DELETE' });
            setAnnonces((prev) => prev.filter((a) => a.id !== annonce.id));
            setDeleteId(null);
        } catch (err) {
            alert('Erreur suppression : ' + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-color)] relative">
            <div className="absolute inset-0 lab-grid opacity-20 pointer-events-none" />
            <div className="scan-overlay" />

            <header className="sticky top-0 z-[60] border-b border-white/5 bg-black/80 backdrop-blur-3xl">
                <div className="main-container py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="w-10 h-10 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex-center">
                            <Car size={18} className="text-accent-gold" />
                        </div>
                        <div>
                            <span className="text-[10px] text-accent-gold tracking-[0.4em] uppercase font-black block leading-none mb-1">CarXLab</span>
                            <span className="text-white font-black text-xl tracking-tight uppercase leading-none">Console <span className="text-white/40">v1.2</span></span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2 px-3 py-2 bg-accent-gold/5 border border-accent-gold/15 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">
                                {annonces.length} ONLINE
                            </span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-5 py-2.5 text-white/40 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-xl transition-all text-[10px] uppercase font-black tracking-widest bg-white/[0.02]"
                        >
                            <LogOut size={13} /> DÉCONNEXION
                        </button>
                    </div>
                </div>
            </header>

            <div className="main-container py-20">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-20">
                    <div>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tight leading-[1.1]">
                            <span className="text-white">Gestion du</span> <br />
                            <span className="gold-gradient">Stock Live</span>
                        </h1>
                        <p className="text-white/20 text-[10px] md:text-xs font-bold mt-10 tracking-[0.4em] uppercase italic flex items-center gap-4">
                            <span className="h-px w-12 bg-accent-gold/20" />
                            Protocole de mise en ligne sécurisé
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={fetchAnnonces}
                            className="p-4 border border-white/10 rounded-2xl text-white/30 hover:text-white/60 hover:border-accent-gold/30 transition-all bg-white/[0.02]"
                        >
                            <RefreshCw size={18} />
                        </button>
                        <button
                            onClick={() => { setEditAnnonce(null); setShowForm(!showForm); }}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-2xl ${showForm ? 'bg-white/5 text-white/50 border border-white/10' : 'gold-button'
                                }`}
                        >
                            {showForm ? <X size={18} /> : <Plus size={18} />}
                            {showForm ? 'Fermer' : 'Nouvelle Annonce'}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-20 overflow-hidden"
                        >
                            <div className="glass-panel border border-accent-gold/15 rounded-3xl p-10 md:p-16">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="h-[2px] w-10 bg-accent-gold" />
                                    <h2 className="text-base font-black uppercase tracking-[0.3em]">{editAnnonce ? "Modifier l'Annonce" : "Nouvelle Annonce"}</h2>
                                </div>
                                <AnnonceForm 
                                    onSuccess={() => { setEditAnnonce(null); handleSuccess(); }} 
                                    onCancel={() => { setEditAnnonce(null); setShowForm(false); }} 
                                    editData={editAnnonce}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div>
                    <div className="flex items-center gap-6 mb-12">
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
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
                            {annonces.map((annonce, i) => (
                                <motion.div
                                    key={annonce.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group glass-panel border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all"
                                >
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
                                        <div className="absolute top-3 right-3 flex flex-col gap-1">
                                            <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-black text-white/80 border border-white/10">
                                                {annonce.photos?.filter(p => p.type === 'exterior').length || 0} EXT.
                                            </span>
                                            <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-black text-white/80 border border-white/10">
                                                {annonce.photos?.filter(p => p.type === 'interior').length || 0} INT.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-10">
                                        <h3 className="font-black text-2xl uppercase tracking-tight mb-6">
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
                                            <p className="text-white/25 text-xs leading-relaxed mt-5 line-clamp-3 font-light">
                                                {annonce.description}
                                            </p>
                                        )}

                                        <div className="mt-6 pt-4 border-t border-white/5">
                                            {deleteId === annonce.id ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete(annonce)}
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
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => { setEditAnnonce(annonce); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                        className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2"
                                                    >
                                                        <Pencil size={12} /> Modifier
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteId(annonce.id)}
                                                        className="px-6 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/10"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
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
