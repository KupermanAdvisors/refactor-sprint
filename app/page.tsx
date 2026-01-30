"use client";

import { motion, useAnimationControls } from "framer-motion";
import { Radio, Activity, Heart, CheckCircle, XCircle, Zap, Clock, Target } from "lucide-react";
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="text-lg font-semibold tracking-tight">The Refactor Sprint</div>
          <a
            href="#book"
            className="px-6 py-2.5 bg-accent-cyan hover:bg-cyan-500 text-slate-900 rounded font-semibold transition-all"
          >
            Start the Sprint
          </a>
        </div>
      </nav>

      {/* Hero Section - The Value Proposition */}
      <section className="relative pt-32 pb-40 px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Neural Braid Background Animation */}
        <NeuralBraidBackground />

        {/* Content with backdrop blur for readability */}
        <div className="max-w-6xl mx-auto text-center relative z-10 backdrop-blur-sm bg-slate-900/30 rounded-2xl p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-8xl font-bold leading-[1.05] mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-slate-400">
                25 Years of Marketing Strategy.
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
                Compressed into 72 Hours.
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              We leverage a proprietary AI stack to ingest your data, debug your revenue engine, 
              and deliver a 90-day roadmap—faster than a traditional agency can schedule a kickoff.
            </p>
            <a
              href="#book"
              className="inline-block px-10 py-5 bg-accent-cyan hover:bg-cyan-500 text-slate-900 text-lg font-bold transition-all rounded-lg shadow-lg shadow-cyan-500/20"
            >
              Start the Sprint
            </a>
          </motion.div>
        </div>
      </section>

      {/* The Why - The Efficiency */}
      <section className="py-24 px-6 lg:px-8 bg-slate-950 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-6">
              The End of the{" "}
              <span className="relative inline-block">
                <span className="text-slate-300">8-Week Discovery Phase</span>
                {/* Red Pen Strikethrough */}
                <motion.svg
                  className="absolute left-0 top-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.line
                    x1="0"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="#dc2626"
                    strokeWidth="18"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
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
            <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              You don't have months to wait for a strategy deck. By combining senior executive 
              leadership with computational market intelligence, we strip away the "consulting fluff" 
              and get straight to the math of your market position.
            </p>
            <div className="inline-block glass rounded-lg px-8 py-4">
              <div className="text-4xl font-bold text-accent-cyan mb-2">
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
      <section className="py-32 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-4">
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
      <section className="py-24 px-6 lg:px-8 bg-slate-950 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-4">
              The <span className="text-accent-cyan">Refactor Sprint</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Signal Flow Line */}
            <div className="absolute left-8 md:left-24 top-0 bottom-0 w-1 bg-slate-800">
              <motion.div
                className="w-full bg-gradient-to-b from-accent-cyan via-accent-violet to-white"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>

            <div className="space-y-8">
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
                  className="grid md:grid-cols-12 gap-6 items-start relative"
                >
                  {/* Connection node */}
                  <div className="absolute left-8 md:left-24 top-8 w-4 h-4 -ml-1.5 bg-accent-cyan rounded-full shadow-lg shadow-cyan-500/50 z-10" />
                  
                  <div className="md:col-span-2 pl-20 md:pl-0">
                    <div className="text-7xl font-bold font-mono text-accent-cyan opacity-20">
                      {item.day}
                    </div>
                  </div>
                  
                  <div className="md:col-span-10 glass rounded-xl p-8 ml-12 md:ml-0">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Output - Deliverables */}
      <section className="py-24 px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-2 glass rounded-full">
              <Clock className="w-4 h-4 inline-block mr-2 text-accent-cyan" />
              <span className="text-sm font-mono text-slate-400 uppercase tracking-wider">
                <RollingNumber value={72} /> Hours Later
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-4">
              What You Get on <span className="text-accent-cyan">Thursday Morning</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
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
      <section id="book" className="py-32 px-6 lg:px-8 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Ready to Accelerate<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
                Your Strategy?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              72 hours. Fixed fee. Actionable roadmap.
            </p>
            <a
              href="mailto:jason@kupermanadvisors.com?subject=Book%20Refactor%20Sprint"
              className="inline-block px-12 py-6 bg-accent-cyan hover:bg-cyan-500 text-slate-900 text-xl font-bold transition-all rounded-lg shadow-lg shadow-cyan-500/20"
            >
              Start Your Sprint — $<RollingNumber value={7} />,<RollingNumber value={500} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer - Scope & Trust */}
      <footer className="py-16 px-6 lg:px-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          {/* Scope Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Scope Clarity</h3>
            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-8 py-5 text-left font-bold">Service</th>
                    <th className="px-8 py-5 text-left font-bold">Focus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="px-8 py-5">
                      <div className="font-bold text-xl text-accent-cyan">The Refactor Sprint</div>
                      <div className="text-sm font-mono text-slate-500">3 Days • Architecture</div>
                    </td>
                    <td className="px-8 py-5 text-slate-300">
                      Diagnostics, Strategy, Creative Briefing, Tech Audit
                    </td>
                  </tr>
                  <tr>
                    <td className="px-8 py-5">
                      <div className="font-bold text-xl text-slate-400">Fractional CMO</div>
                      <div className="text-sm font-mono text-slate-600">Ongoing • Execution</div>
                    </td>
                    <td className="px-8 py-5 text-slate-500">
                      Execution, Creative Production, Team Management, Tech Implementation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center glass rounded-lg p-8 max-w-3xl mx-auto mb-12"
          >
            <div className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-3">Led by</div>
            <div className="text-2xl font-bold mb-3">Jason Kuperman</div>
            <p className="text-slate-400">
              25 years building digital infrastructure for global brands (Apple, OUTFRONT). 
              Now applying that rigor to scale-ups.
            </p>
          </motion.div>

          {/* Footer Links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800">
            <div className="text-slate-500 text-sm">
              © 2026 Kuperman Advisors. All rights reserved.
            </div>
            <div className="flex gap-8">
              <a 
                href="mailto:jason@kupermanadvisors.com" 
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
