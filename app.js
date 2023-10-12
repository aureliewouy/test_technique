let player1 = 1;
let player2 = 2;
let currentPlayer = player1;
let playerOneId = [];
let playerTwoId = [];
const winningCombinations = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
];

function winnerVerification(arr) {
  for (const combinaison of winningCombinations) {
    const isCombinaisonEqual = combinaison.every((index) =>
      arr.includes(index),
    );
    if (isCombinaisonEqual) {
      return true;
    }
  }
  return false;
}
const player1Display = document.getElementById("player1Display");
const player2Display = document.getElementById("player2Display");
const info = document.getElementById("info");
const replay = document.getElementById("replay");

function createShape(shape, element) {
  const newshape = document.createElement("div");
  newshape.classList.add(shape);
  element.appendChild(newshape);
}
function removeShape(shape, element) {
  const childElement = element.querySelector(`.${shape}`);
  if (childElement) {
    childElement.classList.remove(shape);
  }
}
function createWinnerText(player) {
  const winner = document.createElement("p");
  winner.classList.add("winnerText");
  winner.innerText = `Le joueur ${player} est le grand gagnant !`;
  info.appendChild(winner);
}

function handleClick(e) {
  playerOneId = [];
  playerTwoId = [];
  const indexBottomElement = parseInt(e.target.id) + 7;
  const bottomElement = document.getElementById(indexBottomElement.toString());

  if (
    (bottomElement && bottomElement.classList.contains("played")) ||
    e.target.id >= 35
  ) {
    if (currentPlayer === player1) {
      createShape("circle", e.target);
      e.target.classList.add("player-one");
      const gamePlayer1 = document.querySelectorAll(".player-one");
      if (gamePlayer1) {
        gamePlayer1.forEach((element) => {
          const id = parseInt(element.id);
          playerOneId.push(id);
        });
        const isPlayer1Winner = winnerVerification(playerOneId);
        if (isPlayer1Winner) {
          replay.style.display = "block";
          createWinnerText(player1);
          player1Display.style.display = "none";
          player2Display.style.display = "none";
        }
      }
      currentPlayer = player2;
      removeShape("arrow", player1Display);
      createShape("arrow", player2Display);
    } else {
      createShape("cross", e.target);
      e.target.classList.add("player-two");
      const gamePlayer2 = document.querySelectorAll(".player-two");
      if (gamePlayer2) {
        gamePlayer2.forEach((element) => {
          const id = parseInt(element.id);
          playerTwoId.push(id);
        });
        const isPlayer2Winner = winnerVerification(playerTwoId);
        if (isPlayer2Winner) {
          replay.style.display = "block";
          createWinnerText(player2);
          player1Display.style.display = "none";
          player2Display.style.display = "none";
        }
      }
      currentPlayer = player1;
      removeShape("arrow", player2Display);
      createShape("arrow", player1Display);
    }
    e.target.classList.add("played");
    e.target.removeEventListener("click", handleClick);
    e.target.style.pointerEvents = "none";
  }
}

function createGameCards() {
  const gameContainer = document.getElementById("gameContainer");

  for (let i = 0; i < 7 * 6; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", i);
    card.addEventListener("click", handleClick);
    gameContainer.appendChild(card);
  }
  createShape("arrow", player1Display);
}
createGameCards();

function onReplay() {
  currentPlayer = player1;
  const cards = document.querySelectorAll(".card");
  const circles = document.querySelectorAll(".card .circle");
  const crosses = document.querySelectorAll(".card .cross");
  player1Display.style.display = "flex";
  player2Display.style.display = "flex";

  info.removeChild(document.querySelector(".winnerText"));
  cards.forEach((card) => {
    card.classList.remove("played");
    card.classList.remove("player-one");
    card.classList.remove("player-two");
    card.addEventListener("click", handleClick);
    card.style.pointerEvents = "inherit";
  });
  circles.forEach((circle) => {
    circle.remove("circle");
  });
  crosses.forEach((cross) => {
    cross.remove("cross");
  });
  replay.style.display = "none";
}
