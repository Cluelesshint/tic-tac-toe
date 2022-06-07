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

  function checkCat() {
    if (board.indexOf("") !== -1) {
      // return false if a blank 'cell' exists
      return false;
    }
    Game.updateGameState("no opponent");
    // return true if no blank 'cells' exists
    return true;
  }

  function checkBoard() {
    return (
      isEqual(board[0], board[1], board[2]) ||
      isEqual(board[3], board[4], board[5]) ||
      isEqual(board[6], board[7], board[8]) ||
      isEqual(board[0], board[3], board[6]) ||
      isEqual(board[1], board[4], board[7]) ||
      isEqual(board[2], board[5], board[8]) ||
      isEqual(board[2], board[4], board[6]) ||
      isEqual(board[0], board[4], board[8])
    );
  }

  function checkWin() {
    if (checkBoard()) {
      Game.updateGameState("no opponent");
      alert("Thats a win!");
    }
  }

  function isEqual(cell1, cell2, cell3) {
    if (cell1 !== "" && cell2 !== "" && cell3 !== "") {
      if (cell1 === cell2 && cell1 === cell3 && cell2 === cell3) {
        // return true is all three cells are not "" and are equal
        return true;
      }
    }
    // return false if all three cells are not equal
    return false;
  }

  function updateBoardAndPlayerTurn(cellNumber, e) {
    if (player1.getTurn() && board[cellNumber] == "") {
      board[cellNumber] = "x";
      e.path[0].innerHTML = '<img src="assets/img/x.svg" />';
      player1.toggleTurn();
      player2.toggleTurn();
      DisplayController.updateWhoseTurnItIs(player2);
    } else if (player2.getTurn() && board[cellNumber] == "") {
      board[cellNumber] = "o";
      e.path[0].innerHTML = '<img src="assets/img/o.svg" />';
      player1.toggleTurn();
      player2.toggleTurn();
      DisplayController.updateWhoseTurnItIs(player1);
    }
  }
  return { checkWin, checkCat, updateBoardAndPlayerTurn, board };
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
    playerTurnText.innerHTML = `${player.getName()}'s Turn ${player.getType()}`;
    turnIndicator.appendChild(playerTurnText);
    content.appendChild(turnIndicator);
  }

  function updateWhoseTurnItIs(player) {
    const turnText = document.querySelector(".turn-text");
    turnText.innerHTML = `${player.getName()}'s Turn ${player.getType()}`;
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
      if (Game.getGameState() == "no opponent") {
        console.log("no oppoenent");
      }
      // prettier block
      else if (Game.getGameState() == "human") {
        console.log("human");
        const cellNumber = e.target.dataset.cell;
        Board.updateBoardAndPlayerTurn(cellNumber, e);
        Board.checkCat();
        Board.checkWin();
      }
    });
  });

  return { updateWhoseTurnItIs };
})();

const playerFactory = (name, value, type) => {
  let playerName = name;
  let playerTurn = value;
  let playerType = type;

  function toggleTurn() {
    if (playerTurn) {
      playerTurn = false;
      return;
    }
    playerTurn = true;
  }

  function getName() {
    return playerName;
  }

  function getTurn() {
    return playerTurn;
  }

  function getType() {
    return playerType;
  }

  return { toggleTurn, getName, getTurn, getType };
};

let player1 = playerFactory("Player 1", true, "X's");
let player2 = playerFactory("Player 2", false, "O's");
