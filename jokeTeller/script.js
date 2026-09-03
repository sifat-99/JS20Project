const speakBtn = document.getElementById('button');

// Fetch Joke from API
const getJoke = async () => {
    const apiUrl = "https://official-joke-api.appspot.com/jokes/programming/random";
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
        throw new Error("Something went wrong!!");
    } else {
        return `${data[0].setup} ... ${data[0].punchline}`;
    }
}


const tellJoke = (jokeText) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = jokeText;
    speech.lang = 'en-US';

    speech.addEventListener('end', () => {
        speakBtn.disabled = false;
    });

    speech.addEventListener('error', () => {
        speakBtn.disabled = false;
    });

    window.speechSynthesis.speak(speech);
}

speakBtn.addEventListener('click', () => {
    speakBtn.disabled = true;

    getJoke().then((joke) => {
        tellJoke(joke);
    }).catch((error) => {
        console.error('Error fetching joke:', error);
        speakBtn.disabled = false;
    });
});
