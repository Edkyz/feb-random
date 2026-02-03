"use client";

import React from "react"

import { useState, useRef, useEffect, useCallback } from "react";

// 🎯 CONFIGURE YOUR NAME HERE, LEGEND
const YOUR_NAME = "Your Secret Admirer";

// 💬 Toast messages for when they try to click No (nice try bestie)
const TOAST_MESSAGES = [
  "Nice try 😌",
  "Access denied: heartbreak prevention system",
  "404: No not found",
  "Your 'No' request has been rate-limited",
  "This button is in its villain arc",
  "Error: consent.exe has stopped working",
  "The council has rejected your appeal",
  "Skill issue detected 💀",
  "Connection refused: port 💔 is blocked",
  "This is not the way, fam",
];

// 📝 No button text progression (the descent into chaos)
const NO_BUTTON_STAGES = [
  "No 🙃",
  "No (u sure?)",
  "No (lies detected)",
  "No (skill issue)",
  "No (the council said nah)",
  "No (pls don't, I'm baby) 🥺",
  "No (system override)",
  "No (patched out v1.4.14)",
];

// 🩹 Patch notes that update as they resist the inevitable
const PATCH_NOTES = [
  "Patch 1.0: Added feelings",
  "Patch 1.1: Feelings are now mandatory",
  "Hotfix: Removed ability to say no",
  "Patch 1.2: No button nerfed (again)",
  "Balance change: Yes button now OP",
  "Patch 1.3: Added more rizz",
  "Emergency fix: Heartbreak prevention enabled",
  "Patch 1.4: No button scheduled for removal",
  "Final patch: No has been deprecated",
];

// 😊 Mood progression
const MOODS = [
  { emoji: "😌", label: "Calm" },
  { emoji: "😳", label: "Concerned" },
  { emoji: "😰", label: "Sweating" },
  { emoji: "😭", label: "Panicking" },
  { emoji: "💞", label: "Ferally in love" },
];

// ============================================
// 💕 FLOATING HEARTS BACKGROUND COMPONENT
// ============================================
function FloatingHearts({ speed = 1 }: { speed?: number }) {
  const hearts = ["💕", "💖", "💗", "💓", "💘", "❤️", "💝", "✨", "🌟", "💫"];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl animate-float-heart opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${(8 + Math.random() * 8) / speed}s`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${1 + Math.random() * 1.5}rem`,
          }}
        >
          {hearts[i % hearts.length]}
        </span>
      ))}
    </div>
  );
}

// ============================================
// 🎉 CONFETTI EXPLOSION COMPONENT
// ============================================
function ConfettiExplosion({ trigger }: { trigger: number }) {
  const [particles, setParticles] = useState<
    Array<{ id: number; emoji: string; x: number; delay: number }>
  >([]);

  useEffect(() => {
    if (trigger > 0) {
      const emojis = ["💖", "💕", "💗", "💓", "🎉", "✨", "🌟", "💘", "💝", "❤️"];
      const newParticles = Array.from({ length: 30 }).map((_, i) => ({
        id: Date.now() + i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setParticles((prev) => [...prev, ...newParticles]);

      // Clean up old particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
      }, 3500);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute text-3xl animate-confetti"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </span>
      ))}
    </div>
  );
}

// ============================================
// 🍞 TOAST NOTIFICATION COMPONENT
// ============================================
function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-in-toast">
      <div className="bg-white/95 backdrop-blur-sm border-2 border-pink-300 rounded-2xl px-6 py-3 shadow-lg">
        <p className="text-pink-600 font-semibold text-center">{message}</p>
      </div>
    </div>
  );
}

// ============================================
// 📊 PATCH NOTES PANEL COMPONENT
// ============================================
function PatchNotesPanel({ attempts }: { attempts: number }) {
  const visibleNotes = PATCH_NOTES.slice(0, Math.min(attempts + 1, PATCH_NOTES.length));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-pink-200 shadow-lg max-w-xs">
      <h3 className="text-pink-600 font-bold text-sm mb-2 flex items-center gap-2">
        📋 Patch Notes v1.4.14
      </h3>
      <ul className="text-xs text-pink-500 space-y-1">
        {visibleNotes.map((note, i) => (
          <li key={i} className="flex items-start gap-1">
            <span>•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// 😊 MOOD METER COMPONENT
// ============================================
function MoodMeter({ attempts }: { attempts: number }) {
  const moodIndex = Math.min(Math.floor(attempts / 2), MOODS.length - 1);
  const mood = MOODS[moodIndex];

  return (
    <div className="flex items-center gap-2 text-pink-600">
      <span className="text-sm font-medium">Mood:</span>
      <span
        className={`text-2xl ${attempts > 4 ? "animate-wiggle" : ""}`}
        role="img"
        aria-label={mood.label}
      >
        {mood.emoji}
      </span>
      <span className="text-xs text-pink-400">({mood.label})</span>
    </div>
  );
}

// ============================================
// 🎯 MAIN VALENTINE COMPONENT
// ============================================
export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [toast, setToast] = useState<string | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [kissCount, setKissCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // 🎯 The "No" button has been patched out after 8 attempts
  const noButtonPatched = attempts >= 8;

  // 📏 Calculate safe random position within container bounds
  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate max positions (with padding)
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;

    // More chaos = more dramatic movement
    const chaos = Math.min(attempts + 1, 8);
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPos({ x: newX, y: newY });

    // Show a meme toast
    const randomToast =
      TOAST_MESSAGES[Math.floor(Math.random() * TOAST_MESSAGES.length)];
    setToast(randomToast);

    setAttempts((prev) => prev + 1);
  }, [attempts]);

  // 🖱️ Handle No button hover (desktop)
  const handleNoHover = useCallback(() => {
    if (!noButtonPatched) {
      moveNoButton();
    }
  }, [noButtonPatched, moveNoButton]);

  // 👆 Handle No button touch (mobile)
  const handleNoTouch = useCallback(
    (e: React.TouchEvent) => {
      if (!noButtonPatched) {
        e.preventDefault();
        moveNoButton();
      }
    },
    [noButtonPatched, moveNoButton]
  );

  // ⌨️ Handle keyboard - No button escapes on Enter/Space too!
  const handleNoKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!noButtonPatched && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        moveNoButton();
      }
    },
    [noButtonPatched, moveNoButton]
  );

  // 💖 Handle Yes click - THE WINNING PATH
  const handleYes = () => {
    setAccepted(true);
    setConfettiTrigger((prev) => prev + 1);
  };

  // 😘 Handle extra kiss
  const handleKiss = () => {
    setKissCount((prev) => prev + 1);
    setConfettiTrigger((prev) => prev + 1);
  };

  // 🔄 Handle restart (but why would you??)
  const handleRestart = () => {
    setAccepted(false);
    setAttempts(0);
    setNoButtonPos({ x: 0, y: 0 });
    setKissCount(0);
  };

  // Get current No button text
  const getNoButtonText = () => {
    if (noButtonPatched) return "YES!!! 💘💍";
    return NO_BUTTON_STAGES[Math.min(attempts, NO_BUTTON_STAGES.length - 1)];
  };

  // Calculate animation speed based on attempts
  const heartSpeed = 1 + attempts * 0.1;

  // ============================================
  // 🎉 ACCEPTANCE SCREEN
  // ============================================
  if (accepted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <FloatingHearts speed={2} />
        <ConfettiExplosion trigger={confettiTrigger} />

        {/* Side stickers */}
        <div className="fixed top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-pink-300 shadow-lg transform -rotate-6 hidden md:block">
          <span className="text-pink-600 font-bold text-sm">W SECURED ✅</span>
        </div>

        <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-pink-300 shadow-lg transform rotate-6 hidden md:block">
          <span className="text-pink-600 font-bold text-sm">
            Emotionally Victorious 🏆
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300 max-w-lg w-full text-center z-10 animate-pulse-love">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 text-balance">
            W RIZZ CONFIRMED ✅💘
          </h1>

          <p className="text-pink-500 text-lg mb-6">
            The prophecy is fulfilled. We did it. 🥹
          </p>

          {/* Badge */}
          <div className="relative inline-block mb-8">
            <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 rounded-2xl p-1">
              <div className="bg-white rounded-xl px-6 py-4 relative overflow-hidden">
                <div className="animate-badge-shine absolute inset-0" />
                <p className="text-pink-600 font-bold text-lg relative z-10">
                  Feb 14 — Laura + {YOUR_NAME}
                </p>
                <p className="text-pink-400 text-sm relative z-10">
                  ❤️ Official Valentine Certificate ❤️
                </p>
              </div>
            </div>
          </div>

          {kissCount > 0 && (
            <p className="text-pink-400 text-sm mb-4">
              Extra kisses received: {kissCount} 😘
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={handleKiss}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Get another heart burst animation"
            >
              One more kiss 😘
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="bg-white text-pink-500 font-bold py-3 px-8 rounded-full text-lg border-2 border-pink-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Restart the valentine proposal"
            >
              Restart (but why?)
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ============================================
  // 💌 MAIN PROPOSAL SCREEN
  // ============================================
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts speed={heartSpeed} />
      <ConfettiExplosion trigger={confettiTrigger} />

      {/* Toast notifications */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Side sticker labels */}
      <div className="fixed top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-pink-300 shadow-lg transform -rotate-6 hidden md:block">
        <span className="text-pink-600 font-bold text-sm">
          Certified Lover Boy (unverified) 💕
        </span>
      </div>

      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-pink-300 shadow-lg transform rotate-6 hidden md:block">
        <span className="text-pink-600 font-bold text-sm">
          Emotionally Supportive Website 🌸
        </span>
      </div>

      {/* Patch notes panel - desktop only */}
      <div className="fixed top-4 right-4 hidden lg:block">
        <PatchNotesPanel attempts={attempts} />
      </div>

      {/* Main card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-pink-300 max-w-lg w-full text-center z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4 text-balance animate-pulse-love">
          Laura, will you be my Valentine this February 14? 💘🥺
        </h1>

        <p className="text-pink-400 text-lg mb-8">
          I coded this because my feelings have no chill.
        </p>

        {/* Button container - needs relative positioning for No button movement */}
        <div
          ref={containerRef}
          className="relative h-32 md:h-40 w-full mb-6"
          aria-live="polite"
        >
          {/* Yes button - always centered-ish */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-4">
            <button
              type="button"
              onClick={handleYes}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-20"
              aria-label="Accept to be my valentine"
            >
              Yes 💖
            </button>

            {noButtonPatched && (
              <button
                type="button"
                onClick={handleYes}
                className="bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-20 animate-wiggle"
                aria-label="Also accept to be my valentine"
              >
                YES!!! 💘💍
              </button>
            )}
          </div>

          {/* The infamous No button that shall not be clicked */}
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
              className={`absolute bg-white text-pink-400 font-bold py-4 px-8 rounded-full text-xl border-2 border-pink-200 shadow-lg transition-all z-10 whitespace-nowrap ${
                attempts > 5 ? "animate-panic-shake" : ""
              } ${attempts > 3 ? "animate-wiggle" : ""}`}
              style={{
                transform: `translate3d(${noButtonPos.x}px, ${noButtonPos.y}px, 0)`,
                transitionDuration: `${Math.max(150 - attempts * 15, 50)}ms`,
              }}
              aria-label="Decline valentine proposal - but this button will dodge you"
            >
              {getNoButtonText()}
            </button>
          )}
        </div>

        {/* Status bar */}
        <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-pink-600 font-bold">
              No attempts:{" "}
              <span className={attempts > 5 ? "text-red-500" : ""}>
                {attempts}
              </span>
              {attempts > 0 && (
                <span className="text-pink-400 text-sm ml-2">
                  {attempts >= 8
                    ? "(No has been patched out)"
                    : attempts >= 5
                      ? "(just give up bestie)"
                      : "(resistance is futile)"}
                </span>
              )}
            </div>
            <MoodMeter attempts={attempts} />
          </div>
        </div>

        {/* Mobile patch notes */}
        <div className="mt-4 lg:hidden">
          <details className="text-left">
            <summary className="text-pink-500 font-medium cursor-pointer text-sm">
              📋 View Patch Notes
            </summary>
            <div className="mt-2">
              <PatchNotesPanel attempts={attempts} />
            </div>
          </details>
        </div>
      </div>

      {/* Bottom flavor text */}
      <p className="mt-6 text-pink-500 text-sm text-center max-w-md z-10">
        ⚠️ This website was built with maximum cheese and zero shame. Side
        effects may include butterflies, blushing, and the inability to say no.
      </p>
    </main>
  );
}
