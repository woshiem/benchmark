let timeGiven = 2
let level = 3

function startGame() {
    const gameArea = document.querySelector(".game-area")
    gameArea.innerHTML = ""

    let randomNumber = generateRandomNumber(level)
    console.log("Generated Number:", randomNumber)

    let number = document.createElement("div")
    number.classList.add("number-display")
    number.textContent = randomNumber

    let progressContainer = document.createElement("div")
    progressContainer.classList.add("progress-container")

    let progressBar = document.createElement("div")
    progressBar.classList.add("progress-bar")

    progressContainer.appendChild(progressBar)
    gameArea.appendChild(number)
    gameArea.appendChild(progressContainer)

    let timeLeft = timeGiven
    progressBar.style.width = "100%"
    progressBar.style.transition = `width ${timeGiven}s linear`

    setTimeout(() => {
        progressBar.style.width = "0%"
    }, 50)

    let interval = setInterval(() => {
        timeLeft--

        if (timeLeft <= 0) {
            clearInterval(interval)
            number.remove()
            createInputField(gameArea, randomNumber)

           
        }
    }, 1000)
}

function generateRandomNumber(level) {
    let min = Math.pow(10, level - 1)
    let max = Math.pow(10, level) - 1
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function createInputField(gameArea, correctNumber) {
    let inputContainer = document.createElement("div")
    inputContainer.classList.add("input-container")

    let inputField = document.createElement("input")
    inputField.type = "number"
    inputField.placeholder = "Sayınızı girin"
    inputField.classList.add("number-input")

    let submitButton = document.createElement("button")
    submitButton.textContent = "Gönder"
    submitButton.onclick = function () {
        checkAnswer(inputField.value, correctNumber)
    };

    inputContainer.appendChild(inputField)
    inputContainer.appendChild(submitButton)
    gameArea.appendChild(inputContainer)

    inputField.focus();

    let progressBar = document.querySelector(".progress-container")
    if (progressBar) progressBar.classList.add("hidden")
}

function checkAnswer(userInput, correctNumber) {
    if (parseInt(userInput) === correctNumber) {
        level++
        timeGiven++ 
        const gameArea = document.querySelector(".game-area")
        gameArea.innerHTML = `           
            <h2><i class="fa-solid fa-circle-check"></i> <br> Başarılı</h2>
            <h3> Skorun: ${level} <br>Diğer seviyeye geçmek için butona tıkla </h3>
            <button id="startBtn" onclick="startGame()">Başla</button>
            ` 
    } else {
        let gameArea = document.querySelector(".game-area")
        gameArea.innerHTML = `           
            <h2><i class="fa-solid fa-skull-crossbones"></i> <br> Oyun bitti</h2>
            <h3> Skorun: ${level} </h3>
            <button id="startBtn" onclick="startGame()">Yeniden oyna</button>
            ` 
        level = 3
        timeGiven = 2
    }
}