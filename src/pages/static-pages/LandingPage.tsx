import Navbar from '../../components/Navbar';
import Hero from '../../components/Landing-Page/Hero';
import Stats from '../../components/Landing-Page/Stats';
import Process from '../../components/Landing-Page/Process';
import Comparison from '../../components/Landing-Page/Comparison';
import FAQ from '../../components/Landing-Page/FAQ';
import Footer from '../../components/Footer';

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-vault-cream flex flex-col overflow-x-hidden selection:bg-vault-green selection:text-vault-dark">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {/* First Viewport Section: Hero + Stats */}
        <div className="w-full min-h-screen lg:min-h-0 lg:h-[calc(100vh-65px)] lg:max-h-[calc(100vh-65px)] flex flex-col justify-between">
          <Hero />
          <Stats />
        </div>

        {/* Second Section: Process (Yellow) */}
        <Process />

        {/* Third Section: Chaos vs. Order Comparison (Cream) */}
        <Comparison />

        {/* Fourth Section: FAQ (Yellow) */}
        <FAQ />

        {/* Fifth Section: World-Class Footer (Dark) */}
        <Footer />
      </main>
    </div>
  );
}
