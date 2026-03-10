import React, { memo, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Search, FlaskConical, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Reviews from '../components/Reviews';

// Import Assets
import heroImg from '../assets/Carxlab.png';

const Counter = ({ value, decimals = 0 }) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = latest.toFixed(decimals);
            }
        });
        return unsubscribe;
    }, [springValue, decimals]);

    return <span ref={ref}>0</span>;
};

const Home = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const MotionDiv = motion.div;

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="page-hero overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div style={{ y }} className="w-full h-full">
                        <LazyLoadImage
                            src={heroImg}
                            effect="blur"
                            alt="CarXLab Hero Background"
                            className="w-full h-full object-cover opacity-60 scale-105"
                            wrapperClassName="w-full h-full"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
                </div>

                <div className="main-container relative z-20 flex-center-col">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="max-w-6xl"
                    >
                        <div className="flex-center gap-6 mb-16">
                            <span className="h-[1px] w-16 md:w-32 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.6em] font-black text-[10px] md:text-sm uppercase">Prototype V4 // Lab</span>
                            <span className="h-[1px] w-12 md:w-20 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>

                        <h1 className="hero-title mb-12">
                            L'ART DE LA <br />
                            <span className="gold-gradient">PERFECTION</span>
                        </h1>

                        <div className="flex-center flex-wrap gap-8 md:gap-16">
                            <Link to="/vente">
                                <button className="gold-button group gap-4">
                                    EXPLORER LE STOCK
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/expertise">
                                <button className="gold-button-outline px-12">
                                    NOS MÉTHODES
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Center-Aligned Metrics for better balance on desktop */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden xl:flex gap-20 glass-panel py-10 px-20 border-t border-accent-gold/20 backdrop-blur-3xl bg-black/40 shadow-2xl scale-110">
                    {[
                        { label: 'Certifications', value: 4.8, suffix: 'k+', decimals: 1 },
                        { label: 'Protocole Lab', value: 150, suffix: '+', decimals: 0 },
                        { label: 'Fiabilité', value: 99.8, suffix: '%', decimals: 1 }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center min-w-[150px]">
                            <div className="text-white font-black text-5xl mb-2 tracking-tight flex">
                                <Counter value={stat.value} decimals={stat.decimals} />
                                <span>{stat.suffix}</span>
                            </div>
                            <div className="text-[10px] uppercase font-black tracking-[0.5em] text-accent-gold/50">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Laboratory Experience Section */}
            <section className="section-padding relative bg-black">
                <div className="main-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center">
                        <MotionDiv
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <div className="inline-flex items-center justify-center p-5 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-12">
                                <FlaskConical className="text-accent-gold" size={32} />
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">
                                LE CONCEPT <br /><span className="gold-gradient">LAB PROTOCOL</span>
                            </h2>

                            <p className="text-lg md:text-2xl text-white/40 mb-20 font-light leading-loose max-w-xl mx-auto lg:mx-0">
                                Un écosystème en 3 étapes conçu pour éradiquer le doute et documenter l'invisible par la donnée.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
                                {[
                                    { title: "Séquençage", desc: "Lecture & cohérence des calculateurs.", icon: <Zap size={20} /> },
                                    { title: "Moléculaire", desc: "Mesure de structure et peinture.", icon: <ShieldCheck size={20} /> },
                                    { title: "Thermique", desc: "Détection des zones de contraintes.", icon: <Search size={20} /> },
                                    { title: "Certifié", desc: "Dossier digital complet infalsifiable.", icon: <FlaskConical size={20} /> }
                                ].map((feature, i) => (
                                    <div
                                        key={i}
                                        className="glass-panel rounded-[2rem] border border-white/5 p-10 flex flex-col gap-6 hover:border-accent-gold/30 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black uppercase tracking-widest text-white/90 mb-3">{feature.title}</h4>
                                            <p className="text-sm text-white/30 leading-relaxed font-light">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-24 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-10">
                                <Link to="/expertise">
                                    <button className="gold-button px-16">PROTOCOLE</button>
                                </Link>
                                <Link to="/contact">
                                    <button className="gold-button-outline px-16">RDV LAB</button>
                                </Link>
                            </div>
                        </MotionDiv>

                        <MotionDiv
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-square md:aspect-auto md:h-[650px] w-full glass-panel neon-border overflow-hidden bg-black/40 rounded-[3rem]">
                                <div className="absolute inset-0 lab-grid opacity-20" />
                                <div className="absolute inset-x-0 h-[2px] bg-accent-gold/20 animate-[scan-line_6s_linear_infinite]" />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                                    <MotionDiv
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                        className="w-48 h-48 md:w-64 md:h-64 mb-12 rounded-full border-2 border-dashed border-accent-gold/10 flex items-center justify-center"
                                    >
                                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-accent-gold/20 flex-center">
                                            <FlaskConical size={72} className="text-accent-gold drop-shadow-[0_0_30px_#d4af37]" />
                                        </div>
                                    </MotionDiv>
                                    <div className="text-[10px] tracking-[0.8em] text-accent-gold/40 uppercase font-black mb-6">Extraction en cours</div>
                                    <h3 className="text-3xl md:text-5xl font-black tracking-widest uppercase">SYSTÈME ACTIF</h3>
                                </div>

                                <div className="absolute bottom-10 left-10 right-10 grid grid-cols-3 gap-6">
                                    {[
                                        { k: "Data", v: "256 pts" },
                                        { k: "Time", v: "Real" },
                                        { k: "Trust", v: "100%" }
                                    ].map((m) => (
                                        <div key={m.k} className="glass-panel p-5 text-center">
                                            <div className="text-[10px] uppercase tracking-widest text-white/20 font-black mb-2">{m.k}</div>
                                            <div className="text-white font-black">{m.v}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-accent-gold opacity-30" />
                                <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-accent-gold opacity-30" />
                            </div>
                        </MotionDiv>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <Reviews />

            {/* Find Us Section */}
            <section className="section-padding bg-black/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="main-container relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-24 xl:gap-32">
                        <div className="w-full md:w-1/2">
                            <div className="flex items-center gap-6 mb-12">
                                <span className="h-[2px] w-20 bg-accent-gold"></span>
                                <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Localisation</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase tracking-tighter leading-none">
                                OÙ NOUS <br /><span className="gold-gradient">TROUVER</span>
                            </h2>
                            <div className="space-y-10">
                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shrink-0">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-widest mb-2">Le Laboratoire</h4>
                                        <p className="text-white/40 text-lg font-light leading-relaxed">75008 Paris, France<br />Avenue des Champs-Élysées</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shrink-0">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-widest mb-2">Ligne Directe</h4>
                                        <p className="text-white/40 text-lg font-light leading-relaxed">+33 1 42 67 89 00<br />Expertise & Vente</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-20">
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="gold-button px-14 group"
                                >
                                    OUVRIR DANS MAPS
                                    <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative aspect-square glass-panel rounded-[3rem] overflow-hidden border border-white/5 group">
                                <div className="absolute inset-0 lab-grid opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Styled placeholder for map */}
                                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                <div className="w-32 h-32 rounded-full bg-accent-gold/10 animate-pulse border border-accent-gold/20 flex items-center justify-center">
                                                    <div className="w-4 h-4 rounded-full bg-accent-gold shadow-[0_0_20px_#d4af37]" />
                                                </div>
                                                <div className="absolute -top-16 -left-16 w-64 h-64 border-2 border-dashed border-accent-gold/5 rounded-full animate-[spin_60s_linear_infinite]" />
                                            </div>
                                        </div>
                                        {/* Grid coordinates */}
                                        <div className="absolute top-8 left-8 text-[10px] font-black text-accent-gold/40 tracking-[0.3em]">LAT: 48.8667</div>
                                        <div className="absolute bottom-8 right-8 text-[10px] font-black text-accent-gold/40 tracking-[0.3em]">LONG: 2.3333</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-black relative flex items-center justify-center overflow-hidden">
                <div className="main-container text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-6xl md:text-[10rem] font-black mb-16 uppercase leading-[0.85] tracking-tighter">
                            VOTRE <br /><span className="gold-gradient">FUTUR</span> EST ICI
                        </h2>
                        <p className="text-xl md:text-4xl text-white/30 mb-20 max-w-4xl mx-auto font-light leading-snug">
                            Vendez votre véhicule au juste prix ou trouvez la perle rare parmi notre stock ultra-limité.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full px-6">
                            <Link to="/contact" className="w-full md:w-auto">
                                <button className="gold-button w-full px-24 py-8 text-sm">PRENDRE RENDEZ-VOUS</button>
                            </Link>
                            <Link to="/vente" className="w-full md:w-auto">
                                <button className="gold-button-outline w-full px-24 py-8 text-sm">CATALOGUE LIVE</button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-gold/5 blur-[250px] pointer-events-none" />
            </section>
        </div>
    );
};

export default memo(Home);
