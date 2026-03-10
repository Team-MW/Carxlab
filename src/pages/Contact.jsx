import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
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

            <section className="section-padding">
                <div className="main-container">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Left Side: Contact Info & Schedule */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-8">
                                {[
                                    { label: 'Prendre RDV', value: '+33 1 42 67 89 00', icon: <Phone size={20} /> },
                                    { label: 'Support & Expertise', value: 'contact@carxlab.fr', icon: <Mail size={20} /> },
                                    { label: 'Notre Bureau', value: '75008 Paris, France', icon: <MapPin size={20} /> }
                                ].map((item, i) => (
                                    <div key={i} className="glass-panel p-8 flex items-center gap-8 group hover:neon-border transition-all duration-500 rounded-2xl">
                                        <div className="w-16 h-16 rounded-2xl bg-accent-gold/10 flex items-center justify-center text-accent-gold flex-shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 mb-1">{item.label}</div>
                                            <div className="text-lg font-black text-white group-hover:text-accent-gold transition-colors">{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-panel p-12 md:p-16 border-l-4 border-l-accent-gold bg-black/40 rounded-3xl mt-10">
                                <h4 className="text-2xl font-black mb-12 uppercase tracking-[0.3em]">Horaires d'Accès</h4>
                                <div className="space-y-6">
                                    {[
                                        { day: 'Lundi - Vendredi', time: '09h - 19h' },
                                        { day: 'Samedi', time: '10h - 18h' },
                                        { day: 'Dimanche', time: 'Fermé', highlight: true }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-lg border-b border-white/5 pb-5">
                                            <span className="text-white font-bold">{item.day}</span>
                                            <span className={item.highlight ? "text-accent-gold/50" : "text-white/30"}>{item.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="lg:col-span-12 xl:col-span-7">
                            <div className="glass-panel p-12 md:p-20 neon-border bg-black/40 rounded-[3rem]">
                                <div className="mb-16">
                                    <h2 className="text-4xl font-black mb-6 uppercase tracking-[0.2em]">Lancer le Protocole</h2>
                                    <p className="text-white/30 text-xl font-light leading-loose">Remplissez le formulaire ci-dessous pour initier une demande de service ou d'information.</p>
                                </div>

                                <form className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <input type="text" className="w-full bg-white/5 border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white transition-all text-sm uppercase tracking-widest" placeholder="votre nom" />
                                        <select className="w-full bg-[#111] border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white/60 transition-all appearance-none text-sm uppercase tracking-widest bg-white/5">
                                            <option>Expertise complète</option>
                                            <option>Achat / Sourcing</option>
                                            <option>Vente / Reprise</option>
                                        </select>
                                    </div>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white transition-all text-sm uppercase tracking-widest" placeholder="votre email" />
                                    <textarea rows="4" className="w-full bg-white/5 border border-white/10 p-6 rounded-xl focus:border-accent-gold outline-none text-white transition-all text-sm uppercase tracking-widest" placeholder="votre message..."></textarea>
                                    <button type="submit" className="gold-button w-full py-8 text-lg tracking-[0.4em] font-black mt-8">INITIER LE PROTOCOLE</button>
                                </form>
                            </div>
                        </div>
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
                        answer: "Remplissez le formulaire de contact en sélectionnant le service souhaité (expertise, achat ou vente). Vous pouvez également nous appeler directement au +33 1 42 67 89 00 du lundi au vendredi de 9h à 19h et le samedi de 10h à 18h. Un conseiller vous confirmera votre créneau dans les meilleurs délais."
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
