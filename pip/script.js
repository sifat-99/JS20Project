const videoElement = document.getElementById('video');
const button = document.getElementById('toggler');

// Prompt user to select a media source (video and audio)
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (error) {
        console.log('error:', error);
    }
}

// Event listener for the button
button.addEventListener('click', async () => {
    // Toggle Button
    button.disabled = true;
    await videoElement.requestPictureInPicture();
    button.disabled = false;
});

// Start
selectMediaStream();