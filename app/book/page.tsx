'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';
import { Calendar, Clock, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function BookPage() {
  useEffect(() => {
    // Initialize HubSpot meetings embed when script loads
    const initializeEmbed = () => {
      if (window.hbspt) {
        window.hbspt.meetings.create({
          portalId: '244506871',
          formInstanceId: 'jason-kuperman'
        });
      }
    };

    // Check if script is already loaded
    if (window.hbspt) {
      initializeEmbed();
    } else {
      // Wait for script to load
      window.addEventListener('hubspot-meetings-ready', initializeEmbed);
      return () => window.removeEventListener('hubspot-meetings-ready', initializeEmbed);
    }
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-accent-cyan hover:text-cyan-400 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 lg:px-8 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">Refactor Sprint</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Schedule a 30-minute discovery call to discuss your revenue engine.
            </p>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="w-6 h-6 text-accent-cyan" />
                </div>
                <h3 className="text-lg font-bold mb-2">30-Minute Call</h3>
                <p className="text-slate-400 text-sm">Quick discovery session to understand your needs</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-violet/10 flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-accent-violet" />
                </div>
                <h3 className="text-lg font-bold mb-2">No Pressure</h3>
                <p className="text-slate-400 text-sm">See if the Sprint is right for your business</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-bold mb-2">Instant Scheduling</h3>
                <p className="text-slate-400 text-sm">Pick a time that works for you</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meetings Embed Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            {/* HubSpot Meetings Embed */}
            <div 
              className="meetings-iframe-container" 
              data-src="https://meetings.hubspot.com/jason-kuperman?embed=true"
            ></div>
          </motion.div>

          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-400 mb-4">Prefer to send a message first?</p>
            <Link
              href="/contact"
              className="text-accent-cyan hover:text-cyan-400 text-lg font-semibold transition-colors"
            >
              Fill out our contact form →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicator */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400 mb-4">
              <span className="text-accent-cyan font-bold">25 Years</span> of Marketing Strategy Experience
            </p>
            <p className="text-slate-500 text-sm">
              Led by Jason Kuperman • Former Architect • Builder of Digital Infrastructure for Apple & OUTFRONT Media
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} The Refactor Sprint / Kuperman Advisors
          </p>
        </div>
      </footer>

      {/* HubSpot Meetings Embed Script */}
      <Script
        type="text/javascript"
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Trigger custom event when script loads
          window.dispatchEvent(new Event('hubspot-meetings-ready'));
        }}
      />

      {/* Custom Styling for Meetings Embed */}
      <style jsx global>{`
        /* HubSpot Meetings Embed Styling */
        .meetings-iframe-container {
          min-height: 600px;
          width: 100%;
        }

        .meetings-iframe-container iframe {
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        /* Override HubSpot styles for dark theme */
        .meetings-iframe-container {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
}

// TypeScript declaration for HubSpot meetings API
declare global {
  interface Window {
    hbspt: {
      meetings: {
        create: (options: { portalId: string; formInstanceId: string }) => void;
      };
    };
  }
}
