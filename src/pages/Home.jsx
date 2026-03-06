import React, { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Search, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                    <motion.div style={{ y }} className="w-full h-full">
                        <LazyLoadImage
                            src={heroImg}
                            effect="blur"
                            alt="CarXLab Hero Background"
                            className="w-full h-full object-cover opacity-70 scale-110"
                            wrapperClassName="w-full h-full"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center text-center pt-64 md:pt-72">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                        className="max-w-5xl"
                    >
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="h-[2px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.5em] font-black text-xs uppercase">CarXLab Protocol</span>
                            <span className="h-[2px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl mb-10 leading-[1.1] font-black uppercase tracking-tighter drop-shadow-2xl">
                            L'ART DE LA <br />
                            <span className="gold-gradient drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">PERFECTION</span>
                        </h1>

                        <p className="text-xl md:text-3xl mb-14 max-w-2xl mx-auto text-white/80 font-light leading-relaxed">
                            Plus qu'un showroom, un laboratoire d'expertise automobile de précision.
                        </p>

                        <div className="flex flex-wrap justify-center gap-8">
                            <Link to="/vente">
                                <button className="gold-button group flex items-center gap-4 text-xs">
                                    EXPLORER LE STOCK
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/expertise">
                                <button className="gold-button-outline px-12 py-5 border-white/10 hover:border-accent-gold transition-all text-xs">
                                    NOS MÉTHODES
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Metrics Panel */}
                <div className="absolute bottom-20 right-12 hidden xl:flex gap-16 glass-panel p-12 border-l-[8px] border-l-accent-gold backdrop-blur-3xl bg-black/40 shadow-2xl">
                    {[
                        { label: 'Certifications', value: '4.8k+' },
                        { label: 'Protocole Lab', value: '150+' },
                        { label: 'Fiabilité', value: '99.8%' }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col">
                            <div className="text-white font-black text-4xl mb-2 tracking-tight">{stat.value}</div>
                            <div className="text-[10px] uppercase font-black tracking-[0.4em] text-accent-gold/50">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Laboratory Experience Section */}
            <section className="py-40 relative bg-[#050505]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="w-full flex flex-col items-center mb-24"
                        >
                            <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-accent-gold/10 border border-accent-gold/20 mb-10">
                                <FlaskConical className="text-accent-gold" size={36} />
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-[1.1]">
                                LE CONCEPT <br /><span className="gold-gradient">LAB PROTOCOL</span>
                            </h2>
                            <p className="text-xl text-white/50 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                                Notre protocole d'expertise dépasse les standards. Nous analysons chaque véhicule sous un angle scientifique pour une transparence absolue.
                            </p>

                            <div className="grid md:grid-cols-3 gap-12 w-full mt-10">
                                {[
                                    { title: "Séquençage Électronique", desc: "Diagnostic profond de chaque circuit imprimé.", icon: <Zap size={24} /> },
                                    { title: "Rapport Moléculaire", desc: "Validation complète de l'historique carrosserie.", icon: <ShieldCheck size={24} /> },
                                    { title: "Vision Thermique", desc: "Inspection structurelle haute résolution.", icon: <Search size={24} /> }
                                ].map((feature, i) => (
                                    <div key={i} className="flex flex-col items-center p-10 glass-panel border-t-2 border-accent-gold/20 group">
                                        <div className="text-accent-gold mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                        <h4 className="text-lg font-bold mb-4 uppercase tracking-[0.1em] text-white/90">{feature.title}</h4>
                                        <p className="text-sm text-white/40 leading-relaxed mx-auto">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] w-full max-w-4xl group"
                        >
                            <div className="absolute inset-0 glass-panel neon-border flex flex-col items-center justify-center overflow-hidden bg-black/40">
                                <div className="absolute inset-0 lab-grid opacity-20" />
                                <div className="absolute inset-x-0 h-[1px] bg-accent-gold/30 animate-[scan-line_6s_linear_infinite]" />

                                <div className="relative z-10 text-center flex flex-col items-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        className="w-48 h-48 mb-10 rounded-full border-2 border-dashed border-accent-gold/20 flex items-center justify-center relative"
                                    >
                                        <FlaskConical size={60} className="text-accent-gold drop-shadow-[0_0_20px_#d4af37]" />
                                    </motion.div>
                                    <h3 className="text-3xl font-black mb-4 tracking-[0.4em] uppercase">SYSTEM OK</h3>
                                    <div className="w-64 h-[1px] bg-white/5 rounded-full overflow-hidden mb-6">
                                        <motion.div
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-1/2 h-full bg-accent-gold"
                                        />
                                    </div>
                                    <p className="text-[10px] tracking-[0.6em] text-accent-gold/60 uppercase font-black">Scanning Complete</p>
                                </div>

                                <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-accent-gold opacity-40" />
                                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-accent-gold opacity-40" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-52 bg-black relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-9xl font-black mb-16 uppercase leading-[1.1] max-w-6xl mx-auto tracking-tighter">
                            PRÊT POUR LE <br /><span className="gold-gradient">PROCHAIN NIVEAU</span> ?
                        </h2>
                        <p className="text-xl md:text-3xl text-white/40 mb-20 max-w-3xl mx-auto font-light">
                            Vendez votre véhicule à son juste prix ou trouvez la perle rare.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                            <Link to="/contact">
                                <button className="gold-button px-20 py-7 text-xs">PRENDRE RENDEZ-VOUS</button>
                            </Link>
                            <Link to="/vente">
                                <button className="gold-button-outline px-20 py-7 text-xs">VOIR LE CATALOGUE</button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-gold/5 blur-[200px] pointer-events-none opacity-30" />
            </section>
        </div>
    );
};

export default memo(Home);
