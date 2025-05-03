
let levelNumber = 4
let currentNumber = 1

let score = 4

function startGame(){
    
    let gameArea = document.querySelector(".game-area")
    gameArea.innerHTML = ""

    let gamePlaying = document.createElement("div");
    gamePlaying.classList.add("gamePlaying");
    gameArea.appendChild(gamePlaying);
    

    let isMobile = window.innerWidth <= 650;
    let columnQuantity = isMobile ? 5 : 8;
    let rowQuantity = isMobile ? 8 : 5;
    let squareQuantity = rowQuantity * columnQuantity

    gamePlaying.style.display = "grid";
    gamePlaying.style.gridTemplateColumns = `repeat(${columnQuantity}, 1fr)`;
    gamePlaying.style.gridGap = "16px";
    gamePlaying.style.padding = "20px";


    let numbers = []
    for(let i=1; i<=squareQuantity; i++){
        numbers.push(i)
    }
    
    for (let i = numbers.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }


    for(let i = 0; i<squareQuantity; i++){
        let square = document.createElement("div")
        square.classList.add("square")
        square.id = `square${i+1}`
        square.innerText = numbers[i]
        gamePlaying.appendChild(square)
    }

    let squares = document.querySelectorAll(".square")

    squares.forEach(square => {
        let num = parseInt(square.innerText); 
        if (num >= 1 && num <= levelNumber) {
            square.style.opacity = "1";
        }
    })

    squares.forEach(square =>{
        square.addEventListener("click", ()=>checkClick(square, squares))
    })

    function checkClick(square, squares){
        let clickedNumber = parseInt(square.innerText)
        if(clickedNumber>levelNumber){
            return
        }
        
            if(clickedNumber == currentNumber){
                square.style.opacity = "0"
                currentNumber++
            
                if(currentNumber == 2){
                    squares.forEach(sq =>{
                        if (parseInt(sq.innerText) > 1 && parseInt(sq.innerText) <= levelNumber){
                            sq.style.backgroundColor = "white"
                        }
                    })
                }

                if(currentNumber>levelNumber){
                    setTimeout(() => {
                        levelNumber++
                        score++
                        currentNumber = 1
                        startGame()
                    }, 1000);
                }
            }

            else{
                levelNumber = 4
                currentNumber = 1
                startGame()
                gameOver()
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
        score = 4
}