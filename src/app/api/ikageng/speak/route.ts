import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { Readable } from "node:stream";

export const runtime = "nodejs";

/** South African English female neural voice — calm, warm, locally authentic */
const VOICE = "en-ZA-LeahNeural";
const TTS_OPTIONS = {
  rate: 1.02,
  pitch: "+2Hz",
  volume: 100,
} as const;

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: string };
    const text = body.text?.trim();

    if (!text || text.length > 2000) {
      return Response.json({ error: "Invalid text" }, { status: 400 });
    }

    const tts = new MsEdgeTTS();
    await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(escapeXml(text), TTS_OPTIONS);
    const audio = await streamToBuffer(audioStream);

    return new Response(new Uint8Array(audio), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[ikageng/speak]", error);
    return Response.json(
      { error: "Voice synthesis failed" },
      { status: 500 }
    );
  }
}
