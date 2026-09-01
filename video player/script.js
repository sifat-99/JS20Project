const playBtn = document.getElementById('play-btn');
const video = document.querySelector('video');
const progressBar = document.querySelector('.progress-bar');
const progressRange = document.querySelector('.progress-range');
const volumeIcon = document.getElementById('vol-btn');
const currectTime = document.querySelector('.time-elapsed')

const durationTotal = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen')
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');

const playerSpeed = document.querySelector('.player-speed');

const player = document.querySelector('.player');





function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.title = 'play';
}


function togglePlayPause() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.title = 'pause';
    } else {
        video.pause();
        showPlayIcon();
    }
}

video.addEventListener('ended', showPlayIcon);


function displayTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${displayMinutes}:${displaySeconds}`;

}

function updateProgress() {
    const { duration, currentTime } = video;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    console.log(minutes, seconds);

    progressBar.style.width = `${currentTime / duration * 100}%`;
    currectTime.textContent = `${displayTime(currentTime)} / `
    durationTotal.textContent = `${displayTime(duration)}`
}

function setProgress(e) {
    const newTime = e.offsetX / e.target.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

let lastVolume = 1;

function updateVolumeProgress(e) {
    let volume = e.offsetX / e.target.offsetWidth;

    if (volume < 0.1) {
        volume = 0;
    } else if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;

    volumeIcon.className = '';

    video.volume = volume;
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }
    else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }
    else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }

    lastVolume = volume;
}

function toggleMute() {
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.remove('fa-volume-mute');
        if (lastVolume > 0.7) {
            volumeIcon.classList.add('fa-volume-up');
        }
        else if (lastVolume < 0.7 && lastVolume > 0) {
            volumeIcon.classList.add('fa-volume-down');
        }
    }
}


/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }

    video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

let isFullscreen = false;

function toggleFullscreen() {
    if (isFullscreen) {
        closeFullscreen();
        fullscreenBtn.classList.add('fa-expand');
        fullscreenBtn.classList.remove('fa-compress');
        isFullscreen = false;
    } else {
        openFullscreen(player);
        fullscreenBtn.classList.remove('fa-expand');
        fullscreenBtn.classList.add('fa-compress');
        isFullscreen = true;
    }
}

function togglePlayBackSpeed(e) {
    const speed = e.target.value;
    video.playbackRate = speed;
    console.log(speed);
}


playBtn.addEventListener('click', () => {
    togglePlayPause();
});

video.addEventListener('click', () => {
    togglePlayPause();
});

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);

progressRange.addEventListener('click', setProgress);

volumeRange.addEventListener('click', updateVolumeProgress);

volumeIcon.addEventListener('click', toggleMute);

fullscreenBtn.addEventListener('click', toggleFullscreen);

playerSpeed.addEventListener('change', togglePlayBackSpeed);
