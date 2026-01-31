"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Download, ExternalLink, Calendar, FileText } from "lucide-react";
import { toast, Toaster } from "sonner";

interface Sprint {
  id: string;
  client_name: string;
  created_at: string;
  status: string;
  presentation_slug: string;
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
      } else {
        toast.error("Failed to load sprints");
      }
    } catch (error) {
      toast.error("Error loading sprints");
    }
    setLoadingSprints(false);
  };

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
            <div className="space-y-4">
              {sprints.map((sprint) => (
                <motion.div
                  key={sprint.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{sprint.client_name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(sprint.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-mono ${
                            sprint.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                            sprint.status === 'draft' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-slate-700 text-slate-400'
                          }`}>
                            {sprint.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDownload(sprint.id, sprint.client_name)}
                        disabled={downloadingId === sprint.id}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="w-4 h-4" />
                        {downloadingId === sprint.id ? 'Downloading...' : 'Download ZIP'}
                      </button>

                      <a
                        href={`/presentation/${sprint.presentation_slug}`}
                        className="px-4 py-2 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Presentation
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
