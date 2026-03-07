import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-accent-gold/30 selection:text-accent-gold">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col min-h-screen relative"
            >
                <div className="scan-overlay" />
                <Navbar />
                <main className="flex-grow relative z-10 w-full overflow-x-hidden">
                    {children}
                </main>
                <Footer />
            </motion.div>
        </div>
    );
};

export default MainLayout;
