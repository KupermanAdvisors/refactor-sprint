"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Download, ArrowLeft } from "lucide-react";
import { toast, Toaster } from "sonner";
import { use } from "react";

interface Sprint {
  id: string;
  client_name: string;
  created_at: string;
  annual_revenue?: string;
  burn_rate?: string;
  hypothesis?: string;
  agent_1_output?: string;
  agent_2_output?: string;
  agent_3_output?: string;
  growth_thesis?: string;
  roadmap_items?: string[];
}

export default function PresentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sprint, setSprint] = useState<Sprint | null>(null);

  useEffect(() => {
    // Check session
    const sessionKey = `presentation-${slug}`;
    const authStatus = sessionStorage.getItem(sessionKey);
    if (authStatus === "authenticated") {
      loadSprint("");
    } else {
      setIsLoading(false);
    }
  }, [slug]);

  const loadSprint = async (pwd: string) => {
    try {
      const response = await fetch('/api/sprints/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, password: pwd }),
      });

      const data = await response.json();

      if (response.status === 410) {
        setError("This presentation has expired (30-day limit)");
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        if (pwd) setError("Incorrect password");
        setIsLoading(false);
        return;
      }

      if (data.success) {
        setSprint(data.sprint);
        setIsAuthenticated(true);
        sessionStorage.setItem(`presentation-${slug}`, "authenticated");
      }
    } catch (error) {
      setError("Failed to load presentation");
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loadSprint(password);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading presentation...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="flex justify-center mb-8">
              <img src="/refaclogo.png" alt="The Refactor Sprint" className="h-16 w-auto" />
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-violet-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Protected Presentation</h1>
              <p className="text-slate-400">Enter password to view sprint results</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-50 pr-12 font-mono"
                    placeholder="Enter password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Format: clientname + mmddyyyy + 4-digit code (e.g., techflow013120261234)
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-violet-500/20"
              >
                VIEW PRESENTATION
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-slate-400 hover:text-violet-500 transition-colors">
                ← Back to Refactor Sprint
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!sprint) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-red-400">Sprint not found</div>
      </div>
    );
  }

  // Split roadmap into phases
  const phase1 = sprint.roadmap_items?.slice(0, 3) || [];
  const phase2 = sprint.roadmap_items?.slice(3, 6) || [];
  const phase3 = sprint.roadmap_items?.slice(6) || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Fixed Header */}
      <div className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-8" />
            <span className="text-slate-500 font-mono text-sm">/ presentation</span>
          </div>
          <a
            href="/"
            className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit
          </a>
        </div>
      </div>

      {/* Presentation Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Slide 1: Title */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[80vh] flex flex-col justify-center items-center text-center"
        >
          <div className="mb-8">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-20 mx-auto mb-6" />
          </div>
          <h1 className="text-6xl font-bold mb-6">The Refactor Sprint</h1>
          <p className="text-2xl text-slate-400 mb-4">72-Hour Revenue Engine Diagnostic</p>
          <div className="text-xl text-slate-500">
            <p>Prepared for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500 font-bold">{sprint.client_name}</span></p>
            <p className="mt-2">{new Date(sprint.created_at).toLocaleDateString()}</p>
          </div>
        </motion.section>

        {/* Slide 2: Executive Summary */}
        {(sprint.annual_revenue || sprint.burn_rate || sprint.hypothesis) && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500">
              Executive Summary
            </h2>
            <div className="space-y-6 bg-slate-900 border border-slate-800 rounded-xl p-8">
              {sprint.annual_revenue && (
                <div>
                  <p className="text-sm text-slate-500 font-mono uppercase mb-2">Annual Revenue</p>
                  <p className="text-2xl font-bold">{sprint.annual_revenue}</p>
                </div>
              )}
              {sprint.burn_rate && (
                <div>
                  <p className="text-sm text-slate-500 font-mono uppercase mb-2">Burn Rate</p>
                  <p className="text-2xl font-bold">{sprint.burn_rate}</p>
                </div>
              )}
              {sprint.hypothesis && (
                <div>
                  <p className="text-sm text-slate-500 font-mono uppercase mb-2">Critical Error Hypothesis</p>
                  <p className="text-lg leading-relaxed text-slate-300">{sprint.hypothesis}</p>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Slide 3: Agent Outputs */}
        {(sprint.agent_1_output || sprint.agent_2_output || sprint.agent_3_output) && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500">
              Forensic Analysis
            </h2>
            
            {sprint.agent_1_output && (
              <div className="mb-8 bg-slate-900 border border-cyan-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-cyan-500 font-mono">The Listener: Stakeholder Analysis</h3>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {sprint.agent_1_output}
                </pre>
              </div>
            )}

            {sprint.agent_2_output && (
              <div className="mb-8 bg-slate-900 border border-violet-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-violet-500 font-mono">The Spy: Competitive Intelligence</h3>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {sprint.agent_2_output}
                </pre>
              </div>
            )}

            {sprint.agent_3_output && (
              <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-amber-500 font-mono">The Analyst: CRM Forensics</h3>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {sprint.agent_3_output}
                </pre>
              </div>
            )}
          </motion.section>
        )}

        {/* Slide 4: Growth Thesis */}
        {sprint.growth_thesis && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500">
              The Strategic Shift
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <p className="text-lg leading-relaxed text-slate-300 whitespace-pre-wrap">
                {sprint.growth_thesis}
              </p>
            </div>
          </motion.section>
        )}

        {/* Slide 5: 90-Day Roadmap */}
        {sprint.roadmap_items && sprint.roadmap_items.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-500">
              90-Day Remediation Roadmap
            </h2>
            
            <div className="space-y-6">
              {phase1.length > 0 && (
                <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-cyan-500">Phase 1: Days 1-30</h3>
                  <ul className="space-y-3">
                    {phase1.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-cyan-500 font-mono font-bold">{i + 1}.</span>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {phase2.length > 0 && (
                <div className="bg-slate-900 border border-violet-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-violet-500">Phase 2: Days 30-60</h3>
                  <ul className="space-y-3">
                    {phase2.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-violet-500 font-mono font-bold">{i + 1}.</span>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {phase3.length > 0 && (
                <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-amber-500">Phase 3: Days 60-90</h3>
                  <ul className="space-y-3">
                    {phase3.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-amber-500 font-mono font-bold">{i + 1}.</span>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Final Slide: Next Steps */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="min-h-screen flex flex-col justify-center text-center"
        >
          <h2 className="text-4xl font-bold mb-8">Ready to Execute?</h2>
          <p className="text-xl text-slate-400 mb-12">
            This presentation expires 30 days from creation.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://refactorsprint.com"
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all text-lg"
            >
              Learn More
            </a>
          </div>
          <div className="mt-12">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-12 mx-auto opacity-50" />
          </div>
        </motion.section>
      </div>

      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
