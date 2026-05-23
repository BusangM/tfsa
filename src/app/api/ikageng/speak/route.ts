import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { Readable } from "node:stream";

export const runtime = "nodejs";

// ── ModelsLab (primary when API key is set) ──────────────────────────────────
// Set MODELSLAB_API_KEY in .env.local to activate.
// Set MODELSLAB_VOICE_ID to change voice (default: "dan").
// Available voices: dan, leo, zac (male) | tara, leah, jess, mia, zoe, madison (female)

async function modelsLabTTS(text: string): Promise<Uint8Array> {
  const key = process.env.MODELSLAB_API_KEY!;
  const voiceId = process.env.MODELSLAB_VOICE_ID ?? "dan";

  const res = await fetch("https://modelslab.com/api/v6/voice/text_to_speech", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key,
      prompt: text,
      voice_id: voiceId,
      language: "en",
      speed: 1,
      emotion: false,
    }),
  });

  if (!res.ok) throw new Error(`ModelsLab HTTP ${res.status}`);

  const data = (await res.json()) as {
    status: string;
    output?: string[];
    message?: string;
  };

  if (data.status === "error") throw new Error(data.message ?? "ModelsLab error");
  if (data.status === "processing") throw new Error("ModelsLab still processing — retry");

  const audioUrl = data.output?.[0];
  if (!audioUrl) throw new Error("No audio URL in ModelsLab response");

  // Proxy the CDN audio back to the client
  const audioRes = await fetch(audioUrl);
  if (!audioRes.ok) throw new Error(`Audio fetch failed: ${audioRes.status}`);

  return new Uint8Array(await audioRes.arrayBuffer());
}

// ── msedge-tts (fallback when no ModelsLab key) ──────────────────────────────
const EDGE_VOICE = "en-ZA-LeahNeural";
const EDGE_OPTIONS = { rate: 1.02, pitch: "+2Hz", volume: 100 } as const;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function edgeTTS(text: string): Promise<Uint8Array> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(EDGE_VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(escapeXml(text), EDGE_OPTIONS);
  return new Uint8Array(await streamToBuffer(audioStream));
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: string };
    const text = body.text?.trim();

    if (!text || text.length > 2500) {
      return Response.json({ error: "Invalid text" }, { status: 400 });
    }

    const audio = process.env.MODELSLAB_API_KEY
      ? await modelsLabTTS(text).catch((err: Error) => {
          console.error("[ikageng/speak] ModelsLab failed:", err.message, "— falling back to Edge TTS");
          return edgeTTS(text);
        })
      : await edgeTTS(text);

    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[ikageng/speak]", error);
    return Response.json({ error: "Voice synthesis failed" }, { status: 500 });
  }
}
