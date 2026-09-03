const speakBtn = document.getElementById('button')
const audioElement = document.getElementById('audio')


const getJoke = async () => {

    const apiUrl = "https://official-joke-api.appspot.com/jokes/programming/random";
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data)
    if (data.error) {
        throw new Error("Something went wrong!!");
    } else {
        return `${data[0].setup} ... ${data[0].punchline}`;
    }
}


speakBtn.addEventListener('click', () => {
    speakBtn.disabled = true;
    getJoke().then((text) => {
        puter.ai.txt2speech(text)
            .then((audio) => {
                if (audio && audio.src) {
                    audioElement.src = audio.src;
                    audioElement.play();
                } else {
                    console.error("No audio returned from puter.ai");
                    speakBtn.disabled = false;
                }
            })
            .catch((error) => {
                console.error('Text-to-speech Error:', error);
                speakBtn.disabled = false;
            });
    }).catch((error) => {
        console.error('Error fetching joke:', error);
        speakBtn.disabled = false;
    });
});

audioElement.addEventListener('ended', () => {
    speakBtn.disabled = false;
});
