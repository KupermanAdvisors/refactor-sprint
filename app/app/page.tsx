"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Activity, Bot, FileUp, Play, Zap, Download, AlertTriangle, CheckCircle, Clock, Copy, Globe } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function AppPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const CORRECT_PASSWORD = "popcorn";

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem("refactor-sprint-auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("refactor-sprint-auth", "authenticated");
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("refactor-sprint-auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/refaclogo.png"
                alt="The Refactor Sprint"
                className="h-16 w-auto"
              />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Command Center</h1>
              <p className="text-slate-400">Enter password to access</p>
            </div>

            {/* Form */}
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
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-50 pr-12 font-mono"
                    placeholder="Enter password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
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
                className="w-full px-6 py-3 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-green-500/20"
              >
                ACCESS COMMAND CENTER
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-slate-400 hover:text-green-500 transition-colors"
              >
                ← Back to Refactor Sprint
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Protected App Content - Command Center
  return <CommandCenter onLogout={handleLogout} />;
}

// Command Center Component
function CommandCenter({ onLogout }: { onLogout: () => void }) {
  // State for Pane 1 - Flight Deck
  const [companyName, setCompanyName] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [burnRate, setBurnRate] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string; content: string}>>([]);
  const [sprintStartTime] = useState(Date.now());
  
  // State for Pane 2 - Agents
  const [transcript, setTranscript] = useState("");
  const [agent1Output, setAgent1Output] = useState("");
  const [agent1Loading, setAgent1Loading] = useState(false);
  
  const [competitor1, setCompetitor1] = useState("");
  const [competitor2, setCompetitor2] = useState("");
  const [competitor3, setCompetitor3] = useState("");
  const [agent2Output, setAgent2Output] = useState("");
  const [agent2Loading, setAgent2Loading] = useState(false);
  
  const [selectedCsv, setSelectedCsv] = useState("");
  const [agent3Output, setAgent3Output] = useState("");
  const [agent3Loading, setAgent3Loading] = useState(false);
  
  // State for Pane 3 - Architect
  const [growthThesis, setGrowthThesis] = useState("");
  const [mustFixItems, setMustFixItems] = useState<string[]>([]);
  const [newMustFix, setNewMustFix] = useState("");

  // Countdown Timer
  const [timeRemaining, setTimeRemaining] = useState(72 * 60 * 60 * 1000); // 72 hours in ms

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - sprintStartTime;
      const remaining = Math.max(0, (72 * 60 * 60 * 1000) - elapsed);
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [sprintStartTime]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          setUploadedFiles(prev => [...prev, { name: file.name, content }]);
        };
        reader.readAsText(file);
      });
    }
  };

  // Agent 1: Extract Pain Points
  const handleAgent1 = async () => {
    setAgent1Loading(true);
    try {
      const response = await fetch('/api/agent-listener', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });
      const data = await response.json();
      setAgent1Output(data.analysis || "Analysis complete. See results above.");
    } catch (error) {
      setAgent1Output("ERROR: Failed to process transcript.");
    }
    setAgent1Loading(false);
  };

  // Agent 2: Market Intel (LIVE)
  const handleAgent2 = async () => {
    setAgent2Loading(true);
    setAgent2Output("");
    
    try {
      const competitors = [competitor1, competitor2, competitor3].filter(c => c.trim() !== '');
      
      if (competitors.length === 0) {
        setAgent2Output("ERROR: Please enter at least one competitor URL.");
        setAgent2Loading(false);
        return;
      }

      const response = await fetch('/api/agent-spy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ competitors })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setAgent2Output(`ERROR: ${data.error}`);
      } else {
        let output = data.analysis || "Analysis complete.";
        if (data.errors && data.errors.length > 0) {
          output += `\n\n⚠ SCRAPING ERRORS:\n${data.errors.join('\n')}`;
        }
        setAgent2Output(output);
      }
    } catch (error) {
      setAgent2Output("ERROR: Failed to process competitor intelligence.");
    }
    setAgent2Loading(false);
  };

  // Agent 3: Forensics (LIVE)
  const handleAgent3 = async () => {
    setAgent3Loading(true);
    setAgent3Output("");
    
    try {
      const selectedFile = uploadedFiles.find(f => f.name === selectedCsv);
      
      if (!selectedFile) {
        setAgent3Output("ERROR: Selected file not found.");
        setAgent3Loading(false);
        return;
      }

      const response = await fetch('/api/agent-analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          csvContent: selectedFile.content,
          fileName: selectedFile.name
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setAgent3Output(`ERROR: ${data.error}`);
      } else {
        setAgent3Output(data.analysis || "Analysis complete.");
      }
    } catch (error) {
      setAgent3Output("ERROR: Failed to process CSV forensics.");
    }
    setAgent3Loading(false);
  };

  // Export Blueprint
  const handleExport = () => {
    const markdown = `
# REFACTOR SPRINT BLUEPRINT
**Client:** ${companyName || "[Company Name]"}
**Generated:** ${new Date().toLocaleDateString()}

---

## GROWTH THESIS
${growthThesis || "[No thesis generated yet]"}

---

## MUST FIX (Priority Order)
${mustFixItems.map((item, i) => `${i + 1}. ${item}`).join('\n') || "[No items added]"}

---

## AGENT OUTPUTS

### The Listener (Kickoff Analysis)
${agent1Output || "[No analysis run]"}

### The Spy (Market Intel)
${agent2Output || "[No intel gathered]"}

### The Analyst (CRM Forensics)
${agent3Output || "[No forensics run]"}
    `.trim();

    // Copy to clipboard
    navigator.clipboard.writeText(markdown);
    toast.success("Blueprint copied to clipboard!");
  };

  // Export for Gamma
  const handleGammaExport = () => {
    // Extract insights from agent outputs for template variables
    const extractCEOQuote = () => {
      if (agent1Output) {
        const ceoMatch = agent1Output.match(/CEO.*?:([\s\S]*?)(?=\nSales|CMO|CFO|$)/);
        return ceoMatch ? ceoMatch[1].trim().substring(0, 150) : "[Insert CEO Quote from Transcript]";
      }
      return "[Insert CEO Quote from Transcript]";
    };

    const extractCRMInsight = () => {
      if (agent3Output) {
        const insightMatch = agent3Output.match(/Win Rate:\s*(\d+\.?\d*%)/i);
        if (insightMatch) return `Win rate is ${insightMatch[1]} - data shows actual conversion metrics`;
      }
      return "[Insert CRM Data Insight]";
    };

    const extractCapitalAllocation = () => {
      if (agent2Output && agent3Output) {
        return "Current spend is focused on channels that generate leads but not revenue. CRM data shows high CAC with low conversion on enterprise campaigns.";
      }
      return "[Insert Capital Allocation Analysis]";
    };

    const extractPhase1 = () => {
      const items = mustFixItems.slice(0, 3);
      return items.length > 0 ? items.map((item, i) => `  ${i + 1}. ${item}`).join('\n') : "[Define Phase 1 tasks]";
    };

    const extractPhase2 = () => {
      const items = mustFixItems.slice(3, 6);
      return items.length > 0 ? items.map((item, i) => `  ${i + 1}. ${item}`).join('\n') : "[Define Phase 2 tasks]";
    };

    const extractPhase3 = () => {
      const items = mustFixItems.slice(6);
      return items.length > 0 ? items.map((item, i) => `  ${i + 1}. ${item}`).join('\n') : "[Define Phase 3 tasks]";
    };

    const gammaMarkdown = `# Slide 1: Title Card
**Title:** The Refactor Sprint
**Subtitle:** 72-Hour Revenue Engine Diagnostic
**Client:** ${companyName || "[Client Name]"}
**Date:** ${new Date().toLocaleDateString()}

**Visual Style Instructions:**
- Background: Deep slate/charcoal (dark mode - #0f172a or similar)
- Logo: Place Refactor Sprint logo in top left corner
- Typography: Clean sans-serif (Inter) with monospace accents
- Color scheme: Cyan (#06B6D4) and violet (#8B5CF6) gradient accents
- Layout: Centered title with subtle grid pattern background
- Aesthetic: "Terminal meets Strategy Firm" - technical precision with executive polish

---

# Slide 2: Executive Scorecard
**Headline:** System Status: Revenue Engine Health Check

**Status Indicators:**
- 🟢 **Market Position:** ${agent2Output ? "Warning - Competitive differentiation unclear" : "[Assess Market Position]"}
- 🟡 **Unit Economics:** ${agent3Output ? "Critical - CAC/Win rate misalignment detected" : "[Assess Unit Economics]"}  
- 🔴 **Tech Stack:** ${uploadedFiles.length > 0 ? "Stable - Data infrastructure functional" : "[Assess Tech Stack]"}

**Visual Style Instructions:**
- Use traffic light color system (Green: #10b981, Yellow: #f59e0b, Red: #ef4444)
- Dark card backgrounds with neon accent borders
- Monospace font for metrics
- Grid layout with glassmorphism effect
- Terminal-style status indicators (e.g., "$ system_check --status")

---

# Slide 3: The Forensic Evidence
**Headline:** The Disconnect: Belief vs. Data

**The Strategic Contradiction:**

**Leadership Belief:**
> "${extractCEOQuote()}"

**What the Data Shows:**
> ${extractCRMInsight()}

**Visual Style Instructions:**
- Split-screen layout (belief on left, data on right)
- High contrast - cyan accent for "Belief", violet accent for "Data"
- Quote blocks with dark background and neon border glow
- Use → arrow icon between sections to show contradiction
- Typography: Larger font for quotes, monospace for data metrics

---

# Slide 4: Capital Allocation Analysis
**Headline:** Where Your GTM Budget is Actually Going

**Current State:**
${extractCapitalAllocation()}

**The Reallocation Strategy:**

**🛑 STOP Spending:**
- ${agent2Output ? "Enterprise-focused campaigns with <10% conversion" : "[Identify stop spending]"}
- High-CAC channels that don't align with win profile
- Messaging that repels actual buyers

**▶️ START Spending:**
- ${agent3Output ? "Channels aligned with actual win profile (52%+ conversion)" : "[Identify start spending]"}
- Mid-market focused campaigns
- Fast ROI, proven conversion paths

**Visual Style Instructions:**
- Use Sankey diagram or flow chart showing budget reallocation
- Red/stop indicators for waste, green/start indicators for opportunity
- Dark background with glowing connection lines
- Monospace font for dollar amounts
- Include $ savings calculation prominently

---

# Slide 5: The 90-Day Remediation Roadmap
**Headline:** From Diagnosis to Execution

**Phase 1: Stabilize (Days 1-30)**
${extractPhase1()}

**Phase 2: Optimize (Days 30-60)**
${extractPhase2()}

**Phase 3: Scale (Days 60-90)**
${extractPhase3()}

**Visual Style Instructions:**
- Horizontal Gantt-style timeline
- Three distinct phases with cyan → violet gradient progression
- Dark card backgrounds for each phase
- Checkbox icons for tasks
- Timeline bar at top showing 90-day span
- Monospace font for day counts

---

# Slide 6: The Growth Thesis
**Headline:** The Strategic Shift

${growthThesis || "[Insert Growth Thesis - synthesize findings from agents]"}

**Visual Style Instructions:**
- Clean text layout with ample white (well, dark) space
- Pull quotes highlighted in cyan boxes
- Key metrics in monospace font with violet accents
- Minimal decoration - let the content speak
- Use → arrows between logical progressions
- Dark slate background with subtle grid overlay

---

# Slide 7: Next Steps
**Headline:** From Blueprint to Execution

**Immediate Actions:**
1. Review and approve remediation roadmap
2. Allocate budget for Phase 1 execution  
3. Schedule weekly check-ins during 90-day implementation
4. Assign owners to each roadmap item

**What Happens Next:**
- Week 1: Kickoff execution of Phase 1 items
- Week 2-4: Weekly progress reviews
- Week 5: Phase 2 planning and launch
- Week 9: Phase 3 planning and launch
- Day 90: Sprint retrospective and next quarter planning

**Contact:**
The Refactor Sprint Team
refactorsprint.com

**Visual Style Instructions:**
- Simple checklist layout with cyan checkboxes
- Timeline with milestone markers
- Contact info in footer with subtle glow effect
- CTA button: "Begin 90-Day Execution" in cyan (#06B6D4)
- Logo in bottom corner
- Dark background maintaining brand consistency`.trim();

    // Copy to clipboard
    navigator.clipboard.writeText(gammaMarkdown);
    toast.success("Gamma blueprint copied! Paste into gamma.app to generate slides with Refactor Sprint branding.");
  };

  // Save sprint and generate web presentation
  const handleWebPresentation = async () => {
    try {
      // Prepare sprint data
      const sprintData = {
        clientName: companyName,
        annualRevenue,
        burnRate,
        hypothesis,
        agent1Transcript: transcript,
        agent1Output,
        agent2Competitors: [competitor1, competitor2, competitor3].filter(c => c),
        agent2Output,
        agent3CsvFilename: selectedCsv,
        agent3CsvContent: uploadedFiles.find(f => f.name === selectedCsv)?.content || '',
        agent3Output,
        growthThesis,
        roadmapItems: mustFixItems,
        uploadedFiles: uploadedFiles.map(f => ({ name: f.name, size: f.content.length })),
      };

      const response = await fetch('/api/sprints/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sprintData),
      });

      const data = await response.json();

      if (data.success) {
        const fullUrl = `${window.location.origin}${data.presentationUrl}`;
        
        // Copy URL and password to clipboard
        const message = `
Presentation URL: ${fullUrl}
Password: ${data.password}

(This presentation expires in 30 days)
        `.trim();
        
        navigator.clipboard.writeText(message);
        toast.success("Presentation created! URL and password copied to clipboard.");
        
        // Show confirmation dialog
        const openNow = confirm(`Presentation created!\n\nURL: ${fullUrl}\nPassword: ${data.password}\n\nURL and password have been copied to your clipboard.\n\nWould you like to open the presentation now?`);
        
        if (openNow) {
          window.open(fullUrl, '_blank');
        }
      } else {
        toast.error("Failed to create presentation");
      }
    } catch (error) {
      console.error('Web presentation error:', error);
      toast.error("Error creating presentation");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-8" />
            <span className="text-slate-500 font-mono text-sm">/ command-center</span>
          </div>
          
          {/* Countdown Timer + Nav */}
          <div className="flex items-center gap-4">
            <a
              href="/archive"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Archive
            </a>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/50 rounded-lg">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="font-mono text-amber-500 font-bold">{formatTime(timeRemaining)}</span>
            </div>
            
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="grid lg:grid-cols-3 gap-4 p-4 max-w-[1800px] mx-auto">
        
        {/* PANE 1: FLIGHT DECK */}
        <div className="space-y-4">
          <div className="text-green-500 font-mono text-xs uppercase tracking-wider border-l-2 border-green-500 pl-3">
            Pane 1: Flight Deck
          </div>

          {/* Client Vitals */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-500" />
              <h3 className="font-bold text-green-500 font-mono">CLIENT VITALS</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-mono">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Acme Corp"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-mono">Annual Revenue</label>
                  <input
                    type="text"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="$5M"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-mono">Burn Rate</label>
                  <input
                    type="text"
                    value={burnRate}
                    onChange={(e) => setBurnRate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="$200K/mo"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-mono">Critical Error Hypothesis</label>
                <textarea
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500 h-20 resize-none"
                  placeholder="What's broken in their GTM engine?"
                />
              </div>
            </div>
          </div>

          {/* Data Ingestion */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <FileUp className="w-5 h-5 text-green-500" />
              <h3 className="font-bold text-green-500 font-mono">DATA INGESTION</h3>
            </div>
            
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-green-500/50 transition-colors">
              <input
                type="file"
                multiple
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileUp className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Drop files or click to upload</p>
                <p className="text-xs text-slate-600 mt-1">.csv, .txt accepted</p>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-slate-950 px-3 py-2 rounded border border-slate-800">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-slate-300 font-mono text-xs flex-1">{file.name}</span>
                    <span className="text-green-500 text-xs">READY</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PANE 2: AGENT HIVE */}
        <div className="space-y-4">
          <div className="text-cyan-500 font-mono text-xs uppercase tracking-wider border-l-2 border-cyan-500 pl-3">
            Pane 2: Agent Hive
          </div>

          {/* Agent 1: The Listener */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-cyan-500" />
              <h3 className="font-bold text-cyan-500 font-mono">AGENT 1: THE LISTENER</h3>
            </div>
            
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 h-32 resize-none mb-3 font-mono"
              placeholder="Paste kickoff call transcript here..."
            />
            
            <button
              onClick={handleAgent1}
              disabled={agent1Loading || !transcript}
              className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {agent1Loading ? (
                <>Processing...</>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  EXTRACT PAIN POINTS
                </>
              )}
            </button>
            
            {agent1Output && (
              <div className="mt-4 p-3 bg-slate-950 border border-cyan-500/30 rounded text-xs font-mono whitespace-pre-wrap text-slate-300">
                {agent1Output}
              </div>
            )}
          </div>

          {/* Agent 2: The Spy */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-purple-500" />
              <h3 className="font-bold text-purple-500 font-mono">AGENT 2: THE SPY</h3>
            </div>
            
            <div className="space-y-2 mb-3">
              <input
                type="text"
                value={competitor1}
                onChange={(e) => setCompetitor1(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Competitor 1 URL"
              />
              <input
                type="text"
                value={competitor2}
                onChange={(e) => setCompetitor2(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Competitor 2 URL"
              />
              <input
                type="text"
                value={competitor3}
                onChange={(e) => setCompetitor3(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Competitor 3 URL"
              />
            </div>
            
            <button
              onClick={handleAgent2}
              disabled={agent2Loading}
              className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {agent2Loading ? (
                <>Scanning...</>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  RUN INTEL SCAN
                </>
              )}
            </button>
            
            {agent2Output && (
              <div className="mt-4 p-3 bg-slate-950 border border-purple-500/30 rounded text-xs font-mono whitespace-pre-wrap text-slate-300">
                {agent2Output}
              </div>
            )}
          </div>

          {/* Agent 3: The Analyst */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-amber-500 font-mono">AGENT 3: THE ANALYST</h3>
            </div>
            
            {uploadedFiles.length === 0 && (
              <div className="mb-3 p-3 bg-slate-950 border border-slate-700 rounded text-xs text-slate-400">
                ⚠ No files uploaded yet. Upload a CSV in Pane 1 first.
              </div>
            )}
            
            {uploadedFiles.length > 0 && uploadedFiles.filter(f => f.name.endsWith('.csv')).length === 0 && (
              <div className="mb-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-400">
                ⚠ No CSV files found. Please upload a .csv file.
              </div>
            )}
            
            <select
              value={selectedCsv}
              onChange={(e) => setSelectedCsv(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 mb-3 font-mono"
            >
              <option value="">Select CSV file ({uploadedFiles.filter(f => f.name.endsWith('.csv')).length} available)</option>
              {uploadedFiles.filter(f => f.name.endsWith('.csv')).map((file, i) => (
                <option key={i} value={file.name}>{file.name}</option>
              ))}
            </select>
            
            <button
              onClick={handleAgent3}
              disabled={agent3Loading || !selectedCsv}
              className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {agent3Loading ? (
                <>Analyzing...</>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  RUN AUTOPSY
                </>
              )}
            </button>
            
            {agent3Output && (
              <div className="mt-4 p-3 bg-slate-950 border border-amber-500/30 rounded text-xs font-mono whitespace-pre-wrap text-slate-300">
                {agent3Output}
              </div>
            )}
          </div>
        </div>

        {/* PANE 3: THE ARCHITECT */}
        <div className="space-y-4">
          <div className="text-violet-500 font-mono text-xs uppercase tracking-wider border-l-2 border-violet-500 pl-3">
            Pane 3: The Architect
          </div>

          {/* Growth Thesis Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <h3 className="font-bold text-violet-500 font-mono mb-4">GROWTH THESIS</h3>
            
            <textarea
              value={growthThesis}
              onChange={(e) => setGrowthThesis(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 h-64 resize-none font-mono"
              placeholder="Synthesize findings from agents into a coherent growth strategy..."
            />
          </div>

          {/* Roadmap Generator */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <h3 className="font-bold text-violet-500 font-mono mb-4">MUST FIX ROADMAP</h3>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newMustFix}
                onChange={(e) => setNewMustFix(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMustFix.trim()) {
                    setMustFixItems([...mustFixItems, newMustFix.trim()]);
                    setNewMustFix("");
                  }
                }}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                placeholder="Add critical fix item..."
              />
              <button
                onClick={() => {
                  if (newMustFix.trim()) {
                    setMustFixItems([...mustFixItems, newMustFix.trim()]);
                    setNewMustFix("");
                  }
                }}
                className="px-4 py-2 bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold rounded transition-all"
              >
                +
              </button>
            </div>
            
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {mustFixItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-950 rounded border border-slate-800">
                  <span className="text-violet-500 font-mono font-bold text-sm">{i + 1}.</span>
                  <span className="text-slate-300 text-sm flex-1">{item}</span>
                  <button
                    onClick={() => setMustFixItems(mustFixItems.filter((_, idx) => idx !== i))}
                    className="text-red-500 hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Export Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleExport}
              className="w-full px-6 py-4 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-3 text-lg"
            >
              <Download className="w-5 h-5" />
              GENERATE BLUEPRINT
            </button>

            <button
              onClick={handleGammaExport}
              className="w-full px-6 py-4 bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-violet-500/20 flex items-center justify-center gap-3 text-lg"
            >
              <Copy className="w-5 h-5" />
              COPY GAMMA BLUEPRINT
            </button>

            <button
              onClick={handleWebPresentation}
              disabled={!companyName}
              className="w-full px-6 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Globe className="w-5 h-5" />
              GENERATE WEB PRESENTATION
            </button>
            {!companyName && (
              <p className="text-xs text-slate-500 text-center">Enter client name to generate presentation</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
