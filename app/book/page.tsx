'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, Zap } from 'lucide-react';

export default function BookPage() {
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
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/refaclogo.png"
                alt="The Refactor Sprint"
                className="h-16 md:h-20 w-auto"
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">Refactor Sprint</span> <span className="text-white">Consultation</span>
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
            <iframe
              src="https://app-na2.hubspot.com/meetings/jason-kuperman?embed=true"
              className="meetings-iframe"
              title="Schedule a meeting with Jason Kuperman"
            />
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

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Kuperman Advisors. Strategic Marketing Leadership.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="https://refactorsprint.com" className="text-accent-cyan hover:text-cyan-400 transition-colors">
              Refactor Sprint
            </a>
            <a href="https://kupermanadvisors.com" className="text-slate-400 hover:text-white transition-colors">
              Main Site
            </a>
          </div>
        </div>
      </footer>

      {/* Custom Styling for Meetings Embed */}
      <style jsx global>{`
        /* HubSpot Meetings Embed Styling */
        .meetings-iframe {
          min-height: 700px;
          height: 100%;
          width: 100%;
          border: none;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
