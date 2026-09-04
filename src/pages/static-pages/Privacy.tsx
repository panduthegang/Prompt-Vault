import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PrivacySubHeader from '../../components/Privacy-Page/PrivacySubHeader';
import PrivacyHero from '../../components/Privacy-Page/PrivacyHero';
import PrivacyGuarantees from '../../components/Privacy-Page/PrivacyGuarantees';
import PrivacyContent from '../../components/Privacy-Page/PrivacyContent';
import PrivacyCTA from '../../components/Privacy-Page/PrivacyCTA';

export default function Privacy() {
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
        <PrivacySubHeader />

        {/* Hero Section */}
        <PrivacyHero />

        {/* 4 Guarantees Matrix */}
        <PrivacyGuarantees />

        {/* Main Content: Clean 2-Column Layout */}
        <PrivacyContent />

        {/* Bottom Callout Section */}
        <PrivacyCTA />
      </main>

      <Footer />
    </motion.div>
  );
}
