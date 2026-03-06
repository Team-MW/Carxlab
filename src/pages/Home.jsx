import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Search, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Assets
import heroImg from '../assets/Carxlab.png';

const Home = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);

    return (
        <div className="relative overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden py-32 md:py-0">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ duration: 2.2, ease: "easeOut" }}
                        style={{ y }}
                        src={heroImg}
                        alt="CarXLab Hero Background"
                        className="w-full h-full object-cover scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full pt-32 md:pt-40">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-[2px] w-16 bg-accent-gold shadow-[0_0_10px_rgba(212,175,55,0.6)]"></span>
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase drop-shadow-lg">Division Automobile</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[0.8] font-black uppercase tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            L'ART DE LA <br />
                            <span className="gold-gradient drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]">PERFECTION</span>
                        </h1>

                        <p className="text-xl md:text-3xl mb-14 max-w-xl text-white/90 font-light leading-relaxed drop-shadow-md">
                            Plus qu'un showroom, un laboratoire d'expertise automobile de précision.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <Link to="/vente">
                                <button className="gold-button group flex items-center gap-3">
                                    Explorer le stock
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/expertise">
                                <button className="gold-button-outline px-10 border-white/10 hover:border-accent-gold transition-all">
                                    Nos méthodes
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Metrics Panel */}
                <div className="absolute bottom-20 right-12 hidden lg:flex gap-16 glass-panel p-10 border-l-[6px] border-l-accent-gold backdrop-blur-2xl bg-black/40 shadow-2xl scale-110">
                    {[
                        { label: 'Certifications', value: '4.8k+' },
                        { label: 'Expertise Lab', value: '150+' },
                        { label: 'Taux Succès', value: '99.8%' }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="text-white font-black text-3xl mb-2 tracking-tight">{stat.value}</div>
                            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-accent-gold/60">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Laboratory Experience Section */}
            <section className="py-40 relative bg-black">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-accent-gold/10 border border-accent-gold/30 mb-10 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                                <FlaskConical className="text-accent-gold" size={36} />
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">
                                LE CONCEPT <br /><span className="gold-gradient">LAB PROTOCOL</span>
                            </h2>
                            <p className="text-xl text-white/60 mb-12 font-light leading-relaxed max-w-lg">
                                Notre protocole d'expertise dépasse les standards traditionnels. Nous analysons chaque véhicule sous un angle scientifique pour garantir une transparence absolue.
                            </p>

                            <div className="space-y-10">
                                {[
                                    { title: "Séquençage Électronique", desc: "Diagnostic profond de chaque circuit imprimé.", icon: <Zap size={24} /> },
                                    { title: "Rapport Moléculaire", desc: "Validation complète de l'historique carrosserie.", icon: <ShieldCheck size={24} /> },
                                    { title: "Vision Thermique", desc: "Inspection structurelle non-invasive haute résolution.", icon: <Search size={24} /> }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="text-accent-gold mt-1 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">{feature.icon}</div>
                                        <div className="border-l border-white/5 pl-8 transition-colors group-hover:border-accent-gold/20">
                                            <h4 className="text-lg font-bold mb-2 uppercase tracking-[0.1em] text-white/90">{feature.title}</h4>
                                            <p className="text-base text-white/40 leading-relaxed max-w-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square md:aspect-auto md:h-[700px] group"
                        >
                            <div className="absolute inset-0 glass-panel neon-border flex flex-col items-center justify-center overflow-hidden bg-black/40">
                                {/* Visual Analysis Simulation */}
                                <div className="absolute inset-0 lab-grid opacity-30" />
                                <div className="absolute inset-x-0 h-[1px] bg-accent-gold/40 animate-[scan-line_6s_linear_infinite]" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-accent-gold/20 rotate-45" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-accent-gold/20 -rotate-45" />

                                <div className="relative z-10 text-center flex flex-col items-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-64 h-64 mb-10 rounded-full border-4 border-dashed border-accent-gold/20 flex items-center justify-center relative"
                                    >
                                        <FlaskConical size={80} className="text-accent-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" />
                                    </motion.div>
                                    <h3 className="text-3xl font-black mb-4 tracking-[0.3em] uppercase">Calibration</h3>
                                    <div className="w-80 h-[2px] bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5">
                                        <motion.div
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-1/2 h-full bg-accent-gold shadow-[0_0_15px_#d4af37]"
                                        />
                                    </div>
                                    <p className="text-xs tracking-[0.6em] text-accent-gold uppercase font-bold animate-pulse">Scanning Active System</p>
                                </div>

                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent-gold shadow-[-5px_-5px_15px_rgba(212,175,55,0.2)]" />
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent-gold shadow-[5px_5px_15px_rgba(212,175,55,0.2)]" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-white/5 relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-8xl font-black mb-12 uppercase leading-none max-w-5xl mx-auto">
                            PRÊT POUR LE <span className="gold-gradient">PROCHAIN NIVEAU</span> ?
                        </h2>
                        <p className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto leading-relaxed">
                            Vendez votre véhicule à son juste prix ou trouvez la perle rare certifiée par notre laboratoire.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <Link to="/contact">
                                <button className="gold-button px-14 py-6 text-xl">Prendre RDV</button>
                            </Link>
                            <Link to="/vente">
                                <button className="gold-button-outline px-14 py-6 text-xl">Voir le catalogue</button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-gold/5 blur-[150px] pointer-events-none rounded-full" />
            </section>
        </div>
    );
};

export default Home;
