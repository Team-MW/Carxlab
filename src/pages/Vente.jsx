import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';

const Vente = () => {
    const MotionDiv = motion.div;
    const cars = [
        { title: "Porsche 911 GT3", category: "Supercar", price: "245,000€", year: "2022", km: "8,500 km", power: "510 ch" },
        { title: "Audi RS6 Avant", category: "Performance", price: "185,000€", year: "2023", km: "3,200 km", power: "600 ch" },
        { title: "Ferrari F8 Tributo", category: "Hypercar", price: "320,000€", year: "2021", km: "12,000 km", power: "720 ch" }
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
                        <div className="flex-center gap-6 mb-16">
                            <span className="h-[1px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                            <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Stock Direct</span>
                            <span className="h-[1px] w-16 bg-accent-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"></span>
                        </div>
                        <h1 className="hero-title mb-16">
                            DÉCOUVREZ LE <br /><span className="gold-gradient">CATALOGUE</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white/40 mx-auto max-w-2xl font-light leading-relaxed">
                            Consultez notre stock de véhicules d'exception, certifiés par notre laboratoire de précision.
                        </p>
                    </MotionDiv>
                </div>
            </section>

            <section className="section-padding">
                <div className="main-container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {cars.map((car, i) => (
                            <MotionDiv
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="glass-panel overflow-hidden group hover:neon-border transition-all duration-500 bg-black/40 flex flex-col rounded-[2rem]"
                            >
                                <div className="h-[300px] bg-white/5 relative group-hover:bg-white/10 transition-colors flex items-center justify-center p-12 text-center">
                                    <div className="text-accent-gold/10 font-black text-8xl absolute pointer-events-none select-none">LAB</div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <Zap size={48} className="text-accent-gold mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                                        <div className="text-[10px] tracking-[0.6em] text-white/30 uppercase font-black">Scan Image</div>
                                    </div>
                                </div>

                                <div className="p-10 border-t border-white/5 bg-black/20 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex-grow">
                                            <p className="text-accent-gold text-[10px] font-black uppercase tracking-[0.4em] mb-2">{car.category}</p>
                                            <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">{car.title}</h3>
                                        </div>
                                        <div className="text-xl font-black gold-gradient ml-4 whitespace-nowrap">{car.price}</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-12">
                                        {[
                                            { k: "Année", v: car.year },
                                            { k: "Kms", v: car.km },
                                            { k: "Power", v: car.power }
                                        ].map((spec, idx) => (
                                            <div key={idx} className={`p-4 bg-white/5 rounded-xl border border-white/5 text-center flex flex-col justify-center ${idx === 2 ? 'col-span-2' : ''}`}>
                                                <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">{spec.k}</p>
                                                <p className="text-white font-bold text-sm tracking-widest">{spec.v}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <Link to="/contact" className="mt-auto">
                                        <button className="gold-button w-full gap-3 py-6 text-sm">
                                            DÉCOUVRIR <ArrowRight size={16} />
                                        </button>
                                    </Link>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>

                    {/* Sourcing CTA */}
                    <div className="mt-48 p-20 md:p-32 glass-panel border-l-8 border-l-accent-gold backdrop-blur-3xl bg-black/40 text-center flex flex-col items-center gap-16 rounded-[3rem]">
                        <div className="max-w-4xl">
                            <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-none">VOTRE CHERCHEUR DE <span className="gold-gradient">PÉPITES</span></h2>
                            <p className="text-xl md:text-2xl text-white/30 font-light leading-loose">Vous ne trouvez pas votre bonheur dans notre catalogue ? Nos experts activent leur réseau européen pour sourcer le véhicule de vos rêves.</p>
                        </div>
                        <Link to="/contact">
                            <button className="gold-button px-24 py-8 text-sm">LANCER UNE RECHERCHE</button>
                        </Link>
                    </div>
                </div>
            </section>
            <FAQ
                subtitle="Tout savoir sur l'achat d'un véhicule d'exception chez CarXLab."
                items={[
                    {
                        question: "Comment CarXLab sélectionne-t-il les véhicules de son catalogue ?",
                        answer: "Chaque véhicule de notre catalogue passe obligatoirement par notre Protocole Lab : expertise en 256 points, séquençage électronique complet, contrôle structural de carrosserie. Seuls les véhicules qui passent l'intégralité de notre grille d'exigence sont intégrés au stock. L'objectif est zéro mauvaise surprise pour l'acheteur."
                    },
                    {
                        question: "Puis-je visiter un véhicule du catalogue avant de l'acheter ?",
                        answer: "Absolument. Chaque achat commence par une visite au laboratoire, sur rendez-vous, pour voir et essayer le véhicule. Vous aurez également accès à son dossier digital complet (photos HD, rapports d'expertise, historique d'entretien) avant même de vous déplacer."
                    },
                    {
                        question: "CarXLab propose-t-il un service de sourcing pour trouver un véhicule spécifique ?",
                        answer: "Oui. Remplissez votre demande via notre formulaire de contact en décrivant précisément le véhicule recherché (modèle, motorisation, couleur, options, budget). Nos experts activent leur réseau européen de partenaires et de marchands pour localiser la perle rare. Ce service est sans engagement et sans frais jusqu'à ce que le véhicule soit trouvé."
                    },
                    {
                        question: "Quelle garantie accompagne les véhicules achetés chez CarXLab ?",
                        answer: "Tous nos véhicules sont livrés avec une garantie constructeur ou CarXLab minimum de 6 mois, extensible jusqu'à 24 mois. Cette garantie couvre les pièces mécaniques essentielles et vous protège contre tout vice caché non révélé par notre expertise (ce qui est extrêmement rare étant donné la rigueur de notre protocole)."
                    },
                    {
                        question: "Proposez-vous des solutions de financement pour l'achat d'un véhicule ?",
                        answer: "Oui. Nous travaillons avec des établissements financiers spécialisés dans les véhicules premium pour vous proposer des crédits classiques ou des solutions de Location avec Option d'Achat (LOA) sur mesure. Nos conseillers peuvent vous accompagner dans le montage de votre dossier financier lors de votre visite au laboratoire."
                    }
                ]}
            />
        </div>
    );
};

export default memo(Vente);
