import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TermsSubHeader from '../../components/Terms-Page/TermsSubHeader';
import TermsHero from '../../components/Terms-Page/TermsHero';
import TermsPillars from '../../components/Terms-Page/TermsPillars';
import TermsContent from '../../components/Terms-Page/TermsContent';
import TermsCTA from '../../components/Terms-Page/TermsCTA';

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-vault-cream flex flex-col selection:bg-vault-green selection:text-vault-dark"
    >
      <Navbar />

      <main className="flex-1 w-full">
        {/* Top Sticky Sub-Header / Segmented Switcher */}
        <TermsSubHeader />

        {/* Hero Section */}
        <TermsHero />

        {/* 4 Pillars Matrix */}
        <TermsPillars />

        {/* Main Content: Clean 2-Column Layout */}
        <TermsContent />

        {/* Bottom Callout Section */}
        <TermsCTA />
      </main>

      <Footer />
    </motion.div>
  );
}
