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
            <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 h-[var(--header-height)] flex items-center bg-black shadow-2xl border-b border-white/5" >
                <div className="main-container w-full flex justify-between items-center">
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
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-3xl flex flex-col justify-center px-10"
                    >
                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-accent-gold transition-all p-4"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 mb-10">
                                <span className="h-[2px] w-12 bg-accent-gold"></span>
                                <span className="text-accent-gold tracking-[0.4em] font-black text-xs uppercase">Navigation</span>
                            </div>

                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={handleNavClick}
                                        className={`text-4xl font-black tracking-tighter uppercase transition-all ${location.pathname === link.path ? 'text-accent-gold' : 'text-white/60'}`}
                                    >
                                        {link.name}
                                        {location.pathname === link.path && (
                                            <span className="text-accent-gold ml-4">.</span>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-12 pt-12 border-t border-white/5"
                            >
                                <Link to="/stock" className="gold-button w-full py-6" onClick={handleNavClick}>
                                    VOIR LE STOCK RÉEL
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-12 space-y-2"
                            >
                                <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Contact Direct</p>
                                <p className="text-white/60 font-bold">
                                    <a href="tel:0659330312" className="hover:text-accent-gold transition-colors">06 59 33 03 12</a>
                                </p>
                            </motion.div>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
