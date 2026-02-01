"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Download, ExternalLink, Calendar, FileText, Upload, ChevronDown, ChevronRight } from "lucide-react";
import { toast, Toaster } from "sonner";

interface Sprint {
  id: string;
  client_name: string;
  sprint_name: string;
  created_at: string;
  updated_at: string;
  status: string;
  presentation_slug: string;
}

interface GroupedSprints {
  [clientName: string]: Sprint[];
}

export default function ArchivePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loadingSprints, setLoadingSprints] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set());

  const CORRECT_PASSWORD = "popcorn";

  useEffect(() => {
    const authStatus = sessionStorage.getItem("refactor-sprint-auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
      loadSprints();
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("refactor-sprint-auth", "authenticated");
      setIsAuthenticated(true);
      loadSprints();
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const loadSprints = async () => {
    setLoadingSprints(true);
    try {
      const response = await fetch('/api/sprints/list');
      const data = await response.json();
      if (data.success) {
        setSprints(data.sprints);
        // Auto-expand all clients initially
        const allClients = new Set(data.sprints.map((s: Sprint) => s.client_name));
        setExpandedClients(allClients);
      } else {
        toast.error("Failed to load sprints");
      }
    } catch (error) {
      toast.error("Error loading sprints");
    }
    setLoadingSprints(false);
  };

  const toggleClient = (clientName: string) => {
    setExpandedClients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clientName)) {
        newSet.delete(clientName);
      } else {
        newSet.add(clientName);
      }
      return newSet;
    });
  };

  // Group sprints by client
  const groupedSprints: GroupedSprints = sprints.reduce((acc, sprint) => {
    if (!acc[sprint.client_name]) {
      acc[sprint.client_name] = [];
    }
    acc[sprint.client_name].push(sprint);
    return acc;
  }, {} as GroupedSprints);

  // Sort clients alphabetically
  const sortedClients = Object.keys(groupedSprints).sort();

  const handleDownload = async (sprintId: string, clientName: string) => {
    setDownloadingId(sprintId);
    try {
      const response = await fetch('/api/sprints/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sprintId }),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${clientName.replace(/[^a-z0-9]/gi, '-')}-sprint.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Sprint downloaded!");
    } catch (error) {
      toast.error("Failed to download sprint");
    }
    setDownloadingId(null);
  };

  const handleLoadSprint = async (sprintId: string, clientName: string, sprintName: string) => {
    try {
      const response = await fetch('/api/sprints/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sprintId }),
      });

      const data = await response.json();

      if (data.success) {
        // Store in sessionStorage to restore in Command Center
        sessionStorage.setItem('loadedSprint', JSON.stringify(data.sprint));
        toast.success(`Loading "${sprintName}"...`);
        
        // Navigate to Command Center
        setTimeout(() => {
          window.location.href = '/app';
        }, 500);
      } else {
        toast.error("Failed to load sprint");
      }
    } catch (error) {
      toast.error("Error loading sprint");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("refactor-sprint-auth");
    setIsAuthenticated(false);
    setPassword("");
    setSprints([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
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
              <img
                src="/refaclogo.png"
                alt="The Refactor Sprint"
                className="h-16 w-auto"
              />
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Sprint Archive</h1>
              <p className="text-slate-400">Enter password to access</p>
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
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-50 pr-12 font-mono"
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
                ACCESS ARCHIVE
              </button>
            </form>

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img src="/refaclogo.png" alt="Refactor Sprint" className="h-8" />
            <span className="text-slate-500 font-mono text-sm">/ archive</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="/app"
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Command Center
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Sprint Archive</h1>
            <p className="text-xl text-slate-400">
              All completed Refactor Sprint diagnostics and presentations
            </p>
          </div>

          {loadingSprints ? (
            <div className="text-center py-12">
              <div className="text-slate-400">Loading sprints...</div>
            </div>
          ) : sprints.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No sprints yet</h3>
              <p className="text-slate-400 mb-6">
                Complete a sprint in the Command Center to see it archived here.
              </p>
              <a
                href="/app"
                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-lg transition-all"
              >
                Go to Command Center
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedClients.map((clientName) => {
                const clientSprints = groupedSprints[clientName];
                const isExpanded = expandedClients.has(clientName);
                const sprintCount = clientSprints.length;

                return (
                  <div key={clientName} className="border border-slate-800 rounded-xl overflow-hidden">
                    {/* Client Header - Clickable */}
                    <button
                      onClick={() => toggleClient(clientName)}
                      className="w-full bg-slate-900 hover:bg-slate-850 transition-all p-6 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {isExpanded ? (
                          <ChevronDown className="w-6 h-6 text-cyan-500" />
                        ) : (
                          <ChevronRight className="w-6 h-6 text-slate-500" />
                        )}
                        <div className="text-left">
                          <h3 className="text-2xl font-bold text-slate-100">{clientName}</h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {sprintCount} {sprintCount === 1 ? 'sprint' : 'sprints'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">
                        {isExpanded ? 'Click to collapse' : 'Click to expand'}
                      </span>
                    </button>

                    {/* Sprint List - Collapsible */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-slate-950 p-4 space-y-3">
                            {clientSprints.map((sprint) => (
                              <motion.div
                                key={sprint.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-all"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                      {sprint.sprint_name && (
                                        <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-sm font-mono font-semibold">
                                          {sprint.sprint_name}
                                        </span>
                                      )}
                                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                                        sprint.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                                        sprint.status === 'draft' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-slate-700 text-slate-400'
                                      }`}>
                                        {sprint.status}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-400">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Created: {new Date(sprint.created_at).toLocaleDateString()}
                                      </div>
                                      {sprint.updated_at && sprint.updated_at !== sprint.created_at && (
                                        <div className="flex items-center gap-2">
                                          Updated: {new Date(sprint.updated_at).toLocaleDateString()}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleLoadSprint(sprint.id, sprint.client_name, sprint.sprint_name)}
                                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2 text-sm"
                                      title="Load this sprint into Command Center"
                                    >
                                      <Upload className="w-4 h-4" />
                                      Load
                                    </button>

                                    <button
                                      onClick={() => handleDownload(sprint.id, sprint.client_name)}
                                      disabled={downloadingId === sprint.id}
                                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                      title="Download ZIP with all files"
                                    >
                                      <Download className="w-4 h-4" />
                                      {downloadingId === sprint.id ? 'Downloading...' : 'ZIP'}
                                    </button>

                                    <a
                                      href={`/presentation/${sprint.presentation_slug}`}
                                      className="px-4 py-2 bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2 text-sm"
                                      title="View web presentation"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Present
                                    </a>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
