"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-2xl p-8 border border-slate-800">
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
              <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-accent-cyan" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Refactor Sprint App</h1>
              <p className="text-slate-400">Enter password to access</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent text-slate-50 pr-12"
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
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-cyan hover:bg-cyan-500 text-slate-900 font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20"
              >
                Access App
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-slate-400 hover:text-accent-cyan transition-colors"
              >
                ← Back to Refactor Sprint
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Protected App Content
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/refaclogo.png"
              alt="The Refactor Sprint"
              className="h-[40px] w-auto"
            />
            <span className="text-slate-400 text-sm font-mono">/ app</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">Refactor Sprint App</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Your project management and operating system for executing the Refactor Sprint process.
          </p>

          {/* Placeholder Content */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="glass rounded-xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold mb-4 text-accent-cyan">Sprint Dashboard</h2>
              <p className="text-slate-400">
                View and manage your active Refactor Sprints. Track progress through the 3-day process.
              </p>
            </div>

            <div className="glass rounded-xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold mb-4 text-accent-violet">Client Portal</h2>
              <p className="text-slate-400">
                Access client information, deliverables, and communication history.
              </p>
            </div>

            <div className="glass rounded-xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold mb-4 text-accent-cyan">Process Templates</h2>
              <p className="text-slate-400">
                Standardized workflows for Ingestion, Refactoring, and Delivery phases.
              </p>
            </div>

            <div className="glass rounded-xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold mb-4 text-accent-violet">Analytics</h2>
              <p className="text-slate-400">
                Track sprint outcomes, client satisfaction, and process improvements.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl">
            <p className="text-sm text-slate-300">
              <strong>Coming Soon:</strong> This is the foundation for your Refactor Sprint operating system. 
              Ready to build out the full functionality when you're ready to share the process details.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
