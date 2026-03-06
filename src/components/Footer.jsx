import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/333carxlab.png';

const Footer = () => {
    return (
        <footer className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden">
            {/* Background glow overlay */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-accent-gold/5 blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="inline-block mb-10 transition-opacity hover:opacity-80">
                        <img src={logo} alt="Carxlab" className="h-10 object-contain grayscale hover:grayscale-0 transition-all opacity-70" />
                    </Link>
                    <p className="text-white/40 max-w-sm mb-12 text-lg font-light leading-relaxed">
                        Plus qu'un showroom, une expertise de précision. Bienvenue dans l'ère de l'automobile analytique.
                    </p>
                    <div className="flex gap-6">
                        {[Instagram, Facebook, Mail].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-accent-gold hover:border-accent-gold transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10 px-[1px]">Services</h4>
                    <ul className="space-y-6">
                        {['Expertise Lab', 'Achat Express', 'Vente Premium', 'Solutions Financement'].map((item) => (
                            <li key={item}>
                                <a href="#" className="text-white/40 hover:text-white transition-colors text-sm font-medium tracking-widest">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10 px-[1px]">Contact</h4>
                    <ul className="space-y-8">
                        <li className="flex gap-4">
                            <MapPin size={18} className="text-accent-gold shrink-0 mt-1" />
                            <span className="text-white/40 text-sm leading-relaxed">Paris, Avenue des Champs-Élysées</span>
                        </li>
                        <li className="flex gap-4">
                            <Phone size={18} className="text-accent-gold shrink-0 mt-1" />
                            <span className="text-white/40 text-sm leading-relaxed">+33 1 42 67 89 00</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">
                    © 2024 CARXLAB. ALL RIGHTS RESERVED. LAB PROTOCOL VERIFIED.
                </p>
                <div className="flex gap-8">
                    {['Privacy', 'Terms', 'Legal'].map((item) => (
                        <a key={item} href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-accent-gold transition-all font-bold">{item}</a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
