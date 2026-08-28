import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export interface SigninProps {
  onBackToHome?: () => void;
  onSwitchToSignup?: () => void;
}

const fadeSlideVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function Signin({ onBackToHome, onSwitchToSignup }: SigninProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-vault-cream flex items-center justify-center p-4 sm:p-6 md:p-8 relative selection:bg-vault-green selection:text-vault-dark">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#002D0F 1px, transparent 1px), linear-gradient(90deg, #002D0F 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating Back to Home Button (Top-Left Screen Anchor) */}
      <button
        type="button"
        onClick={() => {
          if (onBackToHome) {
            onBackToHome();
          } else {
            navigate('/');
          }
        }}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vault-cream border-2 border-vault-dark text-vault-dark font-sans text-xs sm:text-sm font-semibold hover:bg-vault-yellow transition-all duration-200 shadow-xs cursor-pointer select-none group z-30"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </button>

      {/* Main 2-Grid Modal Window Container */}
      <motion.div
        layoutId="auth-card"
        className="w-full max-w-4xl bg-vault-cream border-2 border-vault-dark rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 relative z-10 my-auto mt-14 sm:mt-auto"
      >
        {/* Left Column (5 cols): Atmospheric Noise & Vault Art (Hidden on Mobile) */}
        <motion.div
          layoutId="auth-left-panel"
          layout
          className="hidden md:flex md:col-span-5 bg-vault-dark text-vault-cream p-8 sm:p-10 flex-col justify-between relative overflow-hidden border-r-2 border-vault-dark md:min-h-[580px]"
        >
          {/* Subtle noise texture SVG overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Ambient Glowing Gradient Orbs */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-vault-green/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-vault-yellow/15 blur-3xl pointer-events-none" />

          {/* Top Brand Block */}
          <div className="relative z-10 space-y-1">
            <span className="font-serif italic text-2xl sm:text-3xl text-vault-cream font-normal tracking-tight block">
              Prompt Vault
            </span>
          </div>

          {/* Center Graphic & Editorial Statement */}
          <div className="relative z-10 my-auto py-6 space-y-4">
            <motion.div
              layoutId="brand-badge"
              className="w-14 h-14 rounded-2xl bg-vault-cream text-vault-dark border-2 border-vault-dark flex items-center justify-center rotate-[-3deg] hover:rotate-0 transition-transform duration-300"
            >
              <ShieldCheck className="w-7 h-7 text-vault-dark stroke-[2]" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key="signin-headline"
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <h3 className="font-serif text-2xl sm:text-3xl text-vault-cream font-normal leading-tight tracking-tight uppercase">
                  <span className="block">SAVE WHAT</span>
                  <span className="block italic text-vault-yellow">INSPIRES YOU</span>
                </h3>

                <p className="font-sans text-xs sm:text-[13px] text-vault-cream/75 leading-relaxed max-w-xs">
                  Instant 1-click clipboard access to your master prompts, agent skill.md rules, and AI parameters.
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 pt-4 border-t border-vault-cream/15 flex items-center justify-between text-xs font-sans text-vault-cream/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vault-green animate-pulse" />
              <span>10,000+ Prompts Secured</span>
            </div>
            <span className="text-[11px] text-vault-cream/50">v2.1</span>
          </div>
        </motion.div>

        {/* Right Column (7 cols): Clean Signin Form */}
        <motion.div
          layout
          className="col-span-12 md:col-span-7 bg-vault-cream p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6"
        >
          {/* Header & Mobile Brand Indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key="signin-header"
              variants={fadeSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-2"
            >
              <span className="font-serif italic text-xl text-vault-dark font-normal tracking-tight block md:hidden">
                Prompt Vault
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-vault-dark/60 block">
                Welcome Back
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-vault-dark font-normal tracking-tight uppercase">
                SIGN IN TO YOUR VAULT
              </h2>
              <p className="font-sans text-xs sm:text-sm text-vault-dark/75">
                Enter your email and password to access your private repository.
              </p>
            </motion.div>
          </AnimatePresence>

          {submitted ? (
            /* Success confirmation state */
            <div className="py-8 flex flex-col items-center text-center space-y-4 bg-vault-yellow/40 border-2 border-vault-dark rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-vault-green text-vault-dark border-2 border-vault-dark flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-2xl text-vault-dark font-normal">
                Welcome back to Prompt Vault!
              </h3>
              <p className="font-sans text-xs sm:text-sm text-vault-dark/80 max-w-xs">
                Redirecting to your personal prompt repository...
              </p>
            </div>
          ) : (
            <>
              {/* Form Fields First */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl pl-10 pr-4 py-2.5 font-sans text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark"
                    >
                      Password
                    </label>
                    <a
                      href="#forgot-password"
                      className="font-sans text-[11px] font-semibold text-vault-dark/70 hover:text-vault-dark hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-dark/50" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl pl-10 pr-11 py-2.5 font-sans text-xs sm:text-sm placeholder:text-vault-dark/40 focus:outline-none focus:ring-2 focus:ring-vault-green"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-vault-dark/60 hover:text-vault-dark focus:outline-none cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Expanding Submit Button */}
                <motion.div layoutId="auth-submit" className="pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full inline-flex items-stretch cursor-pointer select-none active:scale-[0.98] transition-transform duration-200"
                  >
                    <span className="relative z-10 w-full inline-flex items-center justify-center bg-vault-green text-vault-dark border-2 border-vault-dark rounded-full py-3 font-sans font-bold text-xs sm:text-sm tracking-tight shadow-xs group-hover:brightness-[1.03] transition-all duration-300">
                      {isLoading ? 'Decrypting Vault...' : 'Sign In to Prompt Vault'}
                    </span>
                    <span className="relative -ml-6 sm:-ml-7 z-0 inline-flex items-center justify-center bg-vault-darker text-vault-green border-2 border-vault-dark rounded-r-full pl-7 pr-4 max-w-0 opacity-0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[68px] group-hover:opacity-100 group-hover:translate-x-0 overflow-hidden">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105" />
                    </span>
                  </button>
                </motion.div>
              </form>

              {/* Or Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full border-t border-vault-dark/20" />
                <span className="bg-vault-cream px-3 text-[11px] font-sans font-semibold uppercase tracking-wider text-vault-dark/50 shrink-0">
                  Or continue with
                </span>
                <div className="w-full border-t border-vault-dark/20" />
              </div>

              {/* Single Google Login Button */}
              <div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-2.5 sm:py-3 px-5 rounded-full bg-white border-2 border-vault-dark text-vault-dark font-sans text-xs sm:text-sm font-semibold hover:bg-vault-yellow/40 active:scale-[0.98] transition-all duration-200 shadow-2xs cursor-pointer select-none"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            </>
          )}

          {/* Bottom Switch to Sign Up */}
          <div className="text-center pt-2 border-t border-vault-dark/15">
            <AnimatePresence mode="wait">
              <motion.p
                key="signin-switch-text"
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="font-sans text-xs sm:text-[13px] text-vault-dark/80"
              >
                Don't have a vault yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    if (onSwitchToSignup) {
                      onSwitchToSignup();
                    } else {
                      navigate('/signup');
                    }
                  }}
                  className="font-bold text-vault-dark hover:underline underline-offset-4 cursor-pointer"
                >
                  Create one free ↗
                </button>
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
