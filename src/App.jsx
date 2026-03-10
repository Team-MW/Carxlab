import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';

// Lazy Load Pages for Performance
const Home = lazy(() => import('./pages/Home'));
const Expertise = lazy(() => import('./pages/Expertise'));
const Achat = lazy(() => import('./pages/Achat'));
const Vente = lazy(() => import('./pages/Vente'));
const Contact = lazy(() => import('./pages/Contact'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const Stock = lazy(() => import('./pages/Stock'));
const Admin = lazy(() => import('./pages/Admin'));

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
  }, [pathname]);
  return null;
};

// Fallback component
const PageLoader = () => (
  <div className="h-screen bg-black flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/achat" element={<Achat />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </Router>
  );
};

export default App;
