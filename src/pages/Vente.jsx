import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Vente = () => {
    const cars = [
        { title: "Porsche 911 GT3", category: "Supercar", price: "245,000€", year: "2022", km: "8,500 km", power: "510 ch" },
        { title: "Audi RS6 Avant", category: "Performance", price: "185,000€", year: "2023", km: "3,200 km", power: "600 ch" },
        { title: "Ferrari F8 Tributo", category: "Hypercar", price: "320,000€", year: "2021", km: "12,000 km", power: "720 ch" }
    ];

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
                        <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Stock Direct</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-12 uppercase leading-[0.85] tracking-tighter">
                        DÉCOUVREZ LE <br /><span className="gold-gradient">CATALOGUE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-light leading-relaxed">
                        Consultez notre stock de véhicules d'exception, certifiés par notre laboratoire de précision.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10">
                    {cars.map((car, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="glass-panel overflow-hidden group hover:neon-border transition-all duration-500 bg-black/40"
                        >
                            <div className="h-[350px] bg-white/5 relative group-hover:bg-white/10 transition-colors flex items-center justify-center p-12 text-center">
                                <div className="text-accent-gold/20 font-black text-8xl absolute pointer-events-none select-none">CARXLAB</div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <Zap size={64} className="text-accent-gold mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                                    <div className="text-xs tracking-[0.6em] text-white/40 uppercase font-black">Scanning Image</div>
                                    <div className="w-24 h-[1px] bg-accent-gold mt-4 animate-pulse shadow-[0_0_10px_#d4af37]" />
                                </div>
                                {/* Floating corner labels */}
                                <div className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-black text-white/20">Protocole: v4.1</div>
                                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest font-black text-white/20">Status: Certifié</div>
                            </div>

                            <div className="p-12 border-t border-white/5 bg-black/20">
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <p className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-2">{car.category}</p>
                                        <h3 className="text-3xl font-black uppercase tracking-tight">{car.title}</h3>
                                    </div>
                                    <div className="text-2xl font-black gold-gradient">{car.price}</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center flex flex-col justify-center">
                                        <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Année</p>
                                        <p className="text-white font-bold text-base">{car.year}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center flex flex-col justify-center">
                                        <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Kilométrage</p>
                                        <p className="text-white font-bold text-base">{car.km}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-center flex flex-col justify-center col-span-2">
                                        <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Puissance</p>
                                        <p className="text-white font-bold text-base">{car.power}</p>
                                    </div>
                                </div>

                                <Link to="/contact">
                                    <button className="gold-button w-full flex items-center justify-center gap-3">
                                        DÉCOUVRIR <ArrowRight size={18} />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sourcing CTA */}
                <div className="mt-40 p-24 glass-panel border-l-8 border-l-accent-gold backdrop-blur-3xl bg-black/40 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">VOTRE CHERCHEUR DE <span className="gold-gradient">PÉPITES</span></h2>
                        <p className="text-xl text-white/50 font-light leading-relaxed">Vous ne trouvez pas votre bonheur dans notre catalogue ? Nos experts activent leur réseau européen pour sourcer le véhicule de vos rêves.</p>
                    </div>
                    <Link to="/contact">
                        <button className="gold-button px-12 py-6 text-xl">Lancer une recherche</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Vente;
