import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="mb-16"
    >
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/5">
            <span className="text-accent-gold">—</span> {title}
        </h2>
        <div className="text-white/40 font-light leading-relaxed space-y-3 text-base">
            {children}
        </div>
    </motion.div>
);

const MentionsLegales = () => {
    return (
        <div className="relative">
            {/* Hero */}
            <section className="page-hero min-h-[40vh]">
                <div className="absolute top-0 right-0 w-[60%] h-full bg-accent-gold/5 blur-[150px] pointer-events-none" />
                <div className="main-container relative z-10 flex-center-col">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl text-center"
                    >
                        <div className="flex-center gap-4 mb-10">
                            <span className="h-[1px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Transparence Lab</span>
                            <span className="h-[1px] w-12 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>
                        <h1 className="hero-title mb-6">
                            MENTIONS <br /><span className="gold-gradient">LÉGALES</span>
                        </h1>
                        <p className="text-white/30 text-sm tracking-widest uppercase font-bold">
                            Dernière mise à jour : Mars 2025
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding">
                <div className="main-container">
                    <div className="max-w-4xl mx-auto glass-panel rounded-[3rem] p-10 md:p-20 border border-white/5">

                        <Section title="Éditeur du site" delay={0}>
                            <p>Le présent site internet est édité par la société <strong className="text-white/70">CARXLAB SAS</strong>.</p>
                            <p>Siège social : 4 impasses du pont, 31140 Launaguet, France</p>
                            <p>Email : <a href="mailto:Carxlab31@gmail.com" className="text-accent-gold hover:underline">Carxlab31@gmail.com</a></p>
                            <p>Téléphone : <a href="tel:0659330312" className="text-accent-gold hover:underline">06 59 33 03 12</a></p>
                            <p>Forme juridique : Société par Actions Simplifiée (SAS)</p>
                            <p>Capital social : 10 000 €</p>
                            <p>RCS Toulouse : [En cours d'immatriculation]</p>
                            <p>Numéro de TVA intracommunautaire : FR00 000 000 000</p>
                        </Section>

                        <Section title="Directeur de la publication" delay={0.1}>
                            <p>Le directeur de la publication est <strong className="text-white/70">M. [Nom du dirigeant]</strong>, en sa qualité de Président de la société CARXLAB SAS.</p>
                        </Section>

                        <Section title="Hébergement" delay={0.2}>
                            <p>Le site est hébergé par :</p>
                            <p><strong className="text-white/70">Vercel Inc.</strong></p>
                            <p>340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
                            <p>Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent-gold hover:underline">vercel.com</a></p>
                        </Section>

                        <Section title="Propriété intellectuelle" delay={0.3}>
                            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                            <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse de CarXLab.</p>
                            <p>Les marques, logos et signes distinctifs reproduits sur ce site sont la propriété exclusive de CARXLAB SAS ou de leurs détenteurs respectifs.</p>
                        </Section>

                        <Section title="Données personnelles" delay={0.4}>
                            <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés n°78-17 du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données, ou encore de limitation du traitement.</p>
                            <p>Les informations collectées via les formulaires de contact sont uniquement utilisées pour répondre à vos demandes. Elles ne sont pas transmises à des tiers sans votre consentement.</p>
                            <p>Pour exercer ces droits ou pour toute question, contactez-nous à : <a href="mailto:Carxlab31@gmail.com" className="text-accent-gold hover:underline">Carxlab31@gmail.com</a></p>
                        </Section>

                        <Section title="Cookies" delay={0.5}>
                            <p>Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement.</p>
                            <p>Vous pouvez à tout moment modifier vos préférences depuis les paramètres de votre navigateur.</p>
                        </Section>

                        <Section title="Responsabilité" delay={0.6}>
                            <p>CarXLab s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, CarXLab ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.</p>
                            <p>En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.</p>
                            <p>Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de CarXLab.</p>
                        </Section>

                        <Section title="Droit applicable" delay={0.7}>
                            <p>Le présent site et les présentes mentions légales sont soumis au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>
                        </Section>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default MentionsLegales;
