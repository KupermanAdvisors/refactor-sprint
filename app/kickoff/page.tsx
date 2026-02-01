"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, AlertCircle, AlertTriangle, Target } from "lucide-react";

interface ScriptContent {
  type: 'cue' | 'dialogue' | 'question' | 'note';
  text: string;
}

interface ProbeAssistant {
  redFlags: string[];
  pivotProbe: string;
}

interface ScriptSection {
  id: number;
  title: string;
  time: string;
  content: ScriptContent[];
  probeAssistant?: ProbeAssistant;
}

const SCRIPT_SECTIONS: ScriptSection[] = [
  {
    id: 1,
    title: "THE OPENING FRAME",
    time: "5 Minutes",
    content: [
      { type: "cue", text: "Set the stage. Establish authority. Demand brutal honesty." },
      { type: "dialogue", text: "\"Thanks for making the time. As you know, we have 72 hours to debug your revenue engine.\"" },
      { type: "dialogue", text: "\"To do that effectively, I need the unvarnished truth today. This hour isn't about selling me on your vision or giving me the investor pitch. I need to know what's broken.\"" },
      { type: "question", text: "Do I have your permission to be brutally honest in this session?" }
    ]
  },
  {
    id: 2,
    title: "Q1: THE TWO-SENTENCE TEST",
    time: "Strategic Disconnect Section",
    content: [
      { type: "cue", text: "Goal: Identify gap between who they want to be and who they are." },
      { type: "question", text: "\"If I forced you to describe your company's value in exactly two sentences—one for your grandmother, and one for your biggest competitor—what would they be?\"" },
      { type: "note", text: "(Look for: Jargon, complexity, hesitation.)" }
    ],
    probeAssistant: {
      redFlags: [
        "Uses more than 3 buzzwords (e.g., 'platform', 'end-to-end', 'synergy').",
        "Takes a paragraph to explain it.",
        "The explanation for grandma wouldn't actually make sense to her."
      ],
      pivotProbe: "\"Stop. That was six sentences and four buzzwords. Try again. Imagine your grandmother is holding a stopwatch. Go.\""
    }
  },
  {
    id: 3,
    title: "Q2: THE ASPIRATIONAL TRAP",
    time: "Strategic Disconnect Section",
    content: [
      { type: "question", text: "\"Who is the customer you *want* to sell to, and who is the customer that actually *buys* the fastest with the least friction?\"" },
      { type: "note", text: "(Look for: Mismatch between ideal and actual buyers.)" }
    ],
    probeAssistant: {
      redFlags: [
        "They claim they sell to 'everyone'.",
        "They focus entirely on the aspirational target and ignore who pays the bills today.",
        "Polite fiction: 'We are transitioning upmarket right now...'"
      ],
      pivotProbe: "\"I understand the goal. But look at your bank account today—who deposited the last five checks? Let's talk about *them*.\""
    }
  },
  {
    id: 4,
    title: "Q3: THE POSITIONING CONFLICT",
    time: "Strategic Disconnect Section",
    content: [
      { type: "question", text: "\"If I read your website homepage, your LinkedIn About section, and your latest sales deck—would I see three versions of the same company, or three different companies?\"" },
      { type: "note", text: "(This exposes narrative inconsistency.)" }
    ],
    probeAssistant: {
      redFlags: [
        "Defensive answer: 'They all say the same thing.'",
        "Blame game: 'Marketing hasn't updated the deck yet.'",
        "Avoiding the question entirely."
      ],
      pivotProbe: "\"Let's test it. Open your homepage right now. Read me the headline. Does that match what you just told your grandmother?\""
    }
  },
  {
    id: 5,
    title: "Q4: THE SOURCE OF TRUTH",
    time: "Revenue Reality Section",
    content: [
      { type: "cue", text: "Goal: Understand where money actually comes from vs. where they think it comes from." },
      { type: "question", text: "\"What percentage of your current revenue came from inbound leads vs. outbound prospecting vs. referrals/partnerships?\"" },
      { type: "note", text: "(Many founders overestimate inbound.)" }
    ],
    probeAssistant: {
      redFlags: [
        "They claim 70%+ inbound (unless they have a waitlist, this is unlikely).",
        "They can't answer with actual numbers.",
        "They say 'It's all inbound' but mention their sales team does outreach."
      ],
      pivotProbe: "\"Let's pull up your CRM right now. Filter by 'Closed Won' deals from the last quarter. What does the 'Lead Source' column say?\""
    }
  },
  {
    id: 6,
    title: "Q5: THE CHURN MIRROR",
    time: "Revenue Reality Section",
    content: [
      { type: "question", text: "\"Of the deals you *lost* in the last 6 months, what was the most common reason they gave you? And what do you think the *real* reason was?\"" },
      { type: "note", text: "(The gap between stated and actual objections is critical.)" }
    ],
    probeAssistant: {
      redFlags: [
        "'We don't lose deals' or 'Most say pricing.'",
        "Blame external factors: 'Budget freezes, timing.'",
        "Can't articulate the real reason beyond the polite rejection email."
      ],
      pivotProbe: "\"Pricing is what they *told* you. But if you offered a 50% discount tomorrow, would they all come back? If not, what's the real issue?\""
    }
  },
  {
    id: 7,
    title: "Q6: THE CAC CONFESSION",
    time: "Revenue Reality Section",
    content: [
      { type: "question", text: "\"If you calculated your true Customer Acquisition Cost—including all salaries, tools, ads, and time—what would one new customer actually cost you?\"" },
      { type: "note", text: "(Most haven't done this math honestly.)" }
    ],
    probeAssistant: {
      redFlags: [
        "Gives a number that sounds too low (e.g., '$500' for a B2B SaaS).",
        "Only counts ad spend, ignoring salaries.",
        "Says 'We don't track that yet.'"
      ],
      pivotProbe: "\"Let's do rough math together. What do you pay your sales team annually? How many deals did they close last year? Start there.\""
    }
  },
  {
    id: 8,
    title: "Q7: THE THREE-PERSON PROBLEM",
    time: "Team Tension Section",
    content: [
      { type: "cue", text: "Goal: Surface internal misalignment between CEO, Sales, and Marketing." },
      { type: "question", text: "\"If I interviewed your Head of Sales and your Head of Marketing separately and asked them 'Who is your ideal customer?'—would they give me the same answer?\"" },
      { type: "note", text: "(This is almost always 'No.')" }
    ],
    probeAssistant: {
      redFlags: [
        "Claims 'Yes' with confidence (rarely true unless they meet weekly).",
        "Hedges: 'Mostly aligned' or 'We're working on it.'",
        "Blames one side: 'Marketing gets it, Sales doesn't.'"
      ],
      pivotProbe: "\"Let's call them both right now. I'll ask the question on speaker and we'll see what happens.\""
    }
  },
  {
    id: 9,
    title: "Q8: THE SALES/MARKETING RIFT",
    time: "Team Tension Section",
    content: [
      { type: "question", text: "\"On a scale of 1 to 10, how much does your Sales Leader trust the leads coming from Marketing right now? Why isn't it a 10?\"" }
    ],
    probeAssistant: {
      redFlags: [
        "Anything 8 or above (unless revenue is skyrocketing, they are lying to protect feelings).",
        "Vague answers like 'They collaborate well.'",
        "Can't articulate why it's not a 10."
      ],
      pivotProbe: "\"If it's an 8, why aren't you at 150% of quota? Let's be real. What's the one complaint Sales always makes about Marketing after a couple of drinks?\""
    }
  },
  {
    id: 10,
    title: "Q9: THE CRM AUDIT",
    time: "Broken Systems Section",
    content: [
      { type: "cue", text: "Goal: Identify technical and operational debt." },
      { type: "question", text: "\"If I logged into your CRM right now, what percentage of deals would have complete, accurate notes? What percentage would be marked with the wrong stage or outdated info?\"" },
      { type: "note", text: "(Data hygiene reveals process discipline.)" }
    ],
    probeAssistant: {
      redFlags: [
        "Claims 90%+ accuracy (inspect it live to verify).",
        "'Our team is good about updating it' (vague).",
        "Blames the CRM: 'Salesforce is clunky.'"
      ],
      pivotProbe: "\"Let's spot-check. Pull up a random deal from last month. Read me the notes. Does that tell the full story or is it just timestamps?\""
    }
  },
  {
    id: 11,
    title: "Q10: THE ATTRIBUTION BLINDSPOT",
    time: "Broken Systems Section",
    content: [
      { type: "question", text: "\"Can you tell me—with certainty—which marketing channel generated your last three closed deals?\"" },
      { type: "note", text: "(Most can't. This is the technical debt killing growth.)" }
    ],
    probeAssistant: {
      redFlags: [
        "Says 'Yes' but then can't name the actual channels.",
        "'We think it was [channel]' (guessing).",
        "'Attribution is hard' (true, but that's the problem)."
      ],
      pivotProbe: "\"Open your CRM. Go to the last deal you closed. What does the 'Lead Source' field say? Is that accurate or a guess?\""
    }
  },
  {
    id: 12,
    title: "THE CLOSING COMMITMENT",
    time: "5 Minutes",
    content: [
      { type: "cue", text: "Set expectations for the sprint. Define success." },
      { type: "dialogue", text: "\"Here's what happens next. Over the next 48 hours, my team will analyze your CRM data, audit your competitive landscape, and map the gaps between your story and your reality.\"" },
      { type: "dialogue", text: "\"On Day 3, I'll deliver a remediation roadmap—a prioritized list of what's broken and exactly how to fix it.\"" },
      { type: "question", text: "Final Question: If we solve only ONE thing in this sprint, what would have the biggest impact on your ability to scale?" },
      { type: "note", text: "(This defines the anchor metric for the entire engagement.)" }
    ]
  }
];

export default function KickoffDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [showProbeAssistant, setShowProbeAssistant] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isTimerRunning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === ' ' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        // Toggle probe assistant if current slide has one
        if (currentSection.probeAssistant) {
          setShowProbeAssistant(prev => !prev);
        } else {
          // Otherwise toggle timer
          setIsTimerRunning(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < SCRIPT_SECTIONS.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setShowProbeAssistant(false); // Reset when changing slides
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setShowProbeAssistant(false); // Reset when changing slides
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const minutes = timeRemaining / 60;
    if (minutes <= 5) return 'text-red-500';
    if (minutes <= 10) return 'text-amber-500';
    return 'text-green-500';
  };

  const currentSection = SCRIPT_SECTIONS[currentSlide];
  const progress = ((currentSlide + 1) / SCRIPT_SECTIONS.length) * 100;

  return (
    <div className="h-screen bg-slate-950 text-slate-50 overflow-hidden flex">
      {/* LEFT COLUMN - Script Presenter */}
      <div className="w-[70%] flex flex-col border-r border-slate-800">
        {/* Top Navigation Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/app"
              className="text-slate-400 hover:text-cyan-500 transition-colors text-sm font-mono flex items-center gap-2"
              title="Return to Command Center"
            >
              ← Command Center
            </a>
            <div className="text-slate-700">|</div>
            <div className="text-sm font-mono text-slate-400">
              Refactor Sprint: Day 1 Executive Deposition
            </div>
          </div>
          
          {/* Countdown Timer */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all ${getTimerColor()}`}
          >
            <Clock className="w-6 h-6" />
            <span className="text-4xl font-bold font-mono">{formatTime(timeRemaining)}</span>
          </button>

          <div className="text-sm font-mono text-slate-400 text-right">
            <div>Section Progress: <span className="text-cyan-500 font-bold">{currentSlide + 1} of {SCRIPT_SECTIONS.length}</span></div>
            <div className="text-slate-600">Allocated: {currentSection.time}</div>
          </div>
        </div>

        {/* Script Card Area */}
        <div className="flex-1 overflow-y-auto p-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full"
            >
              {/* Section Title */}
              <h1 className="text-5xl font-bold mb-8 text-slate-100 leading-tight">
                {currentSection.title}
              </h1>

              {/* Section Content */}
              <div className="space-y-6">
                {currentSection.content.map((item, i) => (
                  <div key={i}>
                    {item.type === 'cue' && (
                      <div className="text-cyan-500 text-lg italic mb-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-1 flex-shrink-0" />
                        <span>{item.text}</span>
                      </div>
                    )}
                    
                    {item.type === 'dialogue' && (
                      <p className="text-2xl leading-relaxed text-slate-200 mb-4">
                        {item.text}
                      </p>
                    )}
                    
                    {item.type === 'question' && (
                      <div className="bg-slate-800/50 border-l-4 border-violet-500 p-6 rounded-r-lg">
                        <p className="text-2xl font-semibold text-slate-100 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    )}
                    
                    {item.type === 'note' && (
                      <p className="text-base italic text-slate-500 ml-8">
                        {item.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Probe Assistant Toggle Button */}
              {currentSection.probeAssistant && (
                <div className="mt-8">
                  <button
                    onClick={() => setShowProbeAssistant(!showProbeAssistant)}
                    className="w-full px-6 py-3 bg-orange-500/10 hover:bg-orange-500/20 border-2 border-orange-500/50 hover:border-orange-500 rounded-lg transition-all flex items-center justify-center gap-3 text-orange-500 font-semibold"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    <span>{showProbeAssistant ? 'Hide' : 'Show'} Probe Assistant</span>
                    <span className="text-xs font-mono opacity-75">(SPACEBAR)</span>
                  </button>
                </div>
              )}

              {/* Probe Assistant Content */}
              <AnimatePresence>
                {showProbeAssistant && currentSection.probeAssistant && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 overflow-hidden"
                  >
                    <div className="bg-orange-900/20 border-2 border-orange-500 rounded-lg p-6 space-y-6">
                      {/* Red Flags */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <AlertTriangle className="w-6 h-6 text-orange-500" />
                          <h3 className="text-xl font-bold text-orange-500">Red Flag Answers</h3>
                        </div>
                        <ul className="space-y-2">
                          {currentSection.probeAssistant.redFlags.map((flag, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300">
                              <span className="text-orange-500 mt-1">⚠️</span>
                              <span className="text-lg">{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pivot Probe */}
                      <div className="pt-6 border-t border-orange-500/30">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="w-6 h-6 text-cyan-500" />
                          <h3 className="text-xl font-bold text-cyan-500">The Pivot Probe</h3>
                        </div>
                        <div className="bg-slate-800/50 border-l-4 border-cyan-500 p-5 rounded-r-lg">
                          <p className="text-2xl font-semibold text-cyan-100 leading-relaxed">
                            {currentSection.probeAssistant.pivotProbe}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-slate-900 border-t border-slate-800 px-8 py-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-mono text-sm">Previous</span>
            </button>

            <div className="text-slate-500 font-mono text-sm">
              Slide {currentSlide + 1} of {SCRIPT_SECTIONS.length}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === SCRIPT_SECTIONS.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all font-semibold"
            >
              <span className="font-mono text-sm">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 text-center text-xs text-slate-600 font-mono">
            Keyboard: ← → to navigate | SPACE to {currentSection.probeAssistant ? 'toggle probe assistant' : 'start/pause timer'}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Data Capture */}
      <div className="w-[30%] flex flex-col bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-300">Live Notes</h2>
          <p className="text-xs text-slate-500 mt-1">Capture key insights per section</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {SCRIPT_SECTIONS.map((section, i) => (
            <div
              key={i}
              className={`border rounded-lg transition-all ${
                i === currentSlide
                  ? 'border-cyan-500 bg-cyan-500/5'
                  : 'border-slate-800 bg-slate-800/30'
              }`}
            >
              <div className="px-4 py-2 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-slate-300">{section.title}</h3>
              </div>
              <textarea
                value={notes[i] || ''}
                onChange={(e) => setNotes({ ...notes, [i]: e.target.value })}
                placeholder="Notes from this section..."
                className="w-full p-4 bg-transparent text-sm text-slate-400 placeholder-slate-600 focus:outline-none resize-none"
                rows={4}
              />
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 px-6 py-4">
          <button
            onClick={() => {
              const notesText = SCRIPT_SECTIONS.map((section, i) => 
                `${section.title}\n${'='.repeat(section.title.length)}\n${notes[i] || '[No notes captured]'}\n`
              ).join('\n\n');
              
              const blob = new Blob([notesText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `kickoff-notes-${new Date().toISOString().split('T')[0]}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-all"
          >
            Export Notes
          </button>
        </div>
      </div>
    </div>
  );
}
