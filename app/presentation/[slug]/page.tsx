"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, Activity, Radio, FileText, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<'listener' | 'spy' | 'analyst'>('listener');

  useEffect(() => {
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
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-slate-400 font-mono">Loading presentation...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
            <div className="flex justify-center mb-8">
              <img src="/refaclogo.png" alt="The Refactor Sprint" className="h-16 w-auto" />
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#0070F3]/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#0070F3]" />
              </div>
              <h1 className="text-3xl font-bold mb-2 font-mono">SECURE ACCESS</h1>
              <p className="text-slate-400 text-sm">Enter password to view blueprint</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wider mb-2 text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070F3] focus:border-transparent text-slate-50 pr-12 font-mono text-sm"
                    placeholder="clientname01312026xxxx"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#FF4F00]/10 border border-[#FF4F00]/50 rounded-lg text-[#FF4F00] text-xs font-mono"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#0070F3] hover:bg-[#0070F3]/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-[#0070F3]/20 font-mono"
              >
                ACCESS BLUEPRINT
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-xs text-slate-500 hover:text-[#0070F3] transition-colors font-mono">
                ← EXIT
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!sprint) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-[#FF4F00] font-mono">ERROR: Sprint not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-50">
      {/* Fixed Header */}
      <div className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-3 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-6" />
            <span className="text-slate-600 font-mono text-xs">/ BLUEPRINT</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Live Doc Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0070F3]/10 border border-[#0070F3]/30 rounded">
              <div className="w-2 h-2 rounded-full bg-[#0070F3] animate-pulse" />
              <span className="text-[#0070F3] font-mono text-xs uppercase">Live Doc</span>
            </div>
            
            <div className="text-right">
              <div className="text-xs font-mono text-slate-500">Client: <span className="text-slate-300">{sprint.client_name}</span></div>
              <div className="text-xs font-mono text-slate-500">Generated: {new Date(sprint.created_at).toLocaleDateString()}</div>
            </div>
            
            <a
              href="/"
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded transition-all flex items-center gap-2 font-mono"
            >
              <ArrowLeft className="w-3 h-3" />
              EXIT
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* Executive Summary */}
        {(sprint.annual_revenue || sprint.burn_rate || sprint.hypothesis) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 font-mono text-[#0070F3] uppercase tracking-wider">Executive Summary</h2>
            <div className="grid grid-cols-3 gap-6">
              {sprint.annual_revenue && (
                <div>
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">Annual Revenue</p>
                  <p className="text-3xl font-bold font-mono text-slate-200">{sprint.annual_revenue}</p>
                </div>
              )}
              {sprint.burn_rate && (
                <div>
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">Burn Rate</p>
                  <p className="text-3xl font-bold font-mono text-slate-200">{sprint.burn_rate}</p>
                </div>
              )}
              {sprint.hypothesis && (
                <div className="col-span-3 mt-4">
                  <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-2">Critical Error Hypothesis</p>
                  <p className="text-base leading-relaxed text-slate-300">{sprint.hypothesis}</p>
                </div>
              )}
            </div>
          </motion.section>
        )}

        {/* Growth Thesis - 2 Column Layout */}
        {sprint.growth_thesis && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-8 font-mono text-[#0070F3] uppercase tracking-wider">Growth Thesis</h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Narrative */}
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 text-[#FF4F00] font-mono uppercase">The Strategic Contradiction</h3>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {sprint.growth_thesis.split('\n\n')[0]}
                  </div>
                </div>
              </div>

              {/* Right Column - Evidence & Shift */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#0070F3]/10 to-[#0070F3]/5 backdrop-blur-xl border border-[#0070F3]/30 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 text-[#0070F3] font-mono uppercase">The Strategic Shift</h3>
                  <div className="text-slate-200 leading-relaxed">
                    {sprint.growth_thesis.split('\n\n').slice(-1)[0]}
                  </div>
                </div>

                {/* Data Evidence Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {sprint.agent_1_output && (
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
                      <Radio className="w-5 h-5 text-cyan-500 mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-mono">Transcript</p>
                    </div>
                  )}
                  {sprint.agent_2_output && (
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
                      <Activity className="w-5 h-5 text-violet-500 mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-mono">Competitive</p>
                    </div>
                  )}
                  {sprint.agent_3_output && (
                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
                      <FileText className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-mono">Forensics</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Must Fix - Prioritized Action List */}
        {sprint.roadmap_items && sprint.roadmap_items.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold font-mono text-[#0070F3] uppercase tracking-wider">Must Fix</h2>
              <span className="px-3 py-1 bg-[#FF4F00]/10 border border-[#FF4F00]/50 rounded text-[#FF4F00] font-mono text-xs uppercase">Priority: High</span>
            </div>
            
            <div className="space-y-2">
              {sprint.roadmap_items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(15, 23, 42, 0.5)' }}
                  className="bg-slate-900/30 border border-slate-800 rounded-lg p-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[#0070F3] font-mono font-bold text-sm flex-shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1">
                      <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">{item}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-slate-700 group-hover:text-green-500 transition-colors flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Agent Outputs - Tabbed Interface */}
        {(sprint.agent_1_output || sprint.agent_2_output || sprint.agent_3_output) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 font-mono text-[#0070F3] uppercase tracking-wider">Agent Outputs</h2>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-800">
              {sprint.agent_1_output && (
                <button
                  onClick={() => setActiveTab('listener')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    activeTab === 'listener'
                      ? 'border-b-2 border-cyan-500 text-cyan-500'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  THE LISTENER
                </button>
              )}
              {sprint.agent_2_output && (
                <button
                  onClick={() => setActiveTab('spy')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    activeTab === 'spy'
                      ? 'border-b-2 border-violet-500 text-violet-500'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  THE SPY
                </button>
              )}
              {sprint.agent_3_output && (
                <button
                  onClick={() => setActiveTab('analyst')}
                  className={`px-6 py-3 font-mono text-sm transition-all ${
                    activeTab === 'analyst'
                      ? 'border-b-2 border-amber-500 text-amber-500'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  THE ANALYST
                </button>
              )}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'listener' && sprint.agent_1_output && (
                <motion.div
                  key="listener"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-6"
                >
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800">
                    <AlertTriangle className="w-5 h-5 text-[#FF4F00] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-cyan-500 font-mono">CRITICAL MISALIGNMENTS</h3>
                      <p className="text-xs text-slate-400 mt-1">Stakeholder Conflict Analysis</p>
                    </div>
                  </div>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {sprint.agent_1_output}
                  </pre>
                </motion.div>
              )}

              {activeTab === 'spy' && sprint.agent_2_output && (
                <motion.div
                  key="spy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-violet-500/30 rounded-xl p-6"
                >
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800">
                    <Activity className="w-5 h-5 text-violet-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-violet-500 font-mono">COMPETITIVE INTELLIGENCE</h3>
                      <p className="text-xs text-slate-400 mt-1">Market Positioning Analysis</p>
                    </div>
                  </div>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {sprint.agent_2_output}
                  </pre>
                </motion.div>
              )}

              {activeTab === 'analyst' && sprint.agent_3_output && (
                <motion.div
                  key="analyst"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-amber-500/30 rounded-xl p-6"
                >
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-slate-800">
                    <TrendingUp className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-amber-500 font-mono">CRM FORENSICS</h3>
                      <p className="text-xs text-slate-400 mt-1">Revenue Engine Diagnostics</p>
                    </div>
                  </div>
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {sprint.agent_3_output}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* Footer CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-12 border-t border-slate-800"
        >
          <p className="text-sm text-slate-500 font-mono mb-6">
            This presentation expires 30 days from creation
          </p>
          <a
            href="https://refactorsprint.com"
            className="inline-block px-8 py-3 bg-[#0070F3] hover:bg-[#0070F3]/90 text-white font-bold rounded-lg transition-all font-mono text-sm"
          >
            LEARN MORE
          </a>
          <div className="mt-8">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-10 mx-auto opacity-30" />
          </div>
        </motion.section>
      </div>

      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
