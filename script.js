const player = document.querySelector(".player");
const songs = [
  {
    title: "Believer",
    artist: "Imagine Dragons",
    src: "songs/believer.mp3",
    cover: "image1.jpg"
  },
  {
    title: "Thunder",
    artist: "Imagine Dragons",
    src: "songs/thunder.mp3",
    cover: "image2.jpg"
  },
  {
    title: "Enemy",
    artist: "Imagine Dragons",
    src: "songs/enemy.mp3",
    cover: "image3.jpg"
  }
];

let songIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");

loadSong(songIndex);

/* ---------- FUNCTIONS ---------- */

function loadSong(index) {
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
  cover.src = songs[index].cover;
  audio.src = songs[index].src;

  progress.style.width = "0%"; // reset line
}


function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
  player.classList.add("playing");
}


function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
  player.classList.remove("playing");
}

function playPause() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

/* ---------- PROGRESS ---------- */

audio.addEventListener("timeupdate", () => {
  if (!isPlaying || !audio.duration) return;  // 🔥 IMPORTANT

  const progressPercent =
    (audio.currentTime / audio.duration) * 100;

  progress.style.width = progressPercent + "%";
});


/* ---------- CLICK SEEK ---------- */

function setProgress(e) {
  if (!audio.duration) return;

  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;

  audio.currentTime = (clickX / width) * audio.duration;
}

