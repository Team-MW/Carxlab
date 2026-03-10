import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-0 border-opacity-70">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-10 flex items-center justify-between text-left group transition-all"
                aria-expanded={isOpen}
            >
                <span className={`text-lg md:text-xl font-bold uppercase tracking-widest transition-colors duration-300 ${isOpen ? 'text-accent-gold' : 'text-white/70 group-hover:text-white'}`}>
                    {question}
                </span>
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ml-4 ${isOpen ? 'border-accent-gold text-accent-gold' : 'border-white/10 text-white/40'}`}>
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
                        <p className="pb-12 text-white/40 leading-loose font-light text-lg max-w-4xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = ({ items, subtitle }) => {
    const displayItems = items || [];

    /* JSON-LD FAQPage structured data for Google rich results */
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": displayItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="section-padding bg-black/30 relative overflow-hidden">
            {/* JSON-LD SEO Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

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
                        {subtitle || "Tout ce que vous devez savoir sur le protocole CarXLab et nos services."}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto glass-panel p-8 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl">
                    {displayItems.map((item, index) => (
                        <FAQItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
