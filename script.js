const QUOTES = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires a lot of practice and focus.",
  "JavaScript is a powerful programming language.",
  "Success is the sum of small efforts repeated daily.",
  "Stay positive, work hard, and make it happen."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const startBtn = document.getElementById("startBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");

let startTime;
let interval;
let currentQuote = "";

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

function renderQuote(quote) {
  quoteDisplay.innerHTML = "";
  quote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteDisplay.appendChild(span);
  });
}

function startTest() {
  currentQuote = getRandomQuote();
  renderQuote(currentQuote);
  quoteInput.value = "";
  quoteInput.disabled = false;
  quoteInput.focus();
  resultDisplay.innerText = "";
  startBtn.style.display = "none";
  tryAgainBtn.style.display = "inline-block";

  startTime = new Date();
  interval = setInterval(() => {
    const elapsed = Math.floor((new Date() - startTime) / 1000);
    timerDisplay.innerText = `Time: ${elapsed}s`;
  }, 1000);
}

function endTest() {
  clearInterval(interval);
  quoteInput.disabled = true;

  const timeTaken = (new Date() - startTime) / 1000;
  const typedText = quoteInput.value;
  const words = typedText.trim().split(/\s+/).length;
  const wpm = Math.round((words / timeTaken) * 60);

  let correct = 0;
  const originalChars = currentQuote.split("");
  const inputChars = typedText.split("");

  originalChars.forEach((char, i) => {
    const span = quoteDisplay.children[i];
    if (inputChars[i] === char) {
      span.classList.add("correct");
      correct++;
    } else {
      span.classList.add("incorrect");
    }
  });

  const accuracy = Math.round((correct / originalChars.length) * 100);
  resultDisplay.innerText = `Time: ${timeTaken.toFixed(1)}s | WPM: ${wpm} | Accuracy: ${accuracy}%`;
}

quoteInput.addEventListener("input", () => {
  const input = quoteInput.value;
  const quote = currentQuote;

  if (input === quote) {
    endTest();
  }

  // Update character highlighting on input
  const inputChars = input.split("");
  quoteDisplay.childNodes.forEach((charSpan, index) => {
    const char = inputChars[index];
    if (char == null) {
      charSpan.classList.remove("correct", "incorrect");
    } else if (char === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
    }
  });
});

startBtn.addEventListener("click", startTest);
tryAgainBtn.addEventListener("click", () => {
  clearInterval(interval);
  timerDisplay.innerText = "Time: 0s";
  startBtn.style.display = "inline-block";
  tryAgainBtn.style.display = "none";
  resultDisplay.innerText = "";
  quoteInput.disabled = true;
  quoteDisplay.innerHTML = "";
});
