import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LegalSubHeader from '../../components/Legal/LegalSubHeader';
import LegalHero from '../../components/Legal/LegalHero';
import LegalPillars from '../../components/Legal/LegalPillars';
import LegalContent from '../../components/Legal/LegalContent';
import LegalCTA from '../../components/Legal/LegalCTA';
import { PRIVACY_CLAUSES, GUARANTEE_CARDS } from '../../components/Legal/privacyData';

const PRIVACY_META_ITEMS = [
  { label: 'Project', value: 'Prompt Vault' },
  { label: 'Created By', value: 'Harsh Rathod' },
  { label: 'Database', value: 'Supabase (Upcoming)' },
  { label: 'Data Policy', value: '100% User Owned' },
];

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
        <LegalSubHeader
          activePage="privacy"
          parentLabel="Legal & Privacy"
          currentLabel="Privacy Policy"
        />

        {/* Hero Section */}
        <LegalHero
          badgeIcon={ShieldCheck}
          badgeText="HONEST & SHORT PRIVACY"
          titleLine1="SAVE WHAT INSPIRES YOU."
          titleLine2="NO TRACKING. NO NONSENSE."
          description="Prompt Vault was built by a creator for creators — to easily save, organize, and find the prompts and underrated tools we discover daily. Here is our simple privacy policy with zero legalese."
          summaryTitle="Quick Summary"
          summaryBadgeText="SIMPLE & CLEAR"
          metaItems={PRIVACY_META_ITEMS}
        />

        {/* 4 Guarantees Matrix */}
        <LegalPillars pillars={GUARANTEE_CARDS} />

        {/* Main Content: Clean 2-Column Layout */}
        <LegalContent
          clauses={PRIVACY_CLAUSES}
          creatorSubtext="Have questions, suggestions, or want to say hi? Connect directly with the creator."
        />

        {/* Bottom Callout Section */}
        <LegalCTA
          tagline="Prompt Vault Philosophy"
          titleLead="BUILT FOR CREATORS WHO REFUSE TO"
          titleItalic="LOSE INSPIRATION."
          description="Never dig through lost chat logs or messy notepad files again. Save your favorite prompts and tools in one clean, beautiful home."
          primaryBtnText="Start Saving Prompts"
          secondaryBtnText="Read Terms & Conditions"
          secondaryBtnTo="/terms"
        />
      </main>

      <Footer />
    </motion.div>
  );
}
