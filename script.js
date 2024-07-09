let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbtn");
let newgamebtn = document.querySelector(".newbtn");
let msgcontainer = document.querySelector(".msgcontainer")
let msg = document.querySelector("#msg")


let turnO = true; //player X,player O

//winning patterns:[012],[345],[678],[036],[147],[258],[048],[246]

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// created a 2d array to  store winning patterns.
let count = 0;

const disabledboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enabledboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";

    }
}
const resetGame = () => {
    turnO = true;
    enabledboxes();
    msgcontainer.classList.add("hide");
    count=0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            count++;
            turnO = false;
        }
        else {
            box.innerText = "X";
            count++;
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    })
})
const showWinner = (winner) => {
    msg.innerText = `Congrats Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
};


const draw = () => {
    msg.innerText = `Its A Draw Game Try Again!`;
    msgcontainer.classList.remove("hide");
   
};
const checkwinner = () => {
    for (pattern of winpatterns) {
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value != "" && pos2value != "" && pos3value != "") {
            if (pos1value === pos2value && pos2value === pos3value) {
                showWinner(pos1value);
                break;
            }
            else {
                if (count === 9 && (pos1value !== pos2value || pos2value !== pos3value || pos1value !== pos3value))
                    {
                    draw();
                    break;
                }
            };

        };
    }
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

