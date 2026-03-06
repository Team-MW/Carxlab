import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate system calibration loading
        const timer = setTimeout(() => setIsLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-accent-gold/30 selection:text-accent-gold">
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="preloader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
                    >
                        <div className="text-center relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "200px" }}
                                transition={{ duration: 1.2, ease: "circIn" }}
                                className="h-[1px] bg-accent-gold mb-8 mx-auto shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-white tracking-[1.2em] font-black text-2xl uppercase relative z-10"
                            >
                                CAR<span className="text-accent-gold">X</span>LAB
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-6 text-[10px] text-accent-gold/50 tracking-[0.6em] uppercase font-bold"
                            >
                                Calibration du système v4.0.2
                            </motion.div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-accent-gold/5 rounded-full animate-ping opacity-20" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="scan-overlay" />
                        <Navbar />
                        <main className="relative z-10">{children}</main>
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MainLayout;
