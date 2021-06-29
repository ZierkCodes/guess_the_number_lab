let secretNum, guessList, isWinner;


const form = document.querySelector("form");
const guessInput = document.querySelector("#guess-input");
const guessesEl = document.querySelector("#prev-guesses");
const messageEl = document.querySelector("#message");
const resetBtn = document.querySelector("#reset-button");
const prevGuessEl = document.querySelector("#prev-guesses-msg");


form.addEventListener("reset", init);

// when submit button is pressed it will prevent the page from reloading is there is a winner
// if there is no winner, your guess will be parsed
form.addEventListener("submit", function (evt) {
    evt.preventDefault()
    if (isWinner === false) {
      checkGuess(parseInt(guessInput.value))
    }
  });


init();

function init() {
    messageEl.className = ""
	guessesEl.innerText = ""
	messageEl.innerText = "Please enter a number from 1 to 100"
	resetBtn.setAttribute("hidden", true)
	prevGuessEl.innerText = ""
	guessList = []
	isWinner = false
	secretNum = Math.floor(Math.random() * 100 + 1)
    render()
};

function checkGuess(guess) {
    guessInput.value = ""
    if (isNaN(guess) || guess < 1 || guess > 100) {
        renderError("You need to enter a number from 1 to 100. Try again")
        return // if guess is not a number then renderError message appears
    } else if (guess === secretNum) {
        isWinner = true
    } 
    guessList.push(guess)
    render()
};


function render() {
    // finding the last thing in the array
    const lastGuess = guessList[guessList.length - 1]
    // 
    const div = document.createElement("div")
    div.innerText = lastGuess
  
    if (guessList.length === 1) {
      prevGuessEl.innerText = "Your guesses:"
      resetBtn.removeAttribute("hidden")
    }
  
    if (isWinner) {
      renderWin(div)
    } else if (lastGuess > secretNum || lastGuess < secretNum) {
      renderGuess(div, lastGuess)
    }
};

function renderWin(div) {
    messageEl.className = "winner"
    div.className = "winner"
    guessesEl.appendChild(div)
    if (guessList.length === 1) {
      messageEl.innerText = `You found the number in one guess! Amazing!`
    } else {
      messageEl.innerText = `Congratulations! You found the secret number! ${secretNum} in ${guessList.length} guesses!`
    }
};

function renderGuess(div, lastGuess) {
    if (lastGuess < secretNum) {
      messageEl.className = "low"
      div.className = "low"
      messageEl.innerText = `${lastGuess} is too low, try going higher!`
    } else if (lastGuess > secretNum) {
      messageEl.className = "high"
      div.className = "high"
      messageEl.innerText = `${lastGuess} is too high, try going lower!`
    }
    guessesEl.appendChild(div)
};

function renderError(error) {
    messageEl.className = "error"
    messageEl.innerText = error
};
