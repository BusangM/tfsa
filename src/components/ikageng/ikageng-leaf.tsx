"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IkagengLeafProps {
  size?: "sm" | "md" | "lg";
  active?: boolean;
  speaking?: boolean;
  loading?: boolean;
  dragging?: boolean;
  waving?: boolean;
  className?: string;
}

const SIZES = { sm: 72, md: 96, lg: 112 };

export function IkagengLeaf({
  size = "md",
  active,
  speaking,
  loading,
  dragging,
  waving,
  className,
}: IkagengLeafProps) {
  const dim = SIZES[size];

  // Outer float / tilt / pace based on current state
  const outerAnimate = dragging
    ? { rotate: [-10, 10, -10], y: [0, -8, 0] }
    : speaking
    ? { y: [0, -9, 0], rotate: [-1.5, 1.5, -1.5], x: [-28, 28, -28] }
    : { y: [0, -13, 0], rotate: [-1.5, 1.5, -1.5] };

  const outerTransition = dragging
    ? { duration: 0.4, repeat: Infinity, ease: "easeInOut" as const }
    : speaking
    ? {
        y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
        rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
        x: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {
        y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
        rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <motion.div
      className={cn("relative select-none", className)}
      animate={outerAnimate}
      transition={outerTransition}
    >
      <svg
        width={dim}
        height={Math.round(dim * 1.5)}
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <radialGradient id="ikBodyGrad" cx="38%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#4CAF8A" />
            <stop offset="100%" stopColor="#1B5E45" />
          </radialGradient>
          <radialGradient id="ikLeafL" cx="40%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#7BC642" />
            <stop offset="100%" stopColor="#2E7D32" />
          </radialGradient>
          <radialGradient id="ikLeafR" cx="60%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#5CB85C" />
            <stop offset="100%" stopColor="#388E3C" />
          </radialGradient>
        </defs>

        {/* Glow ring when active/speaking */}
        <motion.circle
          cx="50" cy="72" r="40"
          fill="none"
          stroke="#5CB89A"
          strokeWidth="2.5"
          animate={{ opacity: speaking ? [0.35, 0.75, 0.35] : active ? 0.28 : 0 }}
          transition={{ duration: speaking ? 0.55 : 0.35, repeat: speaking ? Infinity : 0 }}
        />

        {/* Ground shadow – shrinks when floating higher */}
        <motion.ellipse
          cx="50" cy="147" rx="20" ry="4"
          fill="rgba(0,0,0,0.18)"
          animate={{ rx: [20, 13, 20], opacity: [0.18, 0.09, 0.18] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── LEGS ── rendered before body so body sits on top */}
        {/* Left leg */}
        <motion.g
          style={{ transformOrigin: "43px 108px" }}
          animate={{ rotate: speaking ? [-22, 22, -22] : [-5, 5, -5] }}
          transition={{
            duration: speaking ? 0.5 : 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect x="37" y="108" width="12" height="30" rx="6" fill="#1D5E45" />
          {/* Foot */}
          <rect x="30" y="134" width="19" height="9" rx="4.5" fill="#164C38" />
        </motion.g>

        {/* Right leg – opposite phase */}
        <motion.g
          style={{ transformOrigin: "57px 108px" }}
          animate={{ rotate: speaking ? [22, -22, 22] : [5, -5, 5] }}
          transition={{
            duration: speaking ? 0.5 : 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect x="51" y="108" width="12" height="30" rx="6" fill="#1D5E45" />
          {/* Foot */}
          <rect x="51" y="134" width="19" height="9" rx="4.5" fill="#164C38" />
        </motion.g>

        {/* ── LEFT ARM ── */}
        <motion.g
          style={{ transformOrigin: "22px 75px" }}
          animate={
            dragging
              ? { rotate: -70 }
              : speaking
              ? { rotate: [-20, 12, -20] }
              : waving
              ? { rotate: [0, 0, 0] }
              : { rotate: [-8, 6, -8] }
          }
          transition={{
            duration: dragging ? 0.25 : speaking ? 0.9 : 3.2,
            repeat: dragging ? 0 : Infinity,
            ease: dragging ? "easeOut" : "easeInOut",
            delay: speaking ? 0.18 : 0,
          }}
        >
          <rect x="14" y="75" width="11" height="28" rx="5.5" fill="#2A8060" />
          {/* Hand */}
          <circle cx="19.5" cy="107" r="6.5" fill="#1D6A50" />
        </motion.g>

        {/* ── RIGHT ARM — the lecture / wave arm ── */}
        <motion.g
          style={{ transformOrigin: "78px 75px" }}
          animate={
            dragging
              ? { rotate: 70 }
              : waving
              ? { rotate: [-65, -15, -65, -15, -65, 0] }
              : speaking
              ? { rotate: [-55, -25, -55] }
              : { rotate: [8, -6, 8] }
          }
          transition={{
            duration: dragging
              ? 0.25
              : waving
              ? 0.28
              : speaking
              ? 1.05
              : 3.2,
            repeat: dragging ? 0 : waving ? 4 : Infinity,
            ease: dragging ? "easeOut" : "easeInOut",
          }}
        >
          <rect x="75" y="75" width="11" height="28" rx="5.5" fill="#2A8060" />
          {/* Hand */}
          <circle cx="80.5" cy="107" r="6.5" fill="#1D6A50" />
        </motion.g>

        {/* ── BODY ── */}
        <circle cx="50" cy="72" r="34" fill="url(#ikBodyGrad)" />

        {/* Highlight */}
        <ellipse
          cx="38" cy="56"
          rx="11" ry="7"
          fill="rgba(255,255,255,0.13)"
          transform="rotate(-22 38 56)"
        />

        {/* ── SPROUT ── */}
        <path d="M50 38 L50 28" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />

        <motion.path
          d="M50 32 C45 23 33 17 27 12 C34 20 43 24 50 32Z"
          fill="url(#ikLeafL)"
          animate={{ rotate: [-4, 2, -4] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 32px" }}
        />
        <motion.path
          d="M50 32 C55 23 67 17 73 12 C66 20 57 24 50 32Z"
          fill="url(#ikLeafR)"
          animate={{ rotate: [4, -2, 4] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 32px" }}
        />

        {/* ── EYES ── */}
        <motion.g
          style={{ transformOrigin: "40px 68px" }}
          animate={{ scaleY: [1, 1, 1, 0.04, 1, 1] }}
          transition={{ duration: 5.2, repeat: Infinity, times: [0, 0.3, 0.44, 0.48, 0.52, 1] }}
        >
          <circle cx="40" cy="68" r="8" fill="white" />
          <motion.circle
            cx="40" cy="68" r="4.5" fill="#1a1a2e"
            animate={{ cx: [40, 41.5, 40, 38.5, 40], cy: [68, 67, 68, 68, 68] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="43" cy="65" r="1.8" fill="white" />
        </motion.g>

        <motion.g
          style={{ transformOrigin: "60px 68px" }}
          animate={{ scaleY: [1, 1, 1, 0.04, 1, 1] }}
          transition={{ duration: 5.2, repeat: Infinity, times: [0, 0.3, 0.44, 0.48, 0.52, 1], delay: 0.08 }}
        >
          <circle cx="60" cy="68" r="8" fill="white" />
          <motion.circle
            cx="60" cy="68" r="4.5" fill="#1a1a2e"
            animate={{ cx: [60, 61.5, 60, 58.5, 60], cy: [68, 67, 68, 68, 68] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="63" cy="65" r="1.8" fill="white" />
        </motion.g>

        {/* Cheeks */}
        <ellipse cx="30" cy="78" rx="7" ry="4" fill="rgba(215,100,85,0.28)" />
        <ellipse cx="70" cy="78" rx="7" ry="4" fill="rgba(215,100,85,0.28)" />

        {/* ── MOUTH ── */}
        {speaking ? (
          <motion.ellipse
            cx="50" cy="83" rx="7" ry="4" fill="#1a1a2e"
            animate={{ ry: [4, 7, 3, 6, 4] }}
            transition={{ duration: 0.32, repeat: Infinity }}
          />
        ) : (
          <path
            d="M42 81 Q50 89 58 81"
            stroke="#1a1a2e"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Loading spin ring */}
        {loading && (
          <motion.circle
            cx="50" cy="72" r="37"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="3"
            strokeDasharray="8 6"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 72px" }}
          />
        )}
      </svg>
    </motion.div>
  );
}
