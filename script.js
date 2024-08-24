// Cache DOM elements
const winner = document.querySelector(".winner");
const result = document.querySelector(".showResult");
const choice = document.querySelector(".choice");

// Initialize score and display states from localStorage or default values
let score = JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    loss: 0,
    tie: 0
};
let savedWinner = localStorage.getItem("winner") || "";
let savedChoice = localStorage.getItem("choice") || "";

// Update score and display states
updateScoreElement();
winner.innerHTML = savedWinner;
choice.innerHTML = savedChoice;

function computerChoice() {
    const choices = ["Rock", "Paper", "Scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function checkResult(user) {
    const computer = computerChoice();
    let endResult = "";

    // Determine the result of the game
    if (user === computer) {
        score.tie++;
        endResult = "It's a Tie.";
    } else if (
        (user === "Rock" && computer === "Scissor") ||
        (user === "Paper" && computer === "Rock") ||
        (user === "Scissor" && computer === "Paper")
    ) {
        score.win++;
        endResult = "You Win!";
    } else {
        score.loss++;
        endResult = "You Lose";
    }

    // Update the score display and UI
    updateScoreElement();
    winner.innerHTML = endResult;
    const choiceText = `You Chose: <span>${userDisplay(user)}</span>, Computer Chose: <span>${userDisplay(computer)}</span>`;
    choice.innerHTML = choiceText;

    // Save the current state to localStorage
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("winner", endResult);
    localStorage.setItem("choice", choiceText);
}

function userDisplay(choice) {
    const emojiMap = {
        Rock: "👊",
        Paper: "🖐️",
        Scissor: "✌️"
    };
    return emojiMap[choice] || choice;
}

function scoreReset() {
    score = { win: 0, loss: 0, tie: 0 };
    localStorage.removeItem("score");
    localStorage.removeItem("winner");
    localStorage.removeItem("choice");
    updateScoreElement();
    choice.innerHTML = "";
    winner.innerHTML = "";
}

function updateScoreElement() {
    result.innerHTML = `Wins: ${score.win} | Losses: ${score.loss} | Ties: ${score.tie}`;
}
