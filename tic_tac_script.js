let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Player X is the human
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-btn");
const statusText = document.getElementById("status");

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick(event) {

    const index = event.target.dataset.index;

    if (board[index] !== "" || gameOver) return;

    board[index] = "X";
    event.target.textContent = "X";

    if (checkWin()) {
        statusText.textContent = "Player X wins!";
        gameOver = true;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = "O";
    statusText.textContent = "Computer's turn";

    setTimeout(computerMove, 500);
}

function computerMove() {
    if (gameOver) return;

    const availableMoves = board
        .map((cell, index) => (cell === "" ? index : null))
        .filter(index => index !== null);

    const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    if (checkWin()) {
        statusText.textContent = "Computer wins!";
        gameOver = true;
        return;
    }

    if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]               
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === board[b] && board[a] === board[c] && board[a] !== "";
    });
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}