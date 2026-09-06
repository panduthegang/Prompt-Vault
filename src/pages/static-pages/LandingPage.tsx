import Navbar from '../../components/Navbar';
import Hero from '../../components/Landing-Page/Hero';
import Stats from '../../components/Landing-Page/Stats';
import Process from '../../components/Landing-Page/Process';
import Comparison from '../../components/Landing-Page/Comparison';
import FAQ from '../../components/Landing-Page/FAQ';
import Footer from '../../components/Footer';
import styles from '../../components/Landing-Page/Landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Navbar />
      <main className={styles.landingMain}>
        {/* First Viewport Section: Hero + Stats */}
        <div className={styles.firstViewportWrap}>
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
