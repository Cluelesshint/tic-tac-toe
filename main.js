const Game = (() => {
  let gameState = "no opponent";
  let whoseTurn = null;

  function updateGameState(opponent) {
    gameState = opponent;
  }

  function updateWhoseTurn() {
    if (player1.getTurn()) {
      whoseTurn = player1;
    } else if (player2.getTurn()) {
      whoseTurn = player2;
    }
  }

  function getWhoseTurn() {
    return whoseTurn;
  }

  function getGameState() {
    return gameState;
  }

  return { getGameState, getWhoseTurn, updateGameState, updateWhoseTurn };
})();

const Board = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function updateBoardAndTurn(cellNumber, e) {
    if (player1.getTurn() && board[cellNumber] == "") {
      board[cellNumber] = "x";
      e.path[0].innerHTML = '<img src="assets/img/x.svg" />';
      player1.setTurn(false);
      player2.setTurn(true);
      DisplayController.updateWhoseTurnItIs(player2);
    } else if (player2.getTurn() && board[cellNumber] == "") {
      board[cellNumber] = "o";
      e.path[0].innerHTML = '<img src="assets/img/o.svg" />';
      player1.setTurn(true);
      player2.setTurn(false);
      DisplayController.updateWhoseTurnItIs(player1);
    }
  }
  return { updateBoardAndTurn, board };
})();

const DisplayController = (() => {
  const content = document.querySelector(".content");
  const choices = document.querySelectorAll("button");
  const gameCells = document.querySelectorAll(".cell");

  function removeChoicesDiv() {
    content.removeChild(content.childNodes[3]);
  }

  function displayWhoseTurnItIs() {
    let player = Game.getWhoseTurn();
    const turnIndicator = document.createElement("div");
    turnIndicator.classList.add("turn-indicator");
    const playerTurnText = document.createElement("h3");
    playerTurnText.classList.add("turn-text");
    playerTurnText.innerHTML = `${player.getName()}'s Turn!`;
    turnIndicator.appendChild(playerTurnText);
    content.appendChild(turnIndicator);
  }

  function updateWhoseTurnItIs(player) {
    const turnText = document.querySelector(".turn-text");
    turnText.innerHTML = `${player.getName()}'s Turn!`;
  }

  function displayPlayerDiv(oppenent) {
    if (oppenent == "human") {
      Game.updateWhoseTurn(player1);
      displayWhoseTurnItIs();
    }
  }

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      let oppenent = e.path[0].className;
      Game.updateGameState(oppenent);
      displayPlayerDiv(oppenent);
      removeChoicesDiv();
    });
  });

  gameCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (Game.getGameState() != "no opponent") {
        const cellNumber = e.target.dataset.cell;
        Board.updateBoardAndTurn(cellNumber, e);
      }
    });
  });

  return { updateWhoseTurnItIs };
})();

const playerFactory = (name, value, type) => {
  let playerName = name;
  let playersTurn = value;

  function setTurn(bool) {
    playersTurn = bool;
  }

  function getName() {
    return playerName;
  }
  function getTurn() {
    return playersTurn;
  }

  return { setTurn, getName, getTurn };
};

let player1 = playerFactory("Player 1", true, "x");
let player2 = playerFactory("Player 2", false, "o");
