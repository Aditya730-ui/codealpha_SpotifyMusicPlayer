



document.addEventListener("DOMContentLoaded", () => {
  const songs = [
    { name: "Bollywood Hindi Song", file: "songs/bollywood-indian-hindi-song-music-369483.mp3" },
    { name: "Bollywood Hindi Song 2", file: "songs/music2.mp3" },
    { name: "Just Love the World", file: "songs/just-love-the-world-365557.mp3" },
    { name: "Kaise Bhula Du", file: "songs/music3.mp3" },
    { name: "Sonic Sunrise", file: "songs/sonic-sunrise-207645.mp3" },
    { name: "Scythermane, SH3RWIN, NXGHT! - DANÇA DO VERÃO [NCS Release]", file: "songs/music4.mp3" },
    { name: "Maestro Chives, Egzod, Neoni - Royalty [NCS Release]", file: "songs/music5.mp3" },
    { name: "LXNGVX - Royalty Funk [NCS Release]", file: "songs/music6.mp3" },
     { name: "gnx-kendrick-lamar-type-beat-tv-off-pt2", file: "songs/music7.mp3" },
      { name: "MUPP - X2 [NCS Release]", file: "songs/music8.mp3" },
      { name: "NIVIRO - The Riot [NCS Release]", file: "songs/music9.mp3" },
      { name: "Warriyo, Laura Brehm - Mortals (feat. Laura Brehm) [NCS Release]", file: "songs/music10.mp3" }

  ];

  const songsList = document.getElementById("songsList");
  const audioPlayer = new Audio();
  let currentIndex = 0;
    const decreaseVolumeButton = document.querySelector(".decrease-volume");
  const increaseVolumeButton = document.querySelector(".increase-volume");
  function updateVolumeButtons() {
    decreaseVolumeButton.disabled = audioPlayer.volume <= 0;
    increaseVolumeButton.disabled = audioPlayer.volume >= 1;
  }

  decreaseVolumeButton.addEventListener("click", () => {
    audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
    updateVolumeButtons();
  });

  increaseVolumeButton.addEventListener("click", () => {
    audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
    updateVolumeButtons();
  });
  updateVolumeButtons();

  const currentTimeEl = document.getElementById("currentTime");
  const totalDurationEl = document.getElementById("totalDuration");
  const progressContainer = document.getElementById("progressContainer");
  const progress = document.getElementById("progress");
  


  // Load song by index
  function loadSong(index) {
    audioPlayer.src = songs[index].file;
    audioPlayer.load();
    console.log(`Loaded: ${songs[index].name}`);
    highlightCurrentSong(index);
  }

  // Highlight + Update GIF for current song
  function highlightCurrentSong(index) {
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    updateGifs();
  }

  // Update GIFs: Show only for playing song
  function updateGifs() {
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, i) => {
      const gif = item.querySelector('.playing-gif');
      if (i === currentIndex && !audioPlayer.paused) {
        gif.style.display = 'inline';
      } else {
        gif.style.display = 'none';
      }
    });
  }

  loadSong(currentIndex); // Load first song

  // Render playlist with GIF + click-to-play
  songs.forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song-item");
    songDiv.innerHTML = `
      <p>${song.name}</p>
      <img src="5uwq.gif" class="playing-gif" style="display: none;" alt="playing">
    `;
    songDiv.addEventListener("click", () => {
      currentIndex = index;
      loadSong(currentIndex);
      audioPlayer.play();
      playImg.src = "icons8-pause-30.png";
      updateGifs();
    });
    songsList.appendChild(songDiv);
  });

  // Navbar Buttons
  const playButton = document.querySelector(".play-button");
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  const playImg = playButton.querySelector("img");

  playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playImg.src = "icons8-pause-30.png";
    } else {
      audioPlayer.pause();
      playImg.src = "icons8-play-30.png";
    }
    updateGifs();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audioPlayer.play();
    playImg.src = "icons8-pause-30.png";
    updateGifs();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audioPlayer.play();
    playImg.src = "icons8-pause-30.png";
    updateGifs();
  });

  // Time + Progress Bar
  audioPlayer.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    totalDurationEl.textContent = formatTime(audioPlayer.duration);
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${percent}%`;
  });

  // Seek on Progress Click
  progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
  });

  // Format mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }
  audioPlayer.addEventListener("ended", () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentIndex);
    currentIndex = randomIndex;
    loadSong(currentIndex);
    audioPlayer.play();
    playImg.src = "icons8-pause-30.png";
    updateGifs();
  });
});

 




 
