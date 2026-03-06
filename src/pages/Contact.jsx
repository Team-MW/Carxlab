import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-64 md:pt-80 pb-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto text-center mb-32"
                >
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <span className="h-[2px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Communication Hub</span>
                        <span className="h-[2px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black mb-12 uppercase leading-[1.1] tracking-tighter">
                        ENTREZ DANS LE <br /><span className="gold-gradient">LABORATOIRE</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 mx-auto max-w-2xl font-light leading-relaxed">
                        Besoin d'une expertise ? D'une estimation ? Ou d'une recherche personnalisée ? Nos experts vous répondent sous 24h.
                    </p>
                </motion.div>

                <div className="flex flex-col items-center">
                    {/* Centered Info & Form */}
                    <div className="w-full max-w-5xl space-y-24">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { label: 'Prendre RDV', value: '+33 1 42 67 89 00', icon: <Phone size={24} /> },
                                { label: 'Support & Expertise', value: 'contact@carxlab.fr', icon: <Mail size={24} /> },
                                { label: 'Notre Bureau', value: '75008 Paris, France', icon: <MapPin size={24} /> }
                            ].map((item, i) => (
                                <div key={i} className="glass-panel p-10 flex flex-col items-center text-center group hover:neon-border transition-all">
                                    <div className="w-16 h-16 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-6 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-2">{item.label}</div>
                                    <div className="text-xl font-black text-white group-hover:text-accent-gold transition-colors">{item.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="glass-panel p-12 border-l-4 border-l-accent-gold bg-black/40">
                                <h4 className="text-xl font-black mb-8 uppercase tracking-[0.2em]">Horaires du Lab</h4>
                                <div className="space-y-4">
                                    {['Lundi - Vendredi', 'Samedi', 'Dimanche'].map((day, i) => (
                                        <div key={i} className="flex justify-between items-center text-lg border-b border-white/5 pb-4">
                                            <span className="text-white font-bold">{day}</span>
                                            <span className="text-white/40">{day === 'Dimanche' ? 'Fermé' : '09h - 19h'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel p-12 neon-border bg-black/40">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-black mb-4 uppercase tracking-widest">Lancez le Protocole</h2>
                                    <p className="text-white/40 leading-relaxed">Remplissez le formulaire ci-dessous pour une demande de contact générale.</p>
                                </div>

                                <form className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <input type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all" placeholder="Nom Complet" />
                                        </div>
                                        <div className="space-y-4">
                                            <select className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all appearance-none">
                                                <option className="bg-[#0a0a0a]">Expertise Véhicule</option>
                                                <option className="bg-[#0a0a0a]">Achat / Reprise</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all" placeholder="Votre Email" />
                                    <textarea rows="4" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all" placeholder="Votre message détaillé..."></textarea>
                                    <button type="submit" className="gold-button w-full py-5 text-lg tracking-[0.2em] font-black">LANCER LE PROTOCOLE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
