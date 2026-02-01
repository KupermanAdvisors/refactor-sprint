"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, CheckSquare, ChevronDown, ChevronRight, MessageSquare, BarChart3, Search, TrendingUp, ArrowRight } from "lucide-react";
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
  const [showAgentData, setShowAgentData] = useState(false);

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading presentation...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-8">
              <img src="/refaclogo.png" alt="The Refactor Sprint" className="h-16 w-auto" />
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Secure Access Required</h1>
              <p className="text-slate-600 text-sm">Enter password to view executive brief</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 pr-12"
                    placeholder="Enter password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md"
              >
                Access Brief
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                ← Exit
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!sprint) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-red-600">Sprint not found</div>
      </div>
    );
  }

  // Parse growth thesis sections
  const parseGrowthThesis = () => {
    if (!sprint.growth_thesis) return null;
    
    const text = sprint.growth_thesis;
    const sections = text.split('\n\n').filter(s => s.trim());
    
    return {
      contradiction: sections[0] || text,
      shift: sections[sections.length - 1] || '',
      fullText: text
    };
  };

  const growthThesis = parseGrowthThesis();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-8" />
          </div>
          <a
            href="/"
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center border-b border-slate-200 pb-8"
        >
          <h1 className="text-5xl font-bold mb-3 text-slate-900">{sprint.client_name}</h1>
          <p className="text-xl text-slate-600 mb-2">72-Hour Revenue Engine Diagnostic</p>
          <p className="text-sm text-slate-500">Generated {new Date(sprint.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </motion.div>

        {/* Executive Summary */}
        {(sprint.annual_revenue || sprint.burn_rate || sprint.hypothesis) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 border border-slate-200 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Executive Summary</h2>
            <div className="grid grid-cols-2 gap-6">
              {sprint.annual_revenue && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Annual Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">{sprint.annual_revenue}</p>
                </div>
              )}
              {sprint.burn_rate && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1 font-semibold">Burn Rate</p>
                  <p className="text-3xl font-bold text-slate-900">{sprint.burn_rate}</p>
                </div>
              )}
            </div>
            {sprint.hypothesis && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">Critical Error Hypothesis</p>
                <p className="text-base leading-relaxed text-slate-700">{sprint.hypothesis}</p>
              </div>
            )}
          </motion.section>
        )}

        {/* Growth Thesis */}
        {growthThesis && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Strategic Analysis</h2>
            
            {/* The Contradiction */}
            <div className="bg-slate-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-lg font-bold mb-3 text-red-700">The Strategic Contradiction</h3>
              <p className="text-slate-700 leading-relaxed">{growthThesis.contradiction}</p>
            </div>

            {/* Evidence Cards Row */}
            {(sprint.agent_1_output || sprint.agent_2_output || sprint.agent_3_output) && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {sprint.agent_1_output && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-700">Transcript Analysis</p>
                    </div>
                    <p className="text-xs text-slate-600">Stakeholder misalignment identified</p>
                  </div>
                )}
                {sprint.agent_2_output && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-700">Competitive Intelligence</p>
                    </div>
                    <p className="text-xs text-slate-600">Market positioning analyzed</p>
                  </div>
                )}
                {sprint.agent_3_output && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Search className="w-5 h-5 text-blue-600" />
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-700">CRM Forensics</p>
                    </div>
                    <p className="text-xs text-slate-600">Revenue patterns examined</p>
                  </div>
                )}
              </div>
            )}

            {/* The Strategic Shift - PROMINENT */}
            <div className="bg-blue-600 text-white rounded-xl p-8 shadow-lg mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-blue-100">Recommended Strategic Shift</h3>
              <div className="text-2xl font-bold leading-relaxed">
                {growthThesis.shift}
              </div>
            </div>
          </motion.section>
        )}

        {/* Must Fix - Action Items */}
        {sprint.roadmap_items && sprint.roadmap_items.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Prioritized Action Plan</h2>
            
            <div className="space-y-3">
              {sprint.roadmap_items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <CheckSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold text-lg flex-shrink-0">{i + 1}</span>
                        <p className="text-slate-800 font-semibold leading-relaxed">{item}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Collapsible Agent Data */}
        {(sprint.agent_1_output || sprint.agent_2_output || sprint.agent_3_output) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-slate-200 pt-8"
          >
            <button
              onClick={() => setShowAgentData(!showAgentData)}
              className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors mb-4"
            >
              {showAgentData ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              <span className="text-lg font-semibold">Supporting Agent Data</span>
              <span className="text-sm text-slate-500">(Click to {showAgentData ? 'collapse' : 'expand'})</span>
            </button>

            {showAgentData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                {sprint.agent_1_output && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="text-base font-bold mb-3 text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      The Listener: Stakeholder Analysis
                    </h3>
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
                      {sprint.agent_1_output}
                    </pre>
                  </div>
                )}

                {sprint.agent_2_output && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="text-base font-bold mb-3 text-slate-900 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      The Spy: Competitive Intelligence
                    </h3>
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
                      {sprint.agent_2_output}
                    </pre>
                  </div>
                )}

                {sprint.agent_3_output && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="text-base font-bold mb-3 text-slate-900 flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      The Analyst: CRM Forensics
                    </h3>
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
                      {sprint.agent_3_output}
                    </pre>
                  </div>
                )}
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-12 border-t border-slate-200"
        >
          <p className="text-sm text-slate-500 mb-4">
            This presentation expires 30 days from creation
          </p>
          <a
            href="https://refactorsprint.com"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-md"
          >
            Learn More About Refactor Sprint
          </a>
          <div className="mt-6">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-8 mx-auto opacity-40" />
          </div>
        </motion.div>
      </div>

      <Toaster position="top-right" theme="light" richColors />
    </div>
  );
}
