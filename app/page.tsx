"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Radio, Activity, Heart, CheckCircle, XCircle, Zap, Clock, Target, Hammer, Sparkles, Globe } from "lucide-react";
import NeuralBraidBackground from "@/components/neural-braid-background";
import { useState } from "react";

// Forensic Scan Card Component with shine effect
function ForensicScanCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass rounded-xl p-10 relative overflow-hidden"
    >
      {/* Shine effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%", skewX: -20 }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Rolling Number Component
function RollingNumber({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100
      }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img
              src="/refaclogo.png"
              alt="The Refactor Sprint"
              className="h-[60px] w-auto"
            />
          </a>
          <a
            href="/book"
            className="px-6 py-2.5 bg-accent-cyan hover:bg-cyan-500 text-slate-900 rounded font-semibold transition-all"
          >
            Start the Sprint
          </a>
        </div>
      </nav>

      {/* Hero Section - The Value Proposition */}
      <section className="relative pt-24 md:pt-32 pb-32 md:pb-40 px-4 md:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center justify-center">
        {/* Neural Braid Background Animation */}
        <NeuralBraidBackground />

        {/* Content with backdrop blur for readability */}
        <div className="w-full max-w-6xl mx-auto text-center relative z-10 backdrop-blur-sm bg-slate-900/30 rounded-2xl p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 px-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-slate-400">
                25 Years of Marketing Strategy.
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
                Compressed into 72 Hours.
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-300 mb-8 md:mb-12 leading-relaxed max-w-4xl mx-auto px-2">
              We leverage a proprietary AI stack to ingest your data, debug your revenue engine, 
              and deliver a 90-day roadmap—faster than a traditional agency can schedule a kickoff.
            </p>
            <a
              href="/book"
              className="inline-block px-8 md:px-10 py-4 md:py-5 bg-accent-cyan hover:bg-cyan-500 text-slate-900 text-base md:text-lg font-bold transition-all rounded-lg shadow-lg shadow-cyan-500/20"
            >
              Start the Sprint
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Why - The Efficiency */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-950 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The End of the{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="text-slate-300">8-Week Discovery Phase</span>
                {/* Red Pen Strikethrough */}
                <motion.svg
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ height: '20px' }}
                >
                  <motion.line
                    x1="0"
                    y1="10"
                    x2="100"
                    y2="10"
                    stroke="#dc2626"
                    strokeWidth="8"
                    strokeLinecap="round"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: { 
                        pathLength: 1, 
                        opacity: 0.9,
                        transition: { 
                          duration: 1.2, 
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: 0.5
                        }
                      }
                    }}
                  />
                </motion.svg>
              </span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 px-2">
              You don't have months to wait for a strategy deck. By combining senior executive 
              leadership with computational market intelligence, we strip away the "consulting fluff" 
              and get straight to the math of your market position.
            </p>
            <div className="inline-block glass rounded-lg px-6 md:px-8 py-3 md:py-4">
              <div className="text-2xl md:text-4xl font-bold text-accent-cyan mb-2">
                Same rigour.{" "}
                <RollingNumber value={1} />/<RollingNumber value={10} />th of the time.
              </div>
            </div>
          </motion.div>

          {/* Comparison bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 mt-16"
          >
            <div className="glass rounded-xl p-8">
              <div className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-wider">Traditional Consulting</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Discovery Phase</span>
                    <span className="font-mono">8 weeks</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Meetings & Alignment</span>
                    <span className="font-mono">3 weeks</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-slate-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: "60%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-8 border border-accent-cyan/30">
              <div className="text-sm font-mono text-accent-cyan mb-4 uppercase tracking-wider">The Refactor Sprint</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Full Analysis</span>
                    <span className="font-mono">72 hours</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent-cyan"
                      initial={{ width: 0 }}
                      whileInView={{ width: "10%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Action Plan Delivered</span>
                    <span className="font-mono">Day 3</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent-violet"
                      initial={{ width: 0 }}
                      whileInView={{ width: "10%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Methodology - Human + Machine */}
      <section className="py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
                Augmented Strategy
              </span>
            </h2>
            <p className="text-xl text-slate-400">Human + Machine working in concert.</p>
          </motion.div>

          {/* Flowchart with Forensic Scan Effect */}
          <div className="grid md:grid-cols-2 gap-8">
            <ForensicScanCard delay={0}>
              <div className="flex items-center gap-4 mb-6">
                <Zap className="w-10 h-10 text-accent-cyan" />
                <div>
                  <div className="text-sm font-mono text-accent-cyan uppercase tracking-wider">Speed</div>
                  <div className="text-2xl font-bold">The AI Stack</div>
                </div>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Ingests competitor ads, audits CRM data, and extracts stakeholder sentiment instantly.
              </p>
              <div className="space-y-2">
                {["Market Intelligence", "CRM Forensics", "Sentiment Analysis"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-cyan" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </ForensicScanCard>

            <ForensicScanCard delay={0.2}>
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-10 h-10 text-accent-violet" />
                <div>
                  <div className="text-sm font-mono text-accent-violet uppercase tracking-wider">Wisdom</div>
                  <div className="text-2xl font-bold">The Senior Lead</div>
                </div>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Identifies the strategic disconnects, defines the narrative, and prioritizes the fix.
              </p>
              <div className="space-y-2">
                {["Pattern Recognition", "Strategic Framing", "Priority Roadmap"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-violet" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </ForensicScanCard>
          </div>
        </div>
      </section>

      {/* The Process - Signal Flow Timeline */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-950 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The <span className="text-accent-cyan">Refactor Sprint</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Signal Flow Line */}
            <div className="absolute left-4 md:left-8 lg:left-24 top-0 bottom-0 w-1 bg-slate-800">
              <motion.div
                className="w-full bg-gradient-to-b from-accent-cyan via-accent-violet to-white"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>

            <div className="space-y-6 md:space-y-8">
              {[
                {
                  day: "01",
                  title: "Ingestion",
                  description: "We download the truth. Diagnostic tools connect to your CRM and Ad accounts to map the 'As-Is' reality.",
                },
                {
                  day: "02",
                  title: "Refactoring",
                  description: "We debug the system. We identify where the 'Sales Data' conflicts with the 'Marketing Story' and find the spend leaks.",
                },
                {
                  day: "03",
                  title: "The Patch",
                  description: "We hand you the Remediation Roadmap. A prioritized, fixed-fee plan to stabilize your revenue engine.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ 
                    delay: index * 0.3 + 0.5,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="grid md:grid-cols-12 gap-4 md:gap-6 items-start relative"
                >
                  {/* Connection node */}
                  <div className="absolute left-4 md:left-8 lg:left-24 top-6 md:top-8 w-4 h-4 -ml-1.5 bg-accent-cyan rounded-full shadow-lg shadow-cyan-500/50 z-10" />
                  
                  <div className="hidden md:block md:col-span-2">
                    <div className="text-5xl lg:text-7xl font-bold font-mono text-accent-cyan opacity-20">
                      {item.day}
                    </div>
                  </div>
                  
                  <div className="md:col-span-10 glass rounded-xl p-6 md:p-8 ml-10 md:ml-0">
                    <div className="flex items-center gap-4 mb-3 md:hidden">
                      <div className="text-3xl font-bold font-mono text-accent-cyan opacity-30">
                        {item.day}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 hidden md:block">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-base md:text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Output - Deliverables */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-block mb-4 px-4 py-2 glass rounded-full">
              <Clock className="w-4 h-4 inline-block mr-2 text-accent-cyan" />
              <span className="text-sm font-mono text-slate-400 uppercase tracking-wider">
                <RollingNumber value={72} /> Hours Later
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 px-2">
              What You Get on <span className="text-accent-cyan">Thursday Morning</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                number: "01",
                title: "The Executive Scorecard",
                description: "Red/Yellow/Green health check of your GTM engine.",
              },
              {
                number: "02",
                title: "The Forensic Evidence",
                description: "Data-backed proof of wasted spend.",
              },
              {
                number: "03",
                title: "The Remediation Roadmap",
                description: "Your 90-day execution plan.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-8 hover:bg-slate-800/60 transition-all"
              >
                <div className="text-5xl font-bold font-mono text-accent-cyan opacity-30 mb-6">
                  {item.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="book" className="py-20 md:py-32 px-4 md:px-6 lg:px-8 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight px-2">
              Ready to Accelerate<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
                Your Strategy?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              72 hours. Fixed fee. Actionable roadmap.
            </p>
            <a
              href="/book"
              className="inline-block px-8 md:px-12 py-4 md:py-6 bg-accent-cyan hover:bg-cyan-500 text-slate-900 text-lg md:text-xl font-bold transition-all rounded-lg shadow-lg shadow-cyan-500/20"
            >
              Start Your Sprint — $<RollingNumber value={7} />,<RollingNumber value={500} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center mb-12">
            {/* Photo - Left Column */}
            <div className="md:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-accent-cyan/20">
                  <img
                    src="/jason-kuperman.jpg"
                    alt="Jason Kuperman - Marketing Strategy Expert"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Bio Content - Right Column */}
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Jason Kuperman</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Feature Card 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <Hammer className="w-6 h-6 text-accent-cyan" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">The Architect</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Started at Frank Gehry's office, mastering complex systems.</p>
                    </div>
                  </div>

                  {/* Feature Card 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-accent-cyan" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Built on Experience</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Jason has spent 25+ years navigating the intersection of digital disruption and creative storytelling.</p>
                    </div>
                  </div>

                  {/* Feature Card 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-accent-cyan" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">The Digital Pioneer</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Built TBWA's first digital division, leading the team behind Apple's first digital campaigns.</p>
                    </div>
                  </div>

                  {/* Feature Card 4 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-accent-cyan" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">The Global Operator</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Scaled digital operations across 16 markets in Asia-Pacific for Omnicom Group.</p>
                    </div>
                  </div>

                  {/* Feature Card 5 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-accent-cyan" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">The Transformer</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">Led the GTM strategy for OUTFRONT Media's $3.2B digital transformation.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800">
            <div className="text-slate-500 text-sm">
              © 2026 Kuperman Advisors. All rights reserved.
            </div>
            <div className="flex gap-8">
              <a 
                href="/contact" 
                className="text-slate-400 hover:text-accent-cyan transition-colors text-sm"
              >
                Contact
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-accent-cyan transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
