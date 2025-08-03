import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '../../contexts/ThemeContext';
import Header from '../../components/ui/Header';
import NetworkStatusBanner from '../../components/ui/NetworkStatusBanner';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import NetworkStatus from './components/NetworkStatus';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import TrustSignals from './components/TrustSignals';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const HeroLandingPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <Helmet>
        <title>StellarCard - Decentralized Blockchain Card Platform | Stellar Network</title>
        <meta 
          name="description" 
          content="Experience the future of decentralized finance with StellarCard. Secure, transparent blockchain-based card services built on Stellar network with Soroban smart contracts." 
        />
        <meta name="keywords" content="stellar, blockchain, defi, smart contracts, soroban, decentralized finance, crypto cards" />
        <meta property="og:title" content="StellarCard - Decentralized Blockchain Card Platform" />
        <meta property="og:description" content="Secure, transparent blockchain-based card services built on Stellar network" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/hero-landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Global Header */}
        <Header />
        
        {/* Network Status Banner */}
        <NetworkStatusBanner />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Features Grid */}
          <FeaturesGrid />

          {/* Network Status */}
          <NetworkStatus />

          {/* Testimonials Carousel */}
          <TestimonialsCarousel />

          {/* Trust Signals */}
          <TrustSignals />

          {/* Call to Action */}
          <CallToAction />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default HeroLandingPage;