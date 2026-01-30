'use client';

import { motion } from 'framer-motion';
import { Award, Zap, TrendingUp, DollarSign, RotateCw, ArrowRight, Sparkles, Globe, Wrench, Hammer, Mail, MousePointer } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Reusable Glass Card Component
const GlassCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="glass rounded-xl p-8 group hover:bg-slate-800/40 transition-all duration-300"
  >
    {children}
  </motion.div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-accent-cyan" />
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function KupermanAdvisorsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/logo2.png"
              alt="Kuperman Advisors"
              className="h-[60px] w-auto"
            />
          </Link>
          <a
            href="/contact"
            className="px-6 py-3 bg-accent-cyan hover:bg-cyan-500 text-slate-900 font-bold rounded-lg transition-all"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                Turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">Scattered Marketing</span><br />
                into a Predictable Revenue Engine
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                <strong>In a world of AI-generated sameness, strategic thinking is the only differentiator.</strong>
              </p>
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed">
                Access strategic marketing leadership on demand. Suited for $2m-$50m ARR companies that need executive marketing ownership without the full-time costs.
              </p>
              <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
                Get started fast with a 72-hour high-velocity diagnostic.
              </p>
              <a
                href="https://refactorsprint.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-cyan hover:bg-cyan-500 text-slate-900 text-lg font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20"
              >
                Explore the Refactor Sprint <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Right Column - Refactor Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <img
                src="/refaclogo.png"
                alt="Refactor Sprint"
                className="w-full max-w-[224px] lg:max-w-[256px] h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Who Needs the Help of a <span className="text-accent-cyan">Fractional CMO</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Is This You? */}
            <GlassCard>
              <h3 className="text-2xl font-bold mb-6 text-accent-cyan">Is This You?</h3>
              <div className="space-y-6">
                <FeatureCard
                  icon={Wrench}
                  title="The Engineer"
                  description="You're a technical founder who needs someone to translate genius features into a commercial story."
                />
                <FeatureCard
                  icon={Zap}
                  title="The Bottleneck"
                  description="You're a Founder or CEO and all Marketing programs still go through you."
                />
                <FeatureCard
                  icon={TrendingUp}
                  title="The Scaler"
                  description="You are preparing to move upmarket or seek your next round of funding."
                />
              </div>
            </GlassCard>

            {/* Are You Seeing? */}
            <GlassCard delay={0.2}>
              <h3 className="text-2xl font-bold mb-6 text-accent-violet">Are You Seeing?</h3>
              <div className="space-y-6">
                <FeatureCard
                  icon={DollarSign}
                  title="Pipeline"
                  description="Your pipeline coverage is less than 3x your quota"
                />
                <FeatureCard
                  icon={RotateCw}
                  title="Cost"
                  description="Your Customer Acquisition Cost payback exceeds 18 months"
                />
                <FeatureCard
                  icon={Sparkles}
                  title="Fragmented Vendors"
                  description="You have multiple vendors (SEO, paid, design), but no one owns a unified growth thesis, resulting in inconsistent growth and fragmented deliverables"
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-accent-cyan font-mono text-sm uppercase tracking-wider mb-4">Services</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Impactful Marketing Solutions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <GlassCard>
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-accent-cyan/10 flex items-center justify-center mb-4">
                  <Hammer className="w-8 h-8 text-accent-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Narrative Architecture</h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                For companies struggling to articulate their value. We align your Product, Sales, and Marketing teams around a single source of truth. I help you translate complex technical features into a compelling commercial story that shortens sales cycles.
              </p>
              <p className="text-sm text-accent-cyan font-mono">
                Focus: Positioning, Messaging Frameworks, Pitch Deck Refinement, Brand-Product Alignment.
              </p>
            </GlassCard>

            {/* Service 2 */}
            <GlassCard delay={0.1}>
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-accent-violet/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-accent-violet" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Revenue Engine Architecture</h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                For companies struggling to track impact. Growth requires a machine, not just magic. I audit and rebuild your Go-To-Market infrastructure—from your Ad Tech stack to your CRM—ensuring your demand generation is precise, programmatic, and attributable.
              </p>
              <p className="text-sm text-accent-violet font-mono mb-6">
                Focus: Tech Stack Audit, ABM Strategy, Attribution Models, KPI Dashboards.
              </p>

              {/* Refactor Sprint Option */}
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <a 
                  href="https://refactorsprint.com"
                  className="flex items-center gap-3 group hover:bg-slate-800/30 p-3 rounded-lg transition-all"
                >
                  <img
                    src="/refaclogo.png"
                    alt="Refactor Sprint"
                    className="h-8 w-auto flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      Available as a 72-hour high-velocity diagnostic.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </GlassCard>

            {/* Service 3 */}
            <GlassCard delay={0.2}>
              <div className="mb-6">
                <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Fractional CMO & Advisory</h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-4">
                For leadership teams navigating change. Whether you are preparing for a Series B raise or navigating a digital transformation, I provide the senior leadership needed to steer the ship, manage the P&L, and execute strategy while you search for a full-time executive.
              </p>
              <p className="text-sm text-cyan-500 font-mono">
                Focus: Interim Leadership, Team Management, Board Advisory, Vendor Rationalization.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent-cyan font-mono text-sm uppercase tracking-wider">About</p>
          </motion.div>
          
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-accent-cyan/20">
                  <Image
                    src="/jason-kuperman.jpg"
                    alt="Jason Kuperman - Marketing Strategy Expert"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Jason Kuperman</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                    icon={Hammer}
                    title="The Architect"
                    description="Started at Frank Gehry's office, mastering complex systems."
                  />
                  <FeatureCard
                    icon={Sparkles}
                    title="Built on Experience"
                    description="Jason has spent 25+ years navigating the intersection of digital disruption and creative storytelling."
                  />
                  <FeatureCard
                    icon={MousePointer}
                    title="The Digital Pioneer"
                    description="Built TBWA's first digital division, leading the team behind Apple's first digital campaigns."
                  />
                  <FeatureCard
                    icon={Globe}
                    title="The Global Operator"
                    description="Scaled digital operations across 16 markets in Asia-Pacific for Omnicom Group."
                  />
                  <FeatureCard
                    icon={Zap}
                    title="The Transformer"
                    description="Led the GTM strategy for OUTFRONT Media's $3.2B digital transformation."
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight px-2">
              Ready to <span className="text-accent-cyan">Elevate</span> Your Business?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto px-2">
              Strategic marketing leadership on demand. Let's build your revenue engine.
            </p>
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-accent-cyan hover:bg-cyan-500 text-slate-900 text-lg font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20"
            >
              Get in Touch
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
    </div>
  );
}
