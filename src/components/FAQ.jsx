import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-8 flex items-center justify-between text-left group transition-all"
            >
                <span className={`text-lg md:text-xl font-bold uppercase tracking-widest transition-colors duration-300 ${isOpen ? 'text-accent-gold' : 'text-white/70 group-hover:text-white'}`}>
                    {question}
                </span>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-accent-gold text-accent-gold rotate-180' : 'border-white/10 text-white/40'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-10 text-white/40 leading-relaxed font-light text-lg max-w-4xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = ({ items }) => {
    const defaultItems = [
        {
            question: "Qu'est-ce que le Protocole Lab ?",
            answer: "Le Protocole Lab est notre méthode exclusive d'expertise en 256 points de contrôle. Nous utilisons des outils de diagnostic de pointe pour analyser l'électronique, la structure moléculaire de la peinture et la santé mécanique globale du véhicule."
        },
        {
            question: "Comment se déroule le rachat de mon véhicule ?",
            answer: "Après une première estimation en ligne, nous organisons un rendez-vous au laboratoire. Une fois l'expertise physique validée, nous procédons au virement immédiat et prenons en charge l'ensemble des démarches administratives."
        },
        {
            question: "Vos véhicules sont-ils garantis ?",
            answer: "Tous nos véhicules bénéficient d'une garantie premium minimale de 6 mois, extensible jusqu'à 24 mois. Chaque voiture est livrée avec son dossier digital complet attestant de son état irréprochable."
        },
        {
            question: "Outils de financement disponibles ?",
            answer: "Nous collaborons avec des partenaires financiers de premier plan pour vous proposer des solutions de crédit classique ou de LOA sur mesure, adaptées à votre profil et à votre projet automobile."
        }
    ];

    const displayItems = items || defaultItems;

    return (
        <section className="section-padding bg-black/30 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent-gold/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="main-container relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-[2px] w-12 bg-accent-gold"></span>
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Assistance</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            QUESTIONS <br /><span className="gold-gradient">FRÉQUENTES</span>
                        </h2>
                    </div>
                    <p className="text-white/30 text-lg font-light max-w-xs md:text-right">
                        Tout ce que vous devez savoir sur le protocole CarXLab et nos services.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto glass-panel p-6 md:p-12 rounded-[3rem] border border-white/5">
                    {displayItems.map((item, index) => (
                        <FAQItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
