"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useIkagengVoice() {
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setSpeaking(false);
    setLoading(false);
  }, []);

  const speak = useCallback(
    async (text: string) => {
      stop();
      setLoading(true);

      try {
        const res = await fetch("/api/ikageng/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (!res.ok) throw new Error("TTS failed");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        urlRef.current = url;

        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => {
          setSpeaking(false);
          if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current);
            urlRef.current = null;
          }
        };
        audio.onerror = () => {
          setSpeaking(false);
          setLoading(false);
        };

        setLoading(false);
        setSpeaking(true);
        await audio.play();
      } catch {
        setLoading(false);
        setSpeaking(false);
        throw new Error("voice_unavailable");
      }
    },
    [stop]
  );

  useEffect(() => () => stop(), [stop]);

  return { speak, stop, speaking, loading };
}
