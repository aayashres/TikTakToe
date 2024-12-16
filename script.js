const board = document.querySelector(".grid-box");
// looping and inserting element

let html = "";
for (let item = 0; item < 9; item++) {
  html += `<div class="btn" onclick="handleClick(${item})"></div>`;
}
board.innerHTML = html;

// getting the element
const result = document.querySelector(".results");
const placeMark = document.querySelectorAll(".btn");
const reset = document.querySelector(".reset");

// initializing empty array to store the marked value
let array = ["", "", "", "", "", "", "", "", ""];
let currentValue = "X"; // initializing currentValue to X so that we can toggle currentValue after a move
let terminateGame = false;

// function to find the winner or the draw
const winDraw = (index) => {
  // setting winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // looping through winning combinations and checking for the winner
  for (let i = 0; i < winningCombinations.length; i++) {
    const [i1, i2, i3] = winningCombinations[i];

    // checking if their is any winningCombination in the array value
    if (array[i1] && array[i1] === array[i2] && array[i1] === array[i3]) {
      terminateGame = true;
      result.innerText = `${array[i1]}  wins.`;

      //function to add color after the win
      const addColor = (i) => {
        return placeMark[i].classList.add("change-color");
      };

      addColor(i1);
      addColor(i2);
      addColor(i3);
    }

    // Checks if an array includes any "" string and the terminateGame value is false
    if (!array.includes("") && terminateGame === false) {
      result.innerText = "Draw";
    }

    // reset function to reset the game
    reset.addEventListener("click", () => {
      array = ["", "", "", "", "", "", "", "", ""];
      currentValue = "X";
      placeMark[index].innerText = "";
      result.innerText = "";
      terminateGame = false;

      // function to remove color after the reset
      const removeColor = (i) => {
        return placeMark[i].classList.remove("change-color");
      };

      removeColor(i1);
      removeColor(i2);
      removeColor(i3);
    });
  }
};

// handleClick function to display the currentValue in the DOM
const handleClick = (index) => {
  // returns if the array[index] is already filled and the terminateGame is true
  if (array[index] || terminateGame) {
    return;
  }

  array[index] = currentValue;
  currentValue === "X" ? (currentValue = "O") : (currentValue = "X");
  placeMark[index].innerText = array[index];
  winDraw(index);
};
