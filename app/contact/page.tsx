'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import Script from 'next/script';
import '@/lib/types/hubspot';

export default function ContactPage() {
  useEffect(() => {
    // Initialize HubSpot form after script loads
    if (window.hbspt) {
      window.hbspt.forms.create({
        region: "na2",
        portalId: "244506871",
        formId: "3976e6ce-1379-48ca-9b7d-6ba3b45c269e",
        target: "#hubspot-form-container"
      });
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
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">Start the Conversation</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed">
              Ready to accelerate your marketing strategy?
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            {/* HubSpot Form Container */}
            <div id="hubspot-form-container" className="hubspot-form-wrapper"></div>
          </motion.div>

          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-400 mb-4">Prefer email?</p>
            <a
              href="mailto:jason@kupermanadvisors.com"
              className="text-accent-cyan hover:text-cyan-400 text-lg font-semibold transition-colors"
            >
              jason@kupermanadvisors.com
            </a>
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

      {/* HubSpot Forms Script */}
      <Script
        src="https://js-na2.hsforms.net/forms/embed/v2.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.hbspt) {
            window.hbspt.forms.create({
              region: "na2",
              portalId: "244506871",
              formId: "3976e6ce-1379-48ca-9b7d-6ba3b45c269e",
              target: "#hubspot-form-container"
            });
          }
        }}
      />

      {/* Custom Form Styles */}
      <style jsx global>{`
        /* HubSpot Form Dark Theme Styling */
        .hubspot-form-wrapper .hs-form {
          font-family: var(--font-inter), sans-serif;
        }

        .hubspot-form-wrapper .hs-form label {
          color: #f8fafc !important;
          font-weight: 500;
          margin-bottom: 8px;
          display: block;
        }

        .hubspot-form-wrapper .hs-form input[type="text"],
        .hubspot-form-wrapper .hs-form input[type="email"],
        .hubspot-form-wrapper .hs-form input[type="tel"],
        .hubspot-form-wrapper .hs-form textarea,
        .hubspot-form-wrapper .hs-form select {
          background-color: rgba(15, 23, 42, 0.6) !important;
          border: 1px solid rgba(148, 163, 184, 0.2) !important;
          border-radius: 8px !important;
          color: #f8fafc !important;
          padding: 12px 16px !important;
          font-size: 16px !important;
          width: 100% !important;
          transition: all 0.2s ease !important;
        }

        .hubspot-form-wrapper .hs-form input[type="text"]:focus,
        .hubspot-form-wrapper .hs-form input[type="email"]:focus,
        .hubspot-form-wrapper .hs-form input[type="tel"]:focus,
        .hubspot-form-wrapper .hs-form textarea:focus,
        .hubspot-form-wrapper .hs-form select:focus {
          outline: none !important;
          border-color: #06b6d4 !important;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1) !important;
        }

        .hubspot-form-wrapper .hs-form input::placeholder,
        .hubspot-form-wrapper .hs-form textarea::placeholder {
          color: #94a3b8 !important;
        }

        .hubspot-form-wrapper .hs-form .hs-field-desc {
          color: #94a3b8 !important;
          font-size: 14px !important;
          margin-top: 4px !important;
        }

        .hubspot-form-wrapper .hs-form .hs-error-msgs {
          color: #ef4444 !important;
          font-size: 14px !important;
          margin-top: 4px !important;
        }

        .hubspot-form-wrapper .hs-form .hs-button {
          background-color: #06b6d4 !important;
          color: #0f172a !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 16px 32px !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
          width: 100% !important;
          margin-top: 16px !important;
        }

        .hubspot-form-wrapper .hs-form .hs-button:hover {
          background-color: #22d3ee !important;
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.2) !important;
        }

        .hubspot-form-wrapper .hs-form .hs-form-field {
          margin-bottom: 24px !important;
        }

        .hubspot-form-wrapper .hs-form .legal-consent-container {
          margin-top: 24px !important;
        }

        .hubspot-form-wrapper .hs-form .legal-consent-container p {
          color: #cbd5e1 !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }

        .hubspot-form-wrapper .hs-form .legal-consent-container a {
          color: #06b6d4 !important;
          text-decoration: none !important;
        }

        .hubspot-form-wrapper .hs-form .legal-consent-container a:hover {
          text-decoration: underline !important;
        }

        .hubspot-form-wrapper .hs-form .hs-richtext {
          color: #cbd5e1 !important;
        }

        /* Submit message styling */
        .hubspot-form-wrapper .submitted-message {
          background-color: rgba(6, 182, 212, 0.1) !important;
          border: 1px solid #06b6d4 !important;
          border-radius: 8px !important;
          padding: 24px !important;
          color: #f8fafc !important;
          text-align: center !important;
          font-size: 18px !important;
        }

        /* Loading state */
        .hubspot-form-wrapper .hs-form.loading {
          opacity: 0.6;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
