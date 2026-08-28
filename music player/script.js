const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const songs = [
    {
        song: 'music/jacinto-1.mp3',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
        img: 'img/jacinto-1.jpg'
    },
    {
        song: 'music/jacinto-2.mp3',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
        img: 'img/jacinto-2.jpg'
    },
    {
        song: 'music/jacinto-3.mp3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
        img: 'img/jacinto-3.jpg'
    },
    {
        song: 'music/metric-1.mp3',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
        img: 'img/metric-1.jpg'
    },
    {
        song: 'music/ Wonders of the Earth.mp3',
        displayName: 'Wonders of the Earth',
        artist: 'Grand_Project',
        img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];
let isPlaying = false;
let songIndex = 0;
function loadSong(song) {
    if (song.displayName.length > 20) {
        title.classList.add('long-title');
    } else {
        title.classList.remove('long-title');
    }
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = song.song;
    image.src = song.img;
}
loadSong(songs[songIndex]);
function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.setAttribute('title', 'Play');
    music.pause();
}
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function updateProgress(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
        const currentTimeMinutes = Math.floor(currentTime / 60);
        const currentTimeSeconds = Math.floor(currentTime % 60);
        currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;
    }
}
progressContainer.addEventListener('click', setProgress);
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}
playBtn.addEventListener('click', () => { isPlaying ? pauseSong() : playSong(); });
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', nextSong);
