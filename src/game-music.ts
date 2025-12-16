// game.ts
let audioContext: AudioContext;
let backgroundBuffer: AudioBuffer;

// A function to load the audio file
async function loadAudio(url: string): Promise<AudioBuffer> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

// A function to play the background music
function playBackgroundMusic() {
  const source = audioContext.createBufferSource();
  source.buffer = backgroundBuffer;
  source.connect(audioContext.destination);
  source.loop = true; // Loop the music
  source.start();
}

// Wait for user interaction to initialize the AudioContext and load music
const startButton = document.getElementById(
  "start-button"
) as HTMLButtonElement;
startButton.addEventListener("click", async () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    backgroundBuffer = await loadAudio("path/to/your/music.mp3");
    playBackgroundMusic();
    startButton.textContent = "Music Playing (Web Audio API)";
  } else if (audioContext.state === "suspended") {
    audioContext.resume();
  }
});
