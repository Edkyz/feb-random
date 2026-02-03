"use client";

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react";

const YOUR_NAME = "Your Secret Admirer";

const TOAST_MESSAGES = [
  "Nice try",
  "404: No not found",
  "Your No request has been rate-limited",
  "This button is in its villain arc",
  "The council has rejected your appeal",
  "Skill issue detected",
  "Connection refused",
  "This is not the way",
];

const NO_BUTTON_STAGES = [
  "No",
  "No (u sure?)",
  "No (lies detected)",
  "No (skill issue)",
  "No (the council said nah)",
  "No (pls dont)",
  "No (system override)",
  "No (patched out)",
];

const PATCH_NOTES = [
  "Patch 1.0: Added feelings",
  "Patch 1.1: Feelings are now mandatory",
  "Hotfix: Removed ability to say no",
  "Patch 1.2: No button nerfed",
  "Balance change: Yes button now OP",
  "Patch 1.3: Added more rizz",
  "Emergency fix: Heartbreak prevention",
  "Final patch: No has been deprecated",
];

function FloatingHearts({ speed = 1 }: { speed?: number }) {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const items = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: (10 + Math.random() * 10) / speed,
      delay: Math.random() * 5,
    }));
    setHearts(items);
  }, [speed]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-pink-300 text-2xl animate-float-heart"
          style={{
            left: `${h.x}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {"\u2665"}
        </span>
      ))}
    </div>
  );
}

function ConfettiExplosion({ trigger }: { trigger: number }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([]);

  useEffect(() => {
    if (trigger > 0) {
      const colors = ["#ff6b6b", "#ff8787", "#ffa8a8", "#ffc9c9"];
      const newParticles = Array.from({ length: 25 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
      }, 3500);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-2xl animate-confetti"
          style={{ left: `${p.x}%`, animationDelay: `${p.delay}s`, color: p.color }}
        >
          {"\u2665"}
        </span>
      ))}
    </div>
  );
}

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-in-toast">
      <div className="bg-white border-2 border-pink-300 rounded-2xl px-6 py-3 shadow-lg">
        <p className="text-pink-600 font-semibold text-center">{message}</p>
      </div>
    </div>
  );
}

function PatchNotesPanel({ attempts }: { attempts: number }) {
  const visibleNotes = PATCH_NOTES.slice(0, Math.min(attempts + 1, PATCH_NOTES.length));
  return (
    <div className="bg-white/80 rounded-xl p-4 border-2 border-pink-200 shadow-lg max-w-xs">
      <h3 className="text-pink-600 font-bold text-sm mb-2">Patch Notes v1.4</h3>
      <ul className="text-xs text-pink-500 space-y-1">
        {visibleNotes.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

function MoodMeter({ attempts }: { attempts: number }) {
  const moods = [
    { emoji: ":-)", label: "Calm" },
    { emoji: ":-O", label: "Concerned" },
    { emoji: ":-S", label: "Sweating" },
    { emoji: ":-(", label: "Panicking" },
    { emoji: "<3", label: "Ferally in love" },
  ];
  const moodIndex = Math.min(Math.floor(attempts / 2), moods.length - 1);
  const mood = moods[moodIndex];

  return (
    <div className="flex items-center gap-2 text-pink-600">
      <span className="text-sm font-medium">Mood:</span>
      <span className={`text-lg font-mono ${attempts > 4 ? "animate-wiggle" : ""}`}>{mood.emoji}</span>
      <span className="text-xs text-pink-400">({mood.label})</span>
    </div>
  );
}

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState<string | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [kissCount, setKissCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const noButtonPatched = attempts >= 8;

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setNoButtonPos({ x: newX, y: newY });
    const randomToast = TOAST_MESSAGES[Math.floor(Math.random() * TOAST_MESSAGES.length)];
    setToast(randomToast);
    setAttempts((prev) => prev + 1);
  }, []);

  const handleNoHover = useCallback(() => {
    if (!noButtonPatched) moveNoButton();
  }, [noButtonPatched, moveNoButton]);

  const handleNoTouch = useCallback(
    (e: React.TouchEvent<HTMLButtonElement>) => {
      if (!noButtonPatched) {
        e.preventDefault();
        moveNoButton();
      }
    },
    [noButtonPatched, moveNoButton]
  );

  const handleNoKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!noButtonPatched && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        moveNoButton();
      }
    },
    [noButtonPatched, moveNoButton]
  );

  const handleYes = () => {
    setAccepted(true);
    setConfettiTrigger((prev) => prev + 1);
  };

  const handleKiss = () => {
    setKissCount((prev) => prev + 1);
    setConfettiTrigger((prev) => prev + 1);
  };

  const handleRestart = () => {
    setAccepted(false);
    setAttempts(0);
    setNoButtonPos({ x: 0, y: 0 });
    setKissCount(0);
  };

  const getNoButtonText = () => {
    if (noButtonPatched) return "YES!!!";
    return NO_BUTTON_STAGES[Math.min(attempts, NO_BUTTON_STAGES.length - 1)];
  };

  const heartSpeed = 1 + attempts * 0.1;

  if (accepted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <FloatingHearts speed={2} />
        <ConfettiExplosion trigger={confettiTrigger} />

        <div className="fixed top-4 left-4 bg-white/90 rounded-full px-4 py-2 border-2 border-pink-300 shadow-lg -rotate-6 hidden md:block">
          <span className="text-pink-600 font-bold text-sm">W SECURED</span>
        </div>

        <div className="bg-white/95 rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300 max-w-lg w-full text-center z-10 animate-pulse-love">
          <div className="text-6xl text-pink-500 mb-4">{"\u2665"}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 text-balance">
            W RIZZ CONFIRMED
          </h1>
          <p className="text-pink-500 text-lg mb-6">The prophecy is fulfilled. We did it.</p>

          <div className="relative inline-block mb-8">
            <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 rounded-2xl p-1">
              <div className="bg-white rounded-xl px-6 py-4 relative overflow-hidden">
                <div className="animate-badge-shine absolute inset-0" />
                <p className="text-pink-600 font-bold text-lg relative z-10">
                  Feb 14 - Laura + {YOUR_NAME}
                </p>
                <p className="text-pink-400 text-sm relative z-10">Official Valentine Certificate</p>
              </div>
            </div>
          </div>

          {kissCount > 0 && <p className="text-pink-400 text-sm mb-4">Extra kisses: {kissCount}</p>}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={handleKiss}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
            >
              One more kiss
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="bg-white text-pink-500 font-bold py-3 px-8 rounded-full text-lg border-2 border-pink-300 shadow-lg hover:scale-105 transition-transform"
            >
              Restart (but why?)
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts speed={heartSpeed} />
      <ConfettiExplosion trigger={confettiTrigger} />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="fixed top-4 left-4 bg-white/90 rounded-full px-4 py-2 border-2 border-pink-300 shadow-lg -rotate-6 hidden md:block">
        <span className="text-pink-600 font-bold text-sm">Certified Lover Boy (unverified)</span>
      </div>

      <div className="fixed bottom-4 right-4 bg-white/90 rounded-full px-4 py-2 border-2 border-pink-300 shadow-lg rotate-6 hidden md:block">
        <span className="text-pink-600 font-bold text-sm">Emotionally Supportive Website</span>
      </div>

      <div className="fixed top-4 right-4 hidden lg:block">
        <PatchNotesPanel attempts={attempts} />
      </div>

      <div className="bg-white/95 rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-pink-300 max-w-lg w-full text-center z-10">
        <div className="text-5xl text-pink-500 mb-4 animate-pulse-love">{"\u2665"}</div>
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4 text-balance">
          Laura, will you be my Valentine this February 14?
        </h1>
        <p className="text-pink-400 text-lg mb-8">I coded this because my feelings have no chill.</p>

        <div ref={containerRef} className="relative h-32 md:h-40 w-full mb-6">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-4">
            <button
              type="button"
              onClick={handleYes}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:scale-110 transition-transform z-20"
            >
              Yes {"\u2665"}
            </button>

            {noButtonPatched && (
              <button
                type="button"
                onClick={handleYes}
                className="bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:scale-110 transition-transform z-20 animate-wiggle"
              >
                YES!!!
              </button>
            )}
          </div>

          {!noButtonPatched && (
            <button
              ref={noButtonRef}
              type="button"
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoTouch}
              onKeyDown={handleNoKeyDown}
              onClick={(e) => {
                e.preventDefault();
                moveNoButton();
              }}
              className={`absolute bg-white text-pink-400 font-bold py-4 px-8 rounded-full text-xl border-2 border-pink-200 shadow-lg transition-all z-10 whitespace-nowrap ${attempts > 5 ? "animate-panic-shake" : ""} ${attempts > 3 ? "animate-wiggle" : ""}`}
              style={{
                transform: `translate3d(${noButtonPos.x}px, ${noButtonPos.y}px, 0)`,
                transitionDuration: `${Math.max(150 - attempts * 15, 50)}ms`,
              }}
            >
              {getNoButtonText()}
            </button>
          )}
        </div>

        <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-pink-600 font-bold">
              No attempts: <span className={attempts > 5 ? "text-red-500" : ""}>{attempts}</span>
              {attempts > 0 && (
                <span className="text-pink-400 text-sm ml-2">
                  {attempts >= 8 ? "(No has been patched out)" : attempts >= 5 ? "(just give up)" : "(resistance is futile)"}
                </span>
              )}
            </div>
            <MoodMeter attempts={attempts} />
          </div>
        </div>

        <div className="mt-4 lg:hidden">
          <details className="text-left">
            <summary className="text-pink-500 font-medium cursor-pointer text-sm">View Patch Notes</summary>
            <div className="mt-2">
              <PatchNotesPanel attempts={attempts} />
            </div>
          </details>
        </div>
      </div>

      <p className="mt-6 text-pink-500 text-sm text-center max-w-md z-10">
        This website was built with maximum cheese and zero shame. Side effects may include butterflies, blushing, and
        the inability to say no.
      </p>
    </main>
  );
}
