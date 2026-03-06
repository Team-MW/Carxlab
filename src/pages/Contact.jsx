import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-64 pb-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mb-32"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-[2px] w-12 bg-accent-gold"></span>
                        <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Communication Hub</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-12 uppercase leading-[0.85] tracking-tighter">
                        ENTREZ DANS LE <br /><span className="gold-gradient">LABORATOIRE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-light leading-relaxed">
                        Besoin d'une expertise ? D'une estimation ? Ou d'une recherche personnalisée ? Nos experts vous répondent sous 24h.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-32">
                    {/* Left Info Column */}
                    <div>
                        <h2 className="text-4xl font-black mb-16 uppercase tracking-tight">NOS <span className="gold-gradient tracking-tight">COORDONNÉES</span></h2>

                        <div className="space-y-12">
                            <div className="flex gap-10 group items-center">
                                <div className="w-20 h-20 rounded-2xl border border-white/10 flex items-center justify-center text-accent-gold bg-white/5 group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                    <Phone size={32} />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-2">Prendre RDV</div>
                                    <div className="text-3xl font-black text-white group-hover:text-accent-gold transition-colors">+33 1 42 67 89 00</div>
                                </div>
                            </div>

                            <div className="flex gap-10 group items-center">
                                <div className="w-20 h-20 rounded-2xl border border-white/10 flex items-center justify-center text-accent-gold bg-white/5 group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                    <Mail size={32} />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-2">Support & Expertise</div>
                                    <div className="text-3xl font-black text-white group-hover:text-accent-gold transition-colors">contact@carxlab.fr</div>
                                </div>
                            </div>

                            <div className="flex gap-10 group items-center">
                                <div className="w-20 h-20 rounded-2xl border border-white/10 flex items-center justify-center text-accent-gold bg-white/5 group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                    <MapPin size={32} />
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-2">Notre Bureau</div>
                                    <div className="text-3xl font-black text-white group-hover:text-accent-gold transition-colors">75008 Paris, France</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-32 p-16 glass-panel border-l-4 border-l-accent-gold bg-black/40">
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
                    </div>

                    {/* Right Form Column */}
                    <div className="glass-panel p-16 neon-border bg-black/40">
                        <div className="mb-16">
                            <h2 className="text-3xl font-black mb-4 uppercase tracking-widest">Lancez le Protocole</h2>
                            <p className="text-white/40 leading-relaxed">Remplissez le formulaire ci-dessous pour une demande de contact générale.</p>
                        </div>

                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Nom Complet</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="Jean Dupont" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Sujet</label>
                                    <select className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10 appearance-none">
                                        <option className="bg-[#0a0a0a]">Expertise Vihécule</option>
                                        <option className="bg-[#0a0a0a]">Achat / Reprise</option>
                                        <option className="bg-[#0a0a0a]">Vente / Catalogue</option>
                                        <option className="bg-[#0a0a0a]">Autre demande</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Votre Email</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="votre@email.com" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Message</label>
                                <textarea rows="6" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="Votre message détaillé..."></textarea>
                            </div>
                            <button type="submit" className="gold-button w-full py-6 text-xl tracking-[0.2em] font-black">LANCER LE PROTOCOLE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
