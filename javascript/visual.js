const startBtn = document.getElementById("startBtn");
const titleElements = document.querySelectorAll(".game-area h2, .game-area h3, #startBtn");

let activeSquares = [];
let canClick = false;
let gridSize = 3;
let x = 3;
let totalSquares = x ** 2;
let activeCount = 3;

function startGame(count = activeCount) {
    const gameArea = document.querySelector(".game-area");
    
    // Temizle
    gameArea.innerHTML = "";


    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${x}, 1fr)`;
    gridContainer.style.gap = "10px";
    gridContainer.style.marginTop = "20px";

    gameArea.appendChild(gridContainer);

    activeSquares = [];
    canClick = false;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.index = i;
        square.addEventListener("click", checkSquare);
        gridContainer.appendChild(square);
    }

    let allSquares = document.querySelectorAll(".square");
    let indexes = new Set();

    while (indexes.size < Math.min(count, totalSquares)) {
        indexes.add(Math.floor(Math.random() * totalSquares));
    }

    activeSquares = Array.from(indexes);
    activeSquares.forEach(index => {
        allSquares[index].classList.add("active");
    });

    setTimeout(() => {
        allSquares.forEach(square => square.classList.remove("active"));
        canClick = true;
    }, 1200);
}

function checkSquare(e) {
    if (!canClick) return;
    let index = Number(e.target.dataset.index);
    if (activeSquares.includes(index)) {
        e.target.classList.add("correct");
        activeSquares = activeSquares.filter(i => i !== index);
        if (activeSquares.length === 0) {
            setTimeout(() => {
                nextLevel();
            }, 300);
        }
    } else {
        e.target.classList.add("wrong");
        setTimeout(() => {
            gameOver();
        }, 300);
    }
}

function nextLevel() {
    if (gridSize < 15) {
        gridSize++;

        if (totalSquares / 2 < gridSize) {
            x++;
            totalSquares = x ** 2;
        }

        totalSquares = x ** 2;
    }

    activeCount++;

    const gameArea = document.querySelector(".game-area");
    gameArea.innerHTML = `
        <h2><i class="fa-solid fa-circle-check"></i> <br> Başarılı</h2>
        <h3> Skorun: ${gridSize - 3} <br> Diğer seviyeye geçmek için butona tıkla </h3>
        <button id="nextLevelBtn">Başla</button>
    `;

    document.getElementById("nextLevelBtn").addEventListener("click", () => startGame(activeCount));
}

function resetGame() {
    activeSquares = [];
    canClick = false;
    gridSize = 3;
    x = 3;
    totalSquares = x ** 2;
    activeCount = 3;
    startGame(activeCount);
}

function gameOver() {
    const gameArea = document.querySelector(".game-area");
    gameArea.innerHTML = `
        <h2><i class="fa-solid fa-skull-crossbones"></i> <br> Oyun Bitti</h2>
        <h3> Skorun: ${gridSize - 3} </h3>
        <button id="startBtn">Yeniden Oyna</button>
    `;

    const restartBtn = document.getElementById("startBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            resetGame();
        });
    }

    activeSquares = [];
    canClick = false;
    gridSize = 3;
    x = 3;
    totalSquares = x ** 2;
    activeCount = 3;
}

startBtn.addEventListener("click", () => startGame(3));
