import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Zap } from 'lucide-react';
import FAQ from '../components/FAQ';

const Contact = () => {
    const MotionDiv = motion.div;
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
                        <div className="flex-center gap-6 mb-16">
                            <span className="h-[1px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Communication Hub</span>
                            <span className="h-[1px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>
                        <h1 className="hero-title mb-16">
                            REJOINDRE LE <br /><span className="gold-gradient">LABORATOIRE</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white/40 mx-auto max-w-2xl font-light leading-relaxed">
                            Besoin d'une expertise ? D'une estimation ? Ou d'une recherche personnalisée ? Nos ingénieurs vous répondent sous 24h.
                        </p>
                    </MotionDiv>
                </div>
            </section>

            <section className="section-padding relative overflow-hidden">
                {/* Background glow for premium feel */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-gold/5 blur-[200px] pointer-events-none" />

                <div className="main-container relative z-10 flex flex-col items-center">
                    <div className="w-full max-w-5xl space-y-24">
                        {/* Contact Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {[
                                {
                                    label: 'Prendre RDV',
                                    value: '06 59 33 03 12',
                                    icon: <Phone size={24} />,
                                    link: 'tel:0659330312'
                                },
                                {
                                    label: 'Support & Expertise',
                                    value: 'Carxlab31@gmail.com',
                                    icon: <Mail size={24} />,
                                    link: 'mailto:Carxlab31@gmail.com'
                                },
                                {
                                    label: 'Notre Bureau',
                                    value: '4 impasses du pont, 31140 Launaguet',
                                    icon: <MapPin size={24} />,
                                    link: 'https://www.google.com/maps/search/?api=1&query=4+impasse+du+pont+31140+Launaguet'
                                },
                                {
                                    label: 'Réseaux Sociaux',
                                    value: '@Carxlab',
                                    icon: <Zap size={24} />,
                                    link: '#'
                                }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.link}
                                    target={item.link.startsWith('http') ? "_blank" : undefined}
                                    rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="glass-panel p-8 md:p-10 flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-10 group hover:neon-border transition-all duration-500 rounded-[2.5rem] bg-white/[0.02] border border-white/5"
                                >
                                    <div className="w-20 h-20 rounded-3xl bg-accent-gold/10 flex items-center justify-center text-accent-gold flex-shrink-0 group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 mb-2 group-hover:text-accent-gold/50 transition-colors">
                                            {item.label}
                                        </div>
                                        <div className="text-xl md:text-2xl font-black text-white group-hover:text-accent-gold transition-colors tracking-tight">
                                            {item.value}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Hours Section - Centered */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full max-w-3xl mx-auto"
                        >
                            <div className="glass-panel p-12 md:p-16 border-t-4 border-t-accent-gold bg-black/40 rounded-[3rem] shadow-2xl relative overflow-hidden group hover:border-accent-gold/30 transition-all duration-500">
                                <div className="absolute inset-0 lab-grid opacity-10 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="h-px flex-1 bg-white/10" />
                                        <h4 className="text-2xl font-black uppercase tracking-[0.4em] text-white whitespace-nowrap">
                                            Horaires d'Accès
                                        </h4>
                                        <div className="h-px flex-1 bg-white/10" />
                                    </div>

                                    <div className="space-y-8">
                                        {[
                                            { day: 'Lundi - Vendredi', time: '09h - 19h' },
                                            { day: 'Samedi', time: '10h - 18h' },
                                            { day: 'Dimanche', time: 'Fermé', highlight: true }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center text-lg md:text-xl border-b border-white/5 pb-6 group/row">
                                                <span className="text-white/60 font-bold group-hover/row:text-white transition-colors">{item.day}</span>
                                                <span className={item.highlight ? "text-accent-gold font-black" : "text-white/30 font-light"}>
                                                    {item.time}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 text-center">
                                        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">
                                            Protocole Lab CarXLab // Verified Status
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <FAQ
                subtitle="Réponses à vos questions pratiques pour nous contacter."
                items={[
                    {
                        question: "Quel est le délai de réponse à une demande de contact ?",
                        answer: "Nos ingénieurs répondent à toutes les demandes sous 24 heures ouvrées. Pour les demandes urgentes ou les projets avec une contrainte de temps particulière (achat imminent, vente urgente), précisez-le dans votre message et nous prioriserons votre dossier."
                    },
                    {
                        question: "Comment prendre rendez-vous au laboratoire CarXLab ?",
                        answer: "Remplissez le formulaire de contact en sélectionnant le service souhaité (expertise, achat ou vente). Vous pouvez également nous appeler directement au 06 59 33 03 12 du lundi au vendredi de 9h à 19h et le samedi de 10h à 18h. Un conseiller vous confirmera votre créneau dans les meilleurs délais."
                    },
                    {
                        question: "Le laboratoire CarXLab est-il ouvert au grand public ?",
                        answer: "Notre laboratoire reçoit exclusivement sur rendez-vous. Cela nous permet de dédier un expert à chaque client lors de sa visite et de garantir une qualité de service irréprochable. Les visites impromptues ne peuvent pas être garanties en termes de disponibilité."
                    },
                    {
                        question: "Peut-on effectuer une expertise sur un véhicule qui n'est pas chez CarXLab ?",
                        answer: "Oui. Nous proposons un service d'expertise indépendante : vous souhaitez acheter un véhicule d'un particulier ou d'un autre vendeur ? Nous nous déplaçons ou prenons en charge le véhicule pour un contrôle complet. Contactez-nous pour un devis personnalisé selon la localisation et le type de véhicule."
                    },
                    {
                        question: "Acceptez-vous les demandes de partenariat professionnel ?",
                        answer: "Nous sommes ouverts aux partenariats avec des professionnels de l'automobile (concessionnaires, courtiers, marchands), des sociétés de gestion de flotte et des family offices. Contactez-nous via le formulaire en sélectionnant 'Expertise complète' et précisez la nature du partenariat envisagé dans votre message."
                    }
                ]}
            />
        </div>
    );
};

export default Contact;
