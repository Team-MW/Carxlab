import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Zap, ShieldCheck } from 'lucide-react';
import FAQ from '../components/FAQ';

const Achat = () => {
    const MotionDiv = motion.div;
    return (
        <div className="relative">
            <section className="page-hero">
                <div className="absolute top-0 left-0 w-[60%] h-[100%] bg-accent-gold/5 blur-[150px] -translate-y-1/2 pointer-events-none" />

                <div className="main-container relative z-10 flex-center-col">
                    <MotionDiv
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-6xl"
                    >
                        <div className="flex-center gap-6 mb-16">
                            <span className="h-[2px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Estimation Lab</span>
                            <span className="h-[2px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>
                        <h1 className="hero-title mb-16">
                            VENDEZ VOTRE <br /><span className="gold-gradient">VÉHICULE</span>
                        </h1>

                    </MotionDiv>
                </div>
            </section>

            <section className="section-padding relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-gold/5 blur-[200px] pointer-events-none" />

                <div className="main-container relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-32">
                        {[
                            {
                                title: "Estimation en ligne",
                                desc: "Décrivez votre véhicule en quelques clics via notre protocole digital simplifié.",
                                icon: <Search size={24} />,
                                step: "01"
                            },
                            {
                                title: "Expertise physique",
                                desc: "Prenez rendez-vous dans notre laboratoire pour une validation technique complète.",
                                icon: <Zap size={24} />,
                                step: "02"
                            },
                            {
                                title: "Paiement sécurisé",
                                desc: "Une fois l'expertise validée, nous déclenchons un virement instantané.",
                                icon: <ShieldCheck size={24} />,
                                step: "03"
                            }
                        ].map((feature, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                className="relative group"
                            >
                                <div className="glass-panel p-10 md:p-12 lg:p-14 h-full border border-white/5 hover:border-accent-gold/20 transition-all duration-500 rounded-[2.5rem] flex flex-col items-center md:items-start text-center md:text-left gap-8 relative overflow-hidden">
                                    {/* background numbering */}
                                    <span className="absolute -top-4 -right-4 text-9xl font-black text-white/[0.02] pointer-events-none group-hover:text-accent-gold/[0.05] transition-colors duration-500">
                                        {feature.step}
                                    </span>

                                    <div className="w-16 h-16 rounded-2xl bg-accent-gold/10 flex items-center justify-center text-accent-gold border border-accent-gold/20 group-hover:scale-110 group-hover:bg-accent-gold group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                                        {feature.icon}
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-white/90">
                                            {feature.title}
                                        </h3>
                                        <p className="text-white/30 leading-relaxed font-light text-base lg:text-lg">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>

                    {/* Contact CTA Section */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col items-center text-center gap-10"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent-gold/50 to-transparent mb-4" />

                        <Link to="/contact">
                            <button className="gold-button px-14 md:px-20 py-6 md:py-7 text-lg md:text-xl tracking-[0.3em] font-black group relative overflow-hidden">
                                <span className="relative z-10">LANCER L'ESTIMATION</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </button>
                        </Link>

                        <div className="space-y-3">
                            <p className="text-accent-gold/60 uppercase tracking-[0.4em] font-black text-[10px] md:text-xs">
                                PROTOCOLE DE RACHAT SÉCURISÉ
                            </p>
                            <p className="text-white/20 uppercase tracking-[0.2em] font-medium text-[9px] md:text-[10px]">
                                Analyse physique en laboratoire recommandée sous 48h
                            </p>
                        </div>
                    </MotionDiv>

                </div>
            </section>

            {/* SEO Buyback Content */}
            <section className="section-padding bg-black border-t border-white/5 flex justify-center">
                <div className="main-container flex flex-col items-center w-full">
                    <div className="w-full max-w-4xl text-center">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-10">Estimation et rachat automobile à Toulouse (31)</h2>
                        <div className="flex flex-col gap-6 text-sm md:text-base text-white/30 leading-relaxed font-light text-center">
                            <p>
                                Vous souhaitez <strong>vendre votre voiture à Toulouse</strong> rapidement et en toute sécurité ? CarXLab propose un service de <strong>rachat cash</strong> simplifié pour tous les propriétaires de véhicules récents et de prestige à <strong>Launaguet</strong> et dans toute la Haute-Garonne.
                            </p>
                            <p>
                                Notre processus d'expertise est conçu pour refléter la valeur réelle du marché. En évitant les plateformes génériques, vous bénéficiez d'une <strong>estimation personnalisée</strong> réalisée par des passionnés qui comprennent la valeur des options et de l'entretien de votre véhicule.
                            </p>
                            <p>
                                Que vous soyez à Blagnac, Colomiers ou Tournefeuille, nous nous déplaçons ou vous accueillons dans notre showroom pour une <strong>reprise immédiate</strong>. Nous gérons l'intégralité des formalités administratives pour une vente sans stress.
                            </p>
                            <p>
                                <strong>CarXLab Launaguet</strong> : la référence locale pour la revente de BMW, Audi, Mercedes, Porsche et autres marques de prestige dans le 31. Obtenez votre offre de rachat en moins de 24h.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <FAQ
                subtitle="Vos questions sur la vente et le rachat de votre véhicule."
                items={[
                    {
                        question: "Comment obtenir une estimation de mon véhicule avec CarXLab ?",
                        answer: "Commencez par remplir notre formulaire en ligne en décrivant votre véhicule (marque, modèle, année, kilométrage, état général). Nos experts vous contactent sous 24h avec une première offre indicative. Si elle vous convient, nous organisons un rendez-vous au laboratoire pour l'expertise physique finale."
                    },
                    {
                        question: "CarXLab rachète-t-il tous types de véhicules ?",
                        answer: "Nous nous spécialisons dans les véhicules premium et de prestige : sportives, berlines de luxe, SUV haut de gamme. Nous travaillons principalement avec des marques comme Porsche, Ferrari, Lamborghini, Mercedes AMG, BMW M, Audi RS, Range Rover et équivalents. Pour les véhicules standards, nous pouvons vous orienter vers nos partenaires."
                    },
                    {
                        question: "En combien de temps suis-je payé après la vente de mon véhicule ?",
                        answer: "Une fois l'expertise validée et le dossier administratif complété (carte grise, contrôle technique, etc.), le virement bancaire est effectué dans un délai maximum de 48 heures ouvrées. Nous nous occupons de l'intégralité des démarches administratives à votre place, sans frais supplémentaires."
                    },
                    {
                        question: "Dois-je effectuer des réparations avant de vendre mon véhicule à CarXLab ?",
                        answer: "Non. Nous rachetons les véhicules en l'état, quelle que soit leur condition. Notre offre tient compte de l'état réel du véhicule, diagnostiqué par nos experts. Il est inutile d'investir dans des réparations avant la vente : notre estimation intègre les travaux éventuels et reste toujours juste et transparente."
                    },
                    {
                        question: "Quels documents dois-je fournir pour vendre mon véhicule ?",
                        answer: "Vous aurez besoin de la carte grise du véhicule, d'un contrôle technique de moins de 6 mois (pour les véhicules de plus de 4 ans), de votre pièce d'identité et d'un relevé d'identité bancaire (RIB) pour le virement. CarXLab se charge du certificat de cession et de la déclaration de cession en ligne."
                    }
                ]}
            />
        </div>
    );
};

export default Achat;
