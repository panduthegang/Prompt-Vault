import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LegalSubHeader from '../../components/Legal/LegalSubHeader';
import LegalHero from '../../components/Legal/LegalHero';
import LegalPillars from '../../components/Legal/LegalPillars';
import LegalContent from '../../components/Legal/LegalContent';
import LegalCTA from '../../components/Legal/LegalCTA';
import { TERMS_CLAUSES, TERMS_METRICS } from '../../components/Legal/termsData';

const TERMS_META_ITEMS = [
  { label: 'Platform', value: 'Prompt Vault' },
  { label: 'Target Audience', value: 'Creators & Builders' },
  { label: 'Ownership', value: '100% User Retained' },
  { label: 'Builder', value: 'Harsh Rathod' },
];

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
        <LegalSubHeader
          activePage="terms"
          parentLabel="Legal & Terms"
          currentLabel="Terms & Conditions"
        />

        {/* Hero Section */}
        <LegalHero
          badgeIcon={FileText}
          badgeText="SIMPLE & FAIR TERMS"
          titleLine1="CLEAR RULES FOR BUILDERS."
          titleLine2="NO COMPLICATED TRAPS."
          description="Prompt Vault is a space built to bookmark your favorite AI prompts, websites, and underrated tools. Our terms are short, transparent, and focused on respecting what you curate."
          summaryTitle="Agreement Overview"
          summaryBadgeText="CLEAR & CONCISE"
          metaItems={TERMS_META_ITEMS}
        />

        {/* 4 Pillars Matrix */}
        <LegalPillars pillars={TERMS_METRICS} />

        {/* Main Content: Clean 2-Column Layout */}
        <LegalContent
          clauses={TERMS_CLAUSES}
          creatorSubtext="Building in public for creators and developers. Have ideas or feature requests?"
        />

        {/* Bottom Callout Section */}
        <LegalCTA
          tagline="Prompt Vault Community"
          titleLead="CRAFTED FOR BUILDERS WHO"
          titleItalic="CREATE DAILY."
          description="Join creators organizing their favorite AI prompts and bookmarking underrated web tools in one unified vault."
          primaryBtnText="Open Prompt Vault"
          secondaryBtnText="Read Privacy Policy"
          secondaryBtnTo="/privacy"
        />
      </main>

      <Footer />
    </motion.div>
  );
}
