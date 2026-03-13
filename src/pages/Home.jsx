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
            <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden pt-24 pb-20 md:pt-0">
                <div className="absolute inset-0 z-0">
                    <motion.div style={{ y }} className="w-full h-full">
                        <LazyLoadImage
                            src={heroImg}
                            effect="blur"
                            alt="CarXLab Hero Background"
                            className="w-full h-full object-cover opacity-50 scale-105"
                            wrapperClassName="w-full h-full"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>

                    {/* Lab Grid & HUD elements */}
                    <div className="absolute inset-0 lab-grid opacity-20 pointer-events-none" />
                    <div className="absolute top-40 left-10 w-32 h-32 border-l border-t border-accent-gold/20 pointer-events-none hidden md:block" />
                    <div className="absolute bottom-40 right-10 w-32 h-32 border-r border-b border-accent-gold/20 pointer-events-none hidden md:block" />
                </div>

                <div className="main-container relative z-20 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="max-w-6xl"
                    >
                        <div className="flex-center gap-3 md:gap-6 mb-10 md:mb-16">
                            <span className="h-[1px] w-8 md:w-32 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.2em] md:tracking-[0.6em] font-black text-[8px] md:text-sm uppercase italic">Prototype V4 // Lab</span>
                            <span className="h-[1px] w-8 md:w-32 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>

                        <h1 className="hero-title mb-12 md:mb-12 px-2">
                            L'ART DE LA <br className="md:hidden" />
                            <span className="gold-gradient">PERFECTION</span>
                        </h1>

                        <div className="flex-center flex-col sm:flex-row gap-4 md:gap-6 mb-16">
                            <Link to="/stock" className="w-full sm:w-auto">
                                <button className="gold-button group gap-4 w-full px-12">
                                    EXPLORER LE STOCK
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/expertise" className="hidden sm:block w-full sm:w-auto">
                                <button className="gold-button-outline px-12 w-full">
                                    NOS MÉTHODES
                                </button>
                            </Link>
                        </div>
                        {/* Center-Aligned Metrics */}
                        <div className="mt-16 md:mt-24 flex items-center justify-center w-full max-w-4xl mx-auto px-4 relative">
                            {/* Decorative architectural markers */}
                            <div className="absolute -top-4 -left-2 text-[8px] text-accent-gold/40 font-mono hidden md:block">REF: LAB_OS_V4.0</div>
                            <div className="absolute -bottom-4 -right-2 text-[8px] text-accent-gold/40 font-mono hidden md:block">STATUS: LIVE_FEED</div>

                            <div className="grid grid-cols-3 gap-0 w-full glass-panel rounded-[1.5rem] md:rounded-[2.5rem] border-white/10 relative overflow-hidden group divide-x divide-white/5">
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/0 via-accent-gold/5 to-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                                {[
                                    { label: 'Certifications', value: 4.8, suffix: 'k+', decimals: 1 },
                                    { label: 'Protocole Lab', value: 150, suffix: '+', decimals: 0 },
                                    { label: 'Fiabilité', value: 99.8, suffix: '%', decimals: 1 }
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center py-6 md:py-12 transition-transform duration-500 hover:bg-white/5">
                                        <div className="text-white font-black text-2xl md:text-6xl mb-1 md:mb-2 tracking-tighter flex items-baseline">
                                            <Counter value={stat.value} decimals={stat.decimals} />
                                            <span className="text-accent-gold text-[10px] md:text-2xl ml-0.5 font-bold">{stat.suffix}</span>
                                        </div>
                                        <div className="text-[6px] md:text-[10px] uppercase font-black tracking-[0.1em] md:tracking-[0.4em] text-white/20 whitespace-nowrap">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SEO Presentation Section: Achat Revente Toulouse */}
            <section className="section-padding bg-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full lab-grid opacity-10 pointer-events-none" />
                <div className="main-container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 xl:gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-8">
                                <MapPin size={16} className="text-accent-gold" />
                                <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.3em]">Garage Launaguet, Haute-Garonne</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black mb-8 md:mb-10 uppercase tracking-tighter leading-[1] px-4">
                                VOTRE SPÉCIALISTE <br /><span className="gold-gradient">AUTO À LAUNAGUET</span>
                            </h2>

                            <p className="text-lg md:text-xl text-white/60 mb-12 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                                CarXLab est votre partenaire de confiance pour l'<strong>achat et la revente de véhicules d'occasion</strong> et de prestige à Launaguet. Situés à 15 minutes de Toulouse, nous sélectionnons pour vous les meilleures pépites automobiles en Haute-Garonne.
                            </p>

                            <div className="grid grid-cols-2 gap-3 md:gap-6">
                                {[
                                    {
                                        title: "Achat Cash",
                                        desc: "Reprise immédiate au meilleur prix du marché.",
                                        icon: <Zap size={18} />
                                    },
                                    {
                                        title: "Stock Lab",
                                        desc: "Véhicules révisés sous protocole strict.",
                                        icon: <ShieldCheck size={18} />
                                    },
                                    {
                                        title: "Expertise 31",
                                        desc: "Service de proximité dédié aux passionnés.",
                                        icon: <MapPin size={18} />
                                    },
                                    {
                                        title: "Vente Flash",
                                        desc: "Vendez rapidement via notre réseau.",
                                        icon: <Search size={18} />
                                    }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col gap-4 p-6 md:p-10 glass-panel border border-white/5 hover:border-accent-gold/40 transition-all group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-12 h-12 border-r border-t border-accent-gold/0 group-hover:border-accent-gold/40 transition-all duration-500" />
                                        <div className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-accent-gold/0 group-hover:border-accent-gold/40 transition-all duration-500" />

                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-accent-gold/5 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-black transition-all duration-500">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-white mb-3 group-hover:text-accent-gold transition-colors">{item.title}</h4>
                                            <p className="text-[9px] md:text-[11px] text-white/40 leading-relaxed font-medium uppercase tracking-wider">{item.desc}</p>
                                        </div>

                                        <div className="absolute top-4 left-4 text-[7px] font-mono text-white/5 group-hover:text-accent-gold/20">0{i + 1} // DATA_NODE</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6 md:gap-8">
                                <Link to="/stock">
                                    <button className="gold-button px-14 py-5">ACHETER UN VÉHICULE</button>
                                </Link>
                                <Link to="/contact">
                                    <button className="gold-button-outline px-14 py-5 text-accent-gold">VENDEZ VOTRE AUTO</button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative lg:block"
                        >
                            <div className="relative aspect-[4/5] glass-panel rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                                <div className="absolute inset-0 lab-grid opacity-20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

                                {/* Background Image placeholder - Using the hero image but stylized */}
                                <img
                                    src={heroImg}
                                    className="w-full h-full object-cover opacity-60 grayscale scale-110 group-hover:scale-100 transition-all duration-1000"
                                    alt="CarXLab Toulouse Garage"
                                />

                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-20">
                                    <div className="w-24 h-24 mb-8 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center animate-pulse">
                                        <MapPin size={48} className="text-accent-gold" />
                                    </div>
                                    <h3 className="text-4xl font-black uppercase tracking-widest mb-4">LAUNAGUET</h3>
                                    <div className="h-[2px] w-32 bg-accent-gold/50 mb-4" />
                                    <p className="text-white/40 text-sm font-bold tracking-[0.4em] uppercase">Secteur Toulouse (31)</p>
                                </div>

                                {/* Coordinate markers */}
                                <div className="absolute top-10 left-10 text-[10px] text-accent-gold font-black tracking-[0.3em]">SITE OFFICE ID: 31000</div>
                                <div className="absolute bottom-10 right-10 text-[10px] text-accent-gold font-black tracking-[0.3em]">SECURE TRADE ZONE</div>
                            </div>
                        </motion.div>
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
                            <h2 className="text-4xl md:text-7xl font-black mb-16 uppercase tracking-tight leading-[1.1]">
                                OÙ NOUS <br /><span className="gold-gradient">TROUVER</span>
                            </h2>
                            <div className="space-y-10">
                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shrink-0">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-widest mb-2">Le Laboratoire</h4>
                                        <p className="text-white/40 text-lg font-light leading-relaxed">4 impasses du pont<br />31140 Launaguet, France</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shrink-0">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase tracking-widest mb-2">Ligne Directe</h4>
                                        <p className="text-white/40 text-lg font-light leading-relaxed">06 59 33 03 12<br />Expertise & Stock</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12">
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=4+impasse+du+pont+31140+Launaguet"
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
                            <div className="relative aspect-video md:aspect-square glass-panel rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.67!2d1.46!3d43.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb1!2s4+Imp.+du+Pont%2C+31140+Launaguet!5e0!3m2!1sfr!2sfr!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="opacity-60 hover:opacity-100 transition-opacity duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="section-padding bg-black relative overflow-hidden">
                <div className="main-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center glass-panel p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-10 uppercase tracking-tighter leading-tight gold-gradient">
                            VÉHICULES D'OCCASION À TOULOUSE - LAUNAGUET
                        </h2>
                        <div className="space-y-6 text-white/40 text-base md:text-xl font-light leading-relaxed">
                            <p>
                                Bienvenue chez <strong className="text-white">CarXLab</strong>, votre garage spécialisé dans la vente de voitures d'occasion premium. Notre laboratoire automobile est stratégiquement situé à Launaguet, à quelques minutes de <strong className="text-white">Toulouse</strong>, Blagnac, et l'Union. Nous sélectionnons rigoureusement chaque véhicule pour vous offrir une qualité irréprochable en Haute-Garonne.
                            </p>
                            <p>
                                Que vous recherchiez une berline de luxe, un SUV familial ou une sportive d'exception, notre catalogue live est mis à jour quotidiennement. Chaque annonce détaille précisément l'historique du véhicule, son kilométrage certifié et ses options exclusives. Nos services s'étendent à tout le secteur de Toulouse métropole, incluant Aucamville, Saint-Alban et Castelginest.
                            </p>
                            <p>
                                En plus de la vente, profitez de notre expertise gratuite pour le rachat de votre voiture cash. Nous rachetons tous types de modèles récents au meilleur prix du marché local. Faites confiance à l'expertise CarXLab pour votre prochain achat automobile dans le 31.
                            </p>
                        </div>

                        {/* Lab architectural detail */}
                        <div className="mt-12 pt-12 border-t border-white/5 flex justify-center items-center gap-4">
                            <span className="h-[1px] w-8 bg-accent-gold/30"></span>
                            <span className="text-[10px] text-accent-gold font-black tracking-[0.4em] uppercase">Expertise Automobile Lab</span>
                            <span className="h-[1px] w-8 bg-accent-gold/30"></span>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
            </section>

            {/* CTA Section */}
            <section className="pb-40 md:pb-96 pt-20 md:pt-32 bg-black relative flex items-center justify-center overflow-hidden">
                <div className="main-container text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-4xl md:text-7xl font-black mb-8 md:mb-10 uppercase leading-[1] tracking-tight">
                            VOTRE <br /><span className="gold-gradient">FUTUR</span> EST ICI
                        </h2>
                        <p className="text-lg md:text-xl text-white/30 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Vendez votre véhicule au juste prix ou trouvez la perle rare parmi notre stock ultra-limité.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full px-6">
                            <Link to="/contact" className="w-full md:w-auto">
                                <button className="gold-button w-full px-12 py-5 text-xs">PRENDRE RENDEZ-VOUS</button>
                            </Link>
                            <Link to="/stock" className="w-full md:w-auto">
                                <button className="gold-button-outline w-full px-12 py-5 text-xs">CATALOGUE LIVE</button>
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
