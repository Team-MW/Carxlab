import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout & Pages
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Achat from './pages/Achat';
import Vente from './pages/Vente';
import Contact from './pages/Contact';

// Scroll to top component for route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/achat" element={<Achat />} />
            <Route path="/vente" element={<Vente />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </MainLayout>
    </Router>
  );
};

export default App;
