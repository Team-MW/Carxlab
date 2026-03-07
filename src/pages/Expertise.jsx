import { motion } from 'framer-motion';
import { Microscope, Database, Zap, ShieldCheck, Search } from 'lucide-react';
import { memo } from 'react';
import FAQ from '../components/FAQ';

const Expertise = () => {
    const MotionDiv = motion.div;
    const steps = [
        {
            title: "Analyse Structurelle",
            desc: "Chaque centimètre de la carrosserie est scanné pour détecter toute réparation antérieure non mentionnée. Notre technologie ne ment jamais.",
            icon: <Microscope size={32} />
        },
        {
            title: "Séquençage Électronique",
            desc: "Nous vérifions l'intégralité des calculateurs pour nous assurer de l'authenticité du kilométrage et de l'état des systèmes.",
            icon: <Database size={32} />
        },
        {
            title: "Expertise Mécanique",
            desc: "Un diagnostic poussé du moteur, de la transmission et des trains roulants effectué par nos ingénieurs certifiés.",
            icon: <Zap size={32} />
        },
        {
            title: "Certification Lab",
            desc: "Une fois le processus terminé, nous délivrons un certificat d'authenticité Carxlab reconnu pour sa rigueur.",
            icon: <ShieldCheck size={32} />
        }
    ];

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
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Notre Protocole</span>
                            <span className="h-[1px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>
                        <h1 className="hero-title mb-12">
                            EXPERTISE <br /><span className="gold-gradient">SANS FAILLES</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white/40 mx-auto max-w-2xl font-light leading-relaxed">
                            Chez CarXLab, nous avons réinventé l'expertise automobile traditionnelle pour en faire une science de précision brute.
                        </p>
                    </MotionDiv>
                </div>
            </section>

            <section className="section-padding content-grid-section">
                <div className="main-container">
                    <div className="flex flex-col items-center mb-40">
                        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
                            {steps.map((step, i) => (
                                <MotionDiv
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className="glass-panel p-12 md:p-16 flex flex-col items-center text-center border-t border-t-accent-gold/20 hover:border-t-accent-gold transition-all duration-500 group"
                                >
                                    <div className="text-accent-gold mb-10 group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
                                    <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">{step.title}</h3>
                                    <p className="text-white/30 text-lg leading-relaxed font-light">{step.desc}</p>
                                </MotionDiv>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Display Panel */}
                    <div className="relative h-[600px] border border-white/5 overflow-hidden group rounded-[3rem] bg-black/40">
                        <div className="absolute inset-0 lab-grid opacity-10" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center relative z-10">
                            <div className="w-28 h-28 mb-12 rounded-full border border-accent-gold/20 flex items-center justify-center relative">
                                <div className="absolute inset-x-0 h-[2px] bg-accent-gold/40 animate-[scan-line_4s_linear_infinite]" />
                                <Search size={40} className="text-accent-gold" />
                            </div>
                            <h4 className="text-3xl font-black tracking-[0.4em] mb-8 uppercase">Transparence Totale</h4>
                            <p className="max-w-2xl text-white/30 text-xl font-light leading-relaxed">Chaque client reçoit un accès privé au "Dossier Médical" numérique de son véhicule, avec photos haute définition et rapports d'analyse complets.</p>
                        </div>
                        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
                    </div>
                </div>
            </section>
            <FAQ />
        </div>
    );
};

export default memo(Expertise);
