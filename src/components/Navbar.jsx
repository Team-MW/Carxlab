import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/333carxlab.png';

const Navbar = () => {
    const MotionDiv = motion.div;
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Expertise', path: '/expertise' },
        { name: 'Achat', path: '/achat' },
        { name: 'Stock', path: '/stock' },
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on navigation and force scroll to top
    const handleNavClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-8'}`} >
                <div className="main-container flex justify-between items-center">
                    <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src={logo} alt="Carxlab" className="h-7 md:h-10 object-contain" />
                    </Link>

                    {/* Desktop Nav - Centered in their own space */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={handleNavClick}
                                className={`text-[10px] font-black tracking-[0.3em] uppercase transition-all relative group ${location.pathname === link.path ? 'text-accent-gold' : 'text-white/60 hover:text-white'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
                            </Link>
                        ))}
                        <Link to="/stock" onClick={handleNavClick} className="gold-button !py-3 !px-8 !text-[9px]">STOCK RÉEL</Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-white p-2 hover:text-accent-gold transition-colors" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <MotionDiv
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center gap-10"
                    >
                        <button className="absolute top-8 right-8 text-white p-4" onClick={() => setMobileMenuOpen(false)}>
                            <X size={32} />
                        </button>
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={handleNavClick}
                                    className={`text-2xl font-black tracking-widest uppercase transition-all ${location.pathname === link.path ? 'text-accent-gold' : 'text-white'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/stock" className="gold-button mt-4" onClick={handleNavClick}>Stock disponible</Link>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
