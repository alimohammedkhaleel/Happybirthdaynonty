import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generates a valid RIFF WAV audio file (which browsers decode cleanly even with .mp3 extension or native audio)
function generateWav(filename, durationSec = 162, sampleRate = 22050) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit
  const numSamples = durationSec * sampleRate;
  const dataSize = numSamples * numChannels * bytesPerSample;
  const fileSize = 44 + dataSize;

  const buffer = Buffer.alloc(fileSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(fileSize - 8, 4);
  buffer.write('WAVE', 8);

  // fmt subchunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // byte rate
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32); // block align
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // bits per sample

  // data subchunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write harmonic acoustic celebratory melody samples (C - Em - F - G progression)
  const chords = [
    [261.63, 329.63, 392.00], // C
    [329.63, 392.00, 493.88], // Em
    [349.23, 440.00, 523.25], // F
    [392.00, 493.88, 587.33]  // G
  ];

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const chordIndex = Math.floor(t / 2) % chords.length;
    const chord = chords[chordIndex];
    const beat = (t % 2) / 2; // 0 to 1 in beat
    const envelope = Math.exp(-3.5 * beat);

    let sampleVal = 0;
    chord.forEach((freq, idx) => {
      sampleVal += Math.sin(2 * Math.PI * freq * t) * (0.35 / (idx + 1));
    });

    sampleVal *= envelope * 0.25;
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sampleVal * 32767)));
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  const outPath = path.join(__dirname, '..', 'public', 'audio', filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated placeholder audio track at ${outPath} (${(fileSize / 1024 / 1024).toFixed(2)} MB, duration: ${durationSec}s)`);
}

generateWav('ashan-bahebak.mp3', 162);

