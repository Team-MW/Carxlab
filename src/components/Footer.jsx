import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/333carxlab.png';

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    return (
        <footer className="pt-16 md:pt-24 pb-8 md:pb-12 border-t border-white/5 bg-[#050505] relative overflow-hidden mt-auto">
            {/* Background glow overlay */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-accent-gold/5 blur-[150px] pointer-events-none" />

            <div className="main-container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 mb-16 md:mb-24">
                    {/* Brand Section */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
                        <Link to="/" onClick={handleScrollToTop} className="inline-block w-fit opacity-80 hover:opacity-100 transition-opacity">
                            <img src={logo} alt="Carxlab" className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
                        </Link>
                        <p className="text-white/40 max-w-sm text-lg font-light leading-loose">
                            Plus qu'un showroom, une expertise de précision. Bienvenue dans l'ère de l'automobile analytique.
                        </p>
                        <div className="flex gap-4 mt-2 justify-center md:justify-start">
                            {[Instagram, Facebook, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:bg-accent-gold/10 hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Icon size={22} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links - Services */}
                    <div className="md:col-span-6 lg:col-span-3 lg:col-start-7 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center md:justify-start gap-3 w-full">
                            <span className="hidden md:block w-4 h-[1px] bg-accent-gold"></span>
                            Services
                            <span className="hidden md:block w-4 h-[1px] bg-transparent"></span>
                        </h4>
                        <ul className="space-y-4 md:space-y-6">
                            {[
                                { name: 'Expertise Lab', path: '/expertise' },
                                { name: 'Achat Express', path: '/achat' },
                                { name: 'Vente Premium', path: '/vente' },
                                { name: 'Solutions Financement', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} onClick={handleScrollToTop} className="text-white/40 hover:text-white transition-colors text-[15px] font-light tracking-wide flex items-center justify-center md:justify-start gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/0 group-hover:bg-accent-gold transition-all duration-300"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links - Contact */}
                    <div className="md:col-span-6 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center md:justify-start gap-3 w-full">
                            <span className="hidden md:block w-4 h-[1px] bg-accent-gold"></span>
                            Contact
                            <span className="hidden md:block w-4 h-[1px] bg-transparent"></span>
                        </h4>
                        <ul className="space-y-4 md:space-y-6 w-full max-w-sm">
                            <li className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <MapPin size={20} className="text-accent-gold shrink-0 mt-0.5" />
                                <span className="text-white/50 text-[15px] leading-relaxed font-light">Paris, Avenue des<br />Champs-Élysées</span>
                            </li>
                            <li className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <Phone size={20} className="text-accent-gold shrink-0" />
                                <span className="text-white/50 text-[15px] font-light tracking-wider">+33 1 42 67 89 00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 md:pt-10 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-white/30 text-center lg:text-left leading-relaxed">
                        © {new Date().getFullYear()} CARXLAB. ALL RIGHTS RESERVED.<br className="lg:hidden" /> <span className="text-accent-gold">LAB PROTOCOL VERIFIED.</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        <Link to="/mentions-legales" onClick={handleScrollToTop} className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/30 hover:text-accent-gold transition-colors font-medium">Mentions Légales</Link>
                        <Link to="/mentions-legales" onClick={handleScrollToTop} className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/30 hover:text-accent-gold transition-colors font-medium">Confidentialité</Link>
                        <Link to="/mentions-legales" onClick={handleScrollToTop} className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/30 hover:text-accent-gold transition-colors font-medium">CGV</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
