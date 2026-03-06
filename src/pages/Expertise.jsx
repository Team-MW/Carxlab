import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Search, Zap, ShieldCheck, Microscope, Database } from 'lucide-react';

const Expertise = () => {
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
        <div className="pt-64 pb-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[60%] h-[100%] bg-accent-gold/5 blur-[150px] -translate-y-1/2 pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <span className="h-[2px] w-12 bg-accent-gold"></span>
                        <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Notre Protocol</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-12 uppercase leading-[0.85] tracking-tighter">
                        L'EXPERTISE <br /><span className="gold-gradient">SANS COMPROMIS</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 max-w-2xl font-light leading-relaxed mb-20">
                        Chez CarXLab, nous avons réinventé l'expertise automobile traditionnelle pour en faire une science de précision.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 mb-32">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="glass-panel p-16 border-l-4 border-l-accent-gold/30 hover:border-l-accent-gold transition-all duration-500 group"
                        >
                            <div className="text-accent-gold mb-10 group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
                            <h3 className="text-3xl font-black mb-6 uppercase tracking-tight">{step.title}</h3>
                            <p className="text-white/40 text-lg leading-relaxed font-light">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Dynamic Display Panel */}
                <div className="relative h-[600px] border border-white/5 overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
                    <div className="absolute inset-0 lab-grid opacity-20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center pointer-events-none">
                        <div className="w-24 h-24 mb-12 rounded-full border border-accent-gold/40 flex items-center justify-center relative">
                            <div className="absolute inset-x-0 h-[1px] bg-accent-gold animate-[scan-line_4s_linear_infinite]" />
                            <Search size={40} className="text-accent-gold" />
                        </div>
                        <h4 className="text-2xl font-black tracking-[0.5em] mb-6 uppercase">Transparence Totale</h4>
                        <p className="max-w-xl text-white/30 text-lg">Chaque client reçoit un accès privé au "Dossier Médical" numérique de son véhicule, avec photos haute définition et rapports d'analyse complets.</p>
                    </div>
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
                </div>
            </div>
        </div>
    );
};

export default Expertise;
