import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import FAQ from '../components/FAQ';

const Contact = () => {
    const MotionDiv = motion.div;
    return (
        <div className="relative">
            <section className="page-hero">
                <div className="absolute top-0 right-0 w-[60%] h-[100%] bg-accent-gold/5 blur-[150px] -translate-y-1/2 pointer-events-none" />

                <div className="main-container relative z-10 flex-center-col">
                    <MotionDiv
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-6xl"
                    >
                        <div className="flex-center gap-4 mb-10">
                            <span className="h-[1px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Communication Hub</span>
                            <span className="h-[1px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>
                        <h1 className="hero-title mb-12">
                            REJOINDRE LE <br /><span className="gold-gradient">LABORATOIRE</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white/40 mx-auto max-w-2xl font-light leading-relaxed">
                            Besoin d'une expertise ? D'une estimation ? Ou d'une recherche personnalisée ? Nos ingénieurs vous répondent sous 24h.
                        </p>
                    </MotionDiv>
                </div>
            </section>

            <section className="section-padding">
                <div className="main-container">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Left Side: Contact Info & Schedule */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
                                {[
                                    { label: 'Prendre RDV', value: '+33 1 42 67 89 00', icon: <Phone size={20} /> },
                                    { label: 'Support & Expertise', value: 'contact@carxlab.fr', icon: <Mail size={20} /> },
                                    { label: 'Notre Bureau', value: '75008 Paris, France', icon: <MapPin size={20} /> }
                                ].map((item, i) => (
                                    <div key={i} className="glass-panel p-8 flex items-center gap-8 group hover:neon-border transition-all duration-500 rounded-2xl">
                                        <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 mb-1">{item.label}</div>
                                            <div className="text-lg font-black text-white group-hover:text-accent-gold transition-colors">{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-panel p-10 md:p-12 border-l-4 border-l-accent-gold bg-black/40 rounded-2xl">
                                <h4 className="text-xl font-black mb-10 uppercase tracking-[0.3em]">Horaires d'Accès</h4>
                                <div className="space-y-6">
                                    {[
                                        { day: 'Lundi - Vendredi', time: '09h - 19h' },
                                        { day: 'Samedi', time: '10h - 18h' },
                                        { day: 'Dimanche', time: 'Fermé', highlight: true }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-lg border-b border-white/5 pb-5">
                                            <span className="text-white font-bold">{item.day}</span>
                                            <span className={item.highlight ? "text-accent-gold/50" : "text-white/30"}>{item.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="lg:col-span-12 xl:col-span-7">
                            <div className="glass-panel p-10 md:p-16 neon-border bg-black/40 rounded-[3rem]">
                                <div className="mb-12">
                                    <h2 className="text-3xl font-black mb-4 uppercase tracking-[0.2em]">Lancer le Protocole</h2>
                                    <p className="text-white/30 text-lg font-light leading-relaxed">Remplissez le formulaire ci-dessous pour initier une demande de service ou d'information.</p>
                                </div>

                                <form className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <input type="text" className="w-full bg-white/5 border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white transition-all text-sm uppercase tracking-widest" placeholder="votre nom" />
                                        <select className="w-full bg-[#111] border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white/60 transition-all appearance-none text-sm uppercase tracking-widest bg-white/5">
                                            <option>Expertise complète</option>
                                            <option>Achat / Sourcing</option>
                                            <option>Vente / Reprise</option>
                                        </select>
                                    </div>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white transition-all text-sm uppercase tracking-widest" placeholder="votre email" />
                                    <textarea rows="4" className="w-full bg-white/5 border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white transition-all text-sm uppercase tracking-widest" placeholder="votre message..."></textarea>
                                    <button type="submit" className="gold-button w-full py-8 text-sm tracking-[0.4em] font-black mt-4">INITIER LE PROTOCOLE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FAQ />
        </div>
    );
};

export default Contact;
