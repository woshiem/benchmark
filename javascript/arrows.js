
let levelNumber = 1
const arrowList = ["↑", "↓", "→", "←"]
let shownArrows = []
let playerIndex = 0
let score = 0

function startGame(){
    
    const gameArea = document.querySelector(".game-area")
    gameArea.innerHTML = ""


    let square = document.createElement("div")
    square.classList.add("square")
    gameArea.appendChild(square)


    let counter = 0
    let interval = 0
    shownArrows = []
    playerIndex = 0

    function changeArrow(){
        if(counter >= levelNumber){
            clearInterval(interval)
            setTimeout(showArrowButtons, 200)
            return
    }
    square.style.opacity = "0"


    setTimeout(() => {
        let randomArrow = arrowList[Math.floor(Math.random()*4)]
            shownArrows.push(randomArrow)
            square.textContent = randomArrow
            square.style.opacity = "1"

    }, 300)
    counter++
}
changeArrow()
interval = setInterval(changeArrow, 1000)

function showArrowButtons() {
    const gameArea = document.querySelector(".game-area")
    gameArea.innerHTML = ""

    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button-container")

    let buttons = {
        "↑": "up",
        "←": "left",
        "↓": "down",
        "→": "right"
        
    }

    Object.keys(buttons).forEach(arrow => {
        let btn = document.createElement("button")
        btn.textContent = arrow
        btn.classList.add("arrow-btn", buttons[arrow])
        btn.onclick = () => checkAnswer(arrow) 
        buttonContainer.appendChild(btn)
    })

    gameArea.appendChild(buttonContainer)
}

function checkAnswer(arrow){
    if(arrow === shownArrows[playerIndex]){
        playerIndex++
        if(playerIndex === shownArrows.length){
            score++
            levelNumber++
            gameArea.innerHTML = `           
            <h2><i class="fa-solid fa-circle-check"></i> <br> Başarılı</h2>
            <h3> Skorun: ${score} <br>Diğer seviyeye geçmek için butona tıkla </h3>
            <button id="startBtn" onclick="startGame()">Başla</button>
            ` 
        }
    } else{
        gameOver()
        levelNumber = 1
        score = 0
    }
}

}

function gameOver(){
    let gameArea = document.querySelector(".game-area")
    gameArea.innerHTML = `           
            <h2><i class="fa-solid fa-skull-crossbones"></i> <br> Oyun bitti</h2>
            <h3> Skorun: ${score} </h3>
            <button id="startBtn" onclick="startGame()">Yeniden oyna</button>
            ` 
    levelNumber = 1
}