import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/333carxlab.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Expertise', path: '/expertise' },
        { name: 'Achat', path: '/achat' },
        { name: 'Vente', path: '/vente' },
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on navigation
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-3xl border-b border-white/5 py-3' : 'bg-transparent py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src={logo} alt="Carxlab" className="h-8 md:h-10 object-contain" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-xs font-bold tracking-[0.2em] uppercase transition-all hover:text-accent-gold ${location.pathname === link.path ? 'text-accent-gold' : 'text-white/60'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="gold-button scale-90">Stock live</button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-10"
                    >
                        <button className="absolute top-8 right-8 text-white p-4" onClick={() => setMobileMenuOpen(false)}>
                            <X size={32} />
                        </button>
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-2xl font-black tracking-widest uppercase transition-all ${location.pathname === link.path ? 'text-accent-gold' : 'text-white'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button className="gold-button mt-4">Stock disponible</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
