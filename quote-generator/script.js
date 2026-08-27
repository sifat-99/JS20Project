const quoteText = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet");


function startLoadingAnimation() {
    quoteText.innerHTML = `
    <img src="./assets/loading.svg" alt="">
    `;
}

function stopLoadingAnimation() {
    console.log("waaaaa!!")
}

async function getQuote() {
    try {
        startLoadingAnimation();
        const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
        const response = await fetch(apiUrl);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const quote = data[randomIndex];
        console.log(quote);
        if (quote.text.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = quote.text;
        if (quote.author === '') {
            author.innerText = "Unknown";
        } else {
            author.innerText = quote.author;
        }
        stopLoadingAnimation();
    } catch (error) {
        getQuote();
        console.log(error);
    }
}


function tweetQuote() {
    const quote = quoteText.innerText;
    const authorText = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${authorText}`;
    console.log('triggered...!!')
    window.open(twitterUrl, "_blank");
}

tweetBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);



getQuote();
