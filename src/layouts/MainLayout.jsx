import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div className="min-h-screen bg-[var(--bg-color)] text-white selection:bg-accent-gold/30 selection:text-accent-gold">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col min-h-screen relative"
            >
                <div className="scan-overlay" />
                {!isAdmin && <Navbar />}
                <main className={`flex-grow relative z-10 w-full overflow-x-hidden ${isAdmin ? 'pt-0' : 'pt-24 md:pt-32'}`}>
                    {children}
                </main>
                {!isAdmin && <Footer />}
            </motion.div>
        </div>
    );
};

export default MainLayout;
