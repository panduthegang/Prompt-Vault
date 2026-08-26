import React from 'react';
import Hero from '../components/Landing-Page/Hero';
import Stats from '../components/Landing-Page/Stats';
import Process from '../components/Landing-Page/Process';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col">
      {/* First Viewport Section: Hero + Stats */}
      <div className="w-full min-h-screen lg:min-h-0 lg:h-[calc(100vh-65px)] lg:max-h-[calc(100vh-65px)] flex flex-col justify-between">
        <Hero />
        <Stats />
      </div>

      {/* Second Section: Process */}
      <Process />

      {/* Third Section: World-Class Footer */}
      <Footer />
    </div>
  );
}



