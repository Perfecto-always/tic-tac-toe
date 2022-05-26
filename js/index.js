const gameHolder = document.getElementById("game");

let chanceRemaining = 9; // To determine number of chances left

const arrayOfAllWinningPossibilities = [
    // rows
    [1,2,3], [4,5,6], [7,8,9],
    // columns
    [1,4,7], [2,5,8], [3,6,9],
    // Diagonals
    [1,5,9], [3,5,7]
]

let movesOfX = []
let movesOfO = []

function checkIfAnyWon() {
    // Do not check if the moves used is less than 3
    if(chanceRemaining > 5){
        return false;
    } else {
        const arrayToCheck = division() === "X" ? movesOfX : movesOfO;
        for(let i = 0; i < arrayOfAllWinningPossibilities.length; i++) {
            // checking if someOne of "X" or "O" has won
            const someOneWon = isSubset(arrayToCheck, arrayOfAllWinningPossibilities[i])
            // If someone won we break the loop and return true
            if(someOneWon) {
                return true
            }
        }
    }
}

function division() { 
// Determining what should be displayed on the screen considering remaining chances
    let value
// One who goes first will always start with "X" and the second one will always be "O"
    if(chanceRemaining % 2 === 0) {
        return value = "O";
    } else {
        return value = "X";
    }
    return value
}

// Checks whether the second array is the subset of the first one
function isSubset(arrayToCheck, subsetArray) {
    return subsetArray.every(value => arrayToCheck.includes(value))
}

function move(e) {
    // First we need to remove the onclick function so 
    // the same element cannot be clicked twice.
    e.srcElement.onclick = null

    // Getting whether its "X" or "O"
    const value = division()
    
    // Getting the position of the element clicked
    const position = parseInt(e.target.id)

    // Changing the UI so that it reflects whose chance it was
    e.target.innerText = value
    
    // Determining which array to push the position
    if(value === "X") {
        movesOfX.push(position)
    } else {
        movesOfO.push(position)
    }
    
    // After pushing to the array we need to check if someone won
    if(checkIfAnyWon()){
        window.alert(value + " won!!!")
        reset()
        return
    } else if(chanceRemaining === 1) {
        window.alert("No one won!")
        reset()
        return;
    }

    // Decrementing the remaining chances
    chanceRemaining--;
}

function reset() {
    chanceRemaining = 9
    
    movesOfX = []
    movesOfO = []
    const lists = document.querySelectorAll("li");

    for(let i= 0; i < lists.length; i++) {
        lists[i].innerText= ""
        lists[i].onclick = move
    }    
}

// Initialization function to set the functionality up
(function init() {
    for(let i= 0; i < chanceRemaining; i++){
        // With every loop we create an li element to apped it to its parent node
        const list = document.createElement("li")

        list.id = i + 1
        list.onclick = move
        // Finally appending the child
        gameHolder.appendChild(list)
    }
})()

        
