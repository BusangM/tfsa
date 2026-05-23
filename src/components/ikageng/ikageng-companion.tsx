"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, animate } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { useSimpleMode } from "@/context/simple-mode-context";
import { useIkagengScene } from "@/context/ikageng-scene-context";
import { getIkagengNarration, IKAGENG_NAME } from "@/content/ikageng";
import { useIkagengVoice } from "@/hooks/use-ikageng-voice";
import { useSpeech } from "@/hooks/use-speech";
import { IkagengLeaf } from "./ikageng-leaf";
import { IkagengPropBadge } from "./ikageng-prop";

// Full-screen drift waypoints as fractions of (maxX, maxY)
// 0 = base position (bottom-right), 1 = opposite edge
const DRIFT_FRACS = [
  { xF: 0,    yF: 0    },
  { xF: 0.25, yF: 0.32 },
  { xF: 0.65, yF: 0.10 },
  { xF: 0.12, yF: 0.60 },
  { xF: 0.75, yF: 0.48 },
  { xF: 0.42, yF: 0.82 },
  { xF: 0.88, yF: 0.28 },
  { xF: 0.20, yF: 0.50 },
];

// Character dimensions at "lg" size (112px wide, 112*1.5 tall)
const CHAR_W = 112;
const CHAR_H = 168;
const BASE_RIGHT = 32;
const BASE_BOTTOM = 32;

export function IkagengCompanion() {
  const scene = useIkagengScene();
  const { simpleMode } = useSimpleMode();
  const narration = getIkagengNarration(scene);
  const neural = useIkagengVoice();
  const browser = useSpeech();
  const constraintsRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(true);
  const [driftIdx, setDriftIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [waving, setWaving] = useState(false);
  const [muted, setMuted] = useState(false);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const message = simpleMode ? narration.simpleGreeting : narration.greeting;
  const speakText = simpleMode ? narration.simpleSpeakText : narration.speakText;
  const isActive = open || neural.speaking || neural.loading || browser.speaking;

  // Track viewport dimensions for constraint/drift calculations
  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset speech bubble on scene change
  useEffect(() => {
    setOpen(false);
    setHint(true);
    const t = setTimeout(() => setHint(false), 8000);
    return () => clearTimeout(t);
  }, [scene]);

  // Drift animation — animates x/y motion values through waypoints
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isDragging || isActive) return;

    const frac = DRIFT_FRACS[driftIdx];
    // Maximum pixel offset from base (bottom-right corner)
    const maxX = Math.min(-(viewport.w - CHAR_W - BASE_RIGHT * 2), -40);
    const maxY = Math.min(-(viewport.h - CHAR_H - BASE_BOTTOM * 2), -40);

    const cx = animate(x, maxX * frac.xF, { duration: 8, ease: "easeInOut" });
    const cy = animate(y, maxY * frac.yF, { duration: 8, ease: "easeInOut" });
    return () => {
      cx.stop();
      cy.stop();
    };
  }, [driftIdx, isDragging, isActive, viewport]);

  // Advance waypoint every 15 s
  useEffect(() => {
    if (isDragging || isActive) return;
    const t = setInterval(() => {
      setDriftIdx(i => (i + 1) % DRIFT_FRACS.length);
    }, 15000);
    return () => clearInterval(t);
  }, [isDragging, isActive]);

  // Random idle wave every ~28 s when quiet
  useEffect(() => {
    if (isActive || isDragging) return;
    const jitter = 8000 + Math.random() * 8000;
    const t = setTimeout(() => {
      setWaving(true);
      setTimeout(() => setWaving(false), 2200);
    }, 28000 + jitter);
    return () => clearTimeout(t);
  }, [isActive, isDragging, driftIdx]);

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!muted) {
      neural.stop();
      browser.stop();
    }
    setMuted(m => !m);
  };

  const handleClick = async () => {
    if (neural.speaking || neural.loading) {
      neural.stop();
      browser.stop();
      return;
    }
    setOpen(true);
    setHint(false);
    if (muted) return;
    try {
      await neural.speak(speakText);
    } catch {
      if (browser.supported) browser.speak(speakText);
    }
  };

  return (
    <>
      {/* Full-screen invisible drag boundary */}
      <div ref={constraintsRef} className="pointer-events-none fixed inset-0 z-[59]" />

      <motion.div
        style={{ x, y }}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragMomentum
        dragTransition={{ bounceStiffness: 380, bounceDamping: 18, power: 0.25 }}
        onDragStart={() => {
          setIsDragging(true);
          setOpen(false);
        }}
        onDragEnd={() => setIsDragging(false)}
        // Pop-in entry on first mount
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
        className="fixed bottom-5 right-4 z-[60] cursor-grab active:cursor-grabbing sm:bottom-8 sm:right-8"
        aria-live="polite"
      >
        {/* Speech bubble */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="pointer-events-auto mb-2 max-w-[min(20rem,calc(100vw-2rem))]"
            >
              <div className="relative rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-card)]/96 px-4 py-3 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-2 top-2 rounded-md p-1 text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                  aria-label="Dismiss"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <p className="pr-6 text-xs font-semibold text-[var(--color-primary)]">
                  {IKAGENG_NAME}
                </p>
                <p className="mt-1 text-sm leading-snug text-[var(--color-foreground)]">
                  {message}
                </p>
              </div>
              {/* Bubble tail */}
              <div
                className="absolute -bottom-2 right-14 h-4 w-4 rotate-45 border-b border-r border-[var(--color-border)]/80 bg-[var(--color-card)]/96"
                aria-hidden
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Tap me" hint */}
        <AnimatePresence>
          {hint && !open && !isActive && (
            <motion.p
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-x-full -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--color-foreground)] px-3 py-1 text-xs font-medium text-[var(--color-background)] sm:block"
            >
              Tap {IKAGENG_NAME}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Character */}
        <motion.button
          type="button"
          onClick={handleClick}
          className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          aria-label={
            neural.speaking || neural.loading
              ? `Stop ${IKAGENG_NAME}`
              : `Talk to ${IKAGENG_NAME} about this page`
          }
        >
          <IkagengLeaf
            size="lg"
            active={isActive}
            speaking={neural.speaking || browser.speaking}
            loading={neural.loading}
            dragging={isDragging}
            waving={waving}
          />
          <IkagengPropBadge prop={narration.prop} />

          {/* Mute toggle — bottom-left of character */}
          <button
            type="button"
            onClick={handleMuteToggle}
            aria-label={muted ? "Unmute Ikageng" : "Mute Ikageng"}
            className={[
              "absolute -bottom-1 -left-1 z-10 flex h-6 w-6 items-center justify-center",
              "rounded-full border shadow-md transition-colors",
              muted
                ? "border-[var(--color-destructive)]/40 bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]"
                : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]",
            ].join(" ")}
          >
            {muted
              ? <VolumeX className="h-3 w-3" />
              : <Volume2 className="h-3 w-3" />}
          </button>
        </motion.button>
      </motion.div>
    </>
  );
}
