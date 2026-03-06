import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Search, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Achat = () => {
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
                        <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Estimation Lab</span>
                        <span className="h-[2px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black mb-12 uppercase leading-[1.1] tracking-tighter">
                        VENDEZ VOTRE <br /><span className="gold-gradient">VÉHICULE</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 mx-auto max-w-2xl font-light leading-relaxed">
                        Nous rachetons vos véhicules au prix juste. Notre expertise nous permet de reconnaître la valeur de votre voiture et de vous proposer une offre conforme au marché.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-40">
                    {[
                        { title: "Estimation en ligne", desc: "Décrivez votre véhicule en quelques clics via notre formulaire dédié.", icon: <Search size={24} /> },
                        { title: "Expertise physique", desc: "Prenez rendez-vous dans notre laboratoire pour une validation finale.", icon: <Zap size={24} /> },
                        { title: "Paiement sécurisé", desc: "Une fois l'expertise validée, nous procédons à un virement immédiat.", icon: <ShieldCheck size={24} /> }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="glass-panel p-12 hover:-translate-y-2 transition-transform duration-500 group border-t-2 border-accent-gold/20"
                        >
                            <div className="text-accent-gold mb-8 group-hover:scale-110 transition-transform duration-301 bg-accent-gold/10 w-fit p-4 rounded-xl">{feature.icon}</div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{feature.title}</h3>
                            <p className="text-white/40 leading-relaxed font-light">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Form Section */}
                <div className="max-w-5xl mx-auto glass-panel p-16 neon-border bg-black/40">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black mb-4 uppercase tracking-widest">Lancez le Protocole d'Estimation</h2>
                        <p className="text-white/40 max-w-lg mx-auto leading-relaxed">Remplissez ce formulaire préliminaire pour recevoir une première offre d'achat indicative de la part de nos experts.</p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Marque & Modèle</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="Ex: Porsche 911 GT3" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Année & Kilométrage</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="Ex: 2021 | 15,000 km" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Votre Email</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="votre@email.com" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Téléphone</label>
                            <input type="tel" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="+33 6 00 00 00 00" />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <label className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent-gold ml-2">Informations Complémentaires</label>
                            <textarea rows="5" className="w-full bg-white/5 border border-white/10 p-5 rounded-lg focus:border-accent-gold outline-none text-white/80 transition-all focus:bg-white/10" placeholder="États du véhicule, options principales..."></textarea>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <button type="submit" className="gold-button w-full py-6 text-xl tracking-[0.2em] font-black">SOUMETTRE À L'ANALYSE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Achat;
