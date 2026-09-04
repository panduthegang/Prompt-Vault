import { Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';

export default function TermsSubHeader() {
  return (
    <div className="w-full bg-vault-yellow/40 border-b-2 border-vault-dark py-3 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-sans font-semibold">
        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-vault-dark/70">
          <Link to="/" className="hover:text-vault-dark transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-vault-dark">Legal &amp; Terms</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-vault-dark bg-vault-yellow px-2 py-0.5 rounded-md border border-vault-dark font-bold">
            Terms &amp; Conditions
          </span>
        </div>

        {/* Document Switcher Tabs */}
        <div className="inline-flex items-center p-1 bg-vault-cream border-2 border-vault-dark rounded-full shadow-xs">
          <Link
            to="/privacy"
            className="px-3.5 sm:px-4 py-1 rounded-full text-vault-dark hover:bg-vault-yellow/70 text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <span>Privacy Policy</span>
          </Link>
          <Link
            to="/terms"
            className="px-3.5 sm:px-4 py-1 rounded-full bg-vault-dark text-vault-cream text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-vault-green" />
            <span>Terms &amp; Conditions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
