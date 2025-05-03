let words = ["aydın","emir","katarina","adnan","aspava","skibidi","menderes","vakit"]

let wordsLvl2 = ["peynir", "trump", "ankara", "maymun", "izmir", "kızılay", "messi"]

let wordsLvl3 = ["twitter", "tayyip", "amerika", "kanada", "danimarka", "ronaldo"]

let wordsLvl4 = ["facebook", "dolar", "fabiano", "caps", "python", "eb24"]


let shownWords = []
let point = 0
let health = 3
let level = 1
let currentWord = ""

function startGame(){

    if (health <= -1) {
        return // Buradan sonrası çalışmasın anlamında fonksiyonu erken bitirmek için
    }

    else if(point>10 && level == 1){
        words.push(...wordsLvl2)
        level = 2
    }

    else if(point>20 && level == 2){
        words.push(...wordsLvl3)
        level = 3
    }

    else if(point>30 && level == 3){
        words.push(...wordsLvl4)
        level = 4
    }

    const gameArea = document.querySelector(".game-area")
    gameArea.innerHTML = ""

    let healthContainer = document.createElement("div")
    healthContainer.innerHTML = `<i id="icon1" class="fa-solid fa-heart"></i> | ${health}`

    let topContainer = document.createElement("div")
    topContainer.classList.add("top-container")
    topContainer.appendChild(healthContainer)


    let pointContainer = document.createElement("div")
    pointContainer.textContent = `Skor | ${point}`
    pointContainer.classList.add("point-container")

    topContainer.appendChild(pointContainer)
    gameArea.appendChild(topContainer)

    let randomNum = Math.floor(Math.random()* words.length)

    let wordContainer = document.createElement("div")
    currentWord = words[randomNum]
    wordContainer.textContent = currentWord

    

    wordContainer.style.fontSize = "3rem"
    wordContainer.style.padding = "10px 0"

    gameArea.appendChild(wordContainer)

    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button-container")

    const eskiBtn = document.createElement("button")
    eskiBtn.textContent = "ESKİ"
    eskiBtn.addEventListener("click",checkOldWord)
    
    const yeniBtn = document.createElement("button")
    yeniBtn.textContent = "YENİ"
    yeniBtn.addEventListener("click",checkNewWord)

    buttonContainer.appendChild(eskiBtn)
    buttonContainer.appendChild(yeniBtn)

    gameArea.appendChild(buttonContainer)

    
    
}

function checkNewWord(){
    if(health<=0){
        gameOver()
        return
    }

    if (!shownWords.includes(currentWord)){
        point++
        shownWords.push(currentWord)
        
    } else{
        health--
        }
    startGame()

}

function checkOldWord(){
    if(health<=0){
        gameOver()
        return
    }

    if (shownWords.includes(currentWord)){
        point++
        
    } else{
        health--
        
    }
    startGame()

    
}

function gameOver(){
    let gameArea = document.querySelector(".game-area")
        gameArea.innerHTML = `           
            <h2><i class="fa-solid fa-skull-crossbones"></i> <br> Oyun bitti</h2>
            <h3> Skorun: ${point} </h3>
            <button id="startBtn" onclick="startGame()">Yeniden oyna</button>
            ` 
            shownWords = [];
            point = 0
            health = 3
}
