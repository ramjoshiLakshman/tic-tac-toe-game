const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const xScoreDisplay = document.querySelector("#x-score"); 
const oScoreDisplay = document.querySelector("#o-score");
const turnIndicator = document.querySelector("#turn-indicator");

let turnO = true;
let count = 0;
let xScore = 0;
let oScore = 0;

const winPatterns = [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8],
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 4, 5], 
    [6, 7, 8], 
    [2, 4, 6]
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.innerText = "Current Turn: O";
}

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if(box.innerText !== ""){
            return;
        }
        box.innerText = "O";
        box.disabled = true;
        count++;

        checkWinner();

        if(!msgContainer.classList.contains("hide")){
            return;
        }

        turnIndicator.innerText = "Computer Thinking...";

        setTimeout(() => {
            computerMove();
        }, 500);
    });
});

const showWinner = (winner, pattern) =>{

    pattern.forEach((index) => {
        boxes[index].style.backgroundColor = "#90EE90"
    });

    if(winner === "X"){
        xScore++;
        xScoreDisplay.innerText = xScore;
    }
    else{
        oScore++;
        oScoreDisplay.innerText = oScore;
    }

    msg.innerText = `Congratulations! Winner is ${winner}`;
    turnIndicator.innerText = "Game Over";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled = true;
    }
} ;

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#ffffc7";
    }
}

const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if(box.innerText === ""){
        emptyBoxes.push(index);
        }
    });

    if(emptyBoxes.length === 0){
        return;
    }

    const randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].disabled = true;
    count++;

    checkWinner();
    if(msgContainer.classList.contains("hide")){
        turnIndicator.innerText = "Current Turn O";
    }
};

const checkWinner = () =>{
    let winnerFound = false;

    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== "")
            {
                if(pos1Val === pos2Val && pos2Val === pos3Val)
                {
                    winnerFound = true;
                    showWinner(pos1Val, pattern);
                    return;
                }
        }
    }

    if(count === 9 && !winnerFound){
        msg.innerText = "Game Draw!";
        turnIndicator.innerText = "Game Over";
        msgContainer.classList.remove("hide");
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

