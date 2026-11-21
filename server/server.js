import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Audio file directory
const audioDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Serve audio assets
app.use('/audio', express.static(audioDir));

// API: Get music config & status
app.get('/api/music-config', (req, res) => {
  const localAudioPath = path.join(audioDir, 'ashan-bahebak.mp3');
  const hasLocalAudio = fs.existsSync(localAudioPath);

  res.json({
    title: "عشان بحبك",
    alternativeTitle: "طب ب بحبك",
    artist: "حمو المرشدي",
    composer: "عمرو مصطفى",
    arranger: "وزة منتصر",
    duration: "02:42",
    hasLocalAudioFile: hasLocalAudio,
    audioUrl: "/audio/ashan-bahebak.mp3"
  });
});

// API: Save custom calibrated lyrics
app.post('/api/save-lyrics', (req, res) => {
  const { lyrics } = req.body;
  if (!lyrics || !Array.isArray(lyrics)) {
    return res.status(400).json({ error: 'Invalid lyrics format' });
  }

  const targetPath = path.join(__dirname, '..', 'src', 'data', 'lyrics.json');
  try {
    fs.writeFileSync(targetPath, JSON.stringify(lyrics, null, 2), 'utf-8');
    res.json({ success: true, message: 'Lyrics saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write lyrics file' });
  }
});

// Serve frontend build if dist exists
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Express Backend] Running successfully on http://localhost:${PORT}`);
});
