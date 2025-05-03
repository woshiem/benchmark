// Oyuna ek olarak yeşil ekran gelmeden önce click spamlamaya karşı bir önlem alınabilir(tıklanırsa oyunu başa sar vs).
    let dateValue = 0
    let timeElapsed = 0

function startGame(){

    const gameArea = document.querySelector(".game-area")
    gameArea.innerHTML = `<h2> Renk değişince tıkla </h2>`

    gameArea.style.backgroundColor = "hsl(345, 100%, 50%)"
    gameArea.style.cursor = "pointer"
    
    let randomTime = Math.floor(Math.random()*3) + 2

    setTimeout(() => {
        gameArea.style.backgroundColor = "hsl(150, 100%, 30%)"
        gameArea.innerHTML = `<h2> Tıkla! </h2>`

        gameArea.addEventListener("click", checkClick, { once: true })
        dateValue = Date.now()
    }, randomTime*1000)
}


function checkClick(){
    const gameArea = document.querySelector(".game-area")
    timeElapsed = Date.now()-dateValue
    
    gameArea.innerHTML = `
    <i class="fa-solid fa-clock"></i>
    <h2>${timeElapsed}ms </h2>
    <button onclick="startGame()"> Yeniden oyna </button>
    `
    gameArea.style.cursor = "default"
}