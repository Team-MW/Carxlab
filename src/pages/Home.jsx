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
                            <Link to="/stock" className="flex-1 sm:flex-none">
                                <button className="gold-button group gap-4 w-full">
                                    EXPLORER LE STOCK
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link to="/expertise" className="flex-1 sm:flex-none">
                                <button className="gold-button-outline px-12 w-full">
                                    NOS MÉTHODES
                                </button>
                            </Link>
                        </div>
                        {/* Center-Aligned Metrics */}
                        <div className="mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 items-center justify-center">
                            {[
                                { label: 'Certifications', value: 4.8, suffix: 'k+', decimals: 1 },
                                { label: 'Protocole Lab', value: 150, suffix: '+', decimals: 0 },
                                { label: 'Fiabilité', value: 99.8, suffix: '%', decimals: 1 }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center group">
                                    <div className="text-white font-black text-4xl md:text-6xl mb-3 tracking-tighter flex items-baseline group-hover:scale-110 transition-transform duration-500">
                                        <Counter value={stat.value} decimals={stat.decimals} />
                                        <span className="text-accent-gold text-xl md:text-2xl ml-1 font-bold">{stat.suffix}</span>
                                    </div>
                                    <div className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SEO Presentation Section: Achat Revente Toulouse */}
            <section className="section-padding bg-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full lab-grid opacity-10 pointer-events-none" />
                <div className="main-container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-center">
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

                            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-[1.1]">
                                VOTRE SPÉCIALISTE <br /><span className="gold-gradient">AUTO À LAUNAGUET</span>
                            </h2>

                            <p className="text-lg md:text-xl text-white/40 mb-12 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                                CarXLab est votre partenaire de confiance pour l'<strong>achat et la revente de véhicules d'occasion</strong> et de prestige à Launaguet. Situés à 15 minutes de Toulouse, nous sélectionnons pour vous les meilleures pépites automobiles en Haute-Garonne.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                                {[
                                    {
                                        title: "Achat Cash",
                                        desc: "Reprise immédiate de votre véhicule au meilleur prix du marché toulousain.",
                                        icon: <Zap size={20} />
                                    },
                                    {
                                        title: "Stock Premium",
                                        desc: "Large choix de voitures d'occasion révisées et garanties par nos experts.",
                                        icon: <ShieldCheck size={20} />
                                    },
                                    {
                                        title: "Expertise Locale",
                                        desc: "Un service de proximité dédié aux passionnés d'automobile du 31.",
                                        icon: <MapPin size={20} />
                                    },
                                    {
                                        title: "Vente Flash",
                                        desc: "Vendez votre voiture rapidement grâce à notre réseau de partenaires.",
                                        icon: <Search size={20} />
                                    }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col gap-4 p-8 glass-panel border border-white/5 hover:border-accent-gold/30 transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-black uppercase tracking-widest text-white mb-2">{item.title}</h4>
                                            <p className="text-xs text-white/30 leading-relaxed font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-8">
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
                            <h2 className="text-5xl md:text-7xl font-black mb-16 uppercase tracking-tight leading-[1.1]">
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
                            <div className="relative aspect-square glass-panel rounded-[3rem] overflow-hidden border border-white/5 group">
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

            {/* CTA Section */}
            <section className="pb-96 pt-32 bg-black relative flex items-center justify-center overflow-hidden">
                <div className="main-container text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase leading-[1.1] tracking-tight">
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
