const Game = (() => {
  let gameState = "no opponent";
  let whoseTurn = null;
  let lastMove = null;

  function reset() {
    gameState = "no opponent";
    whoseTurn = null;
    resetPlayers();
    Board.resetBoard();
    DisplayController.resetGridSquares();
    DisplayController.resetTurnIndicator();
    DisplayController.toggleResultsDiv();
    DisplayController.toggleBlurContent();
  }

  function updateLastMove(move) {
    lastMove = move;
  }

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

  function resetPlayers() {
    player1.setTurn(true);
    player2.setTurn(false);
    player3.setTurn(false);
  }

  function getLastMove() {
    return lastMove;
  }

  function getWhoseTurn() {
    return whoseTurn;
  }

  function getGameState() {
    return gameState;
  }

  return {
    getGameState,
    getWhoseTurn,
    getLastMove,
    updateGameState,
    updateWhoseTurn,
    updateLastMove,
    reset,
  };
})();

const Board = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
  }

  function updateBoard(index, char) {
    board[index] = char;
  }

  function getValidMoves() {
    validMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "") validMoves.push(i);
    }
    return validMoves;
  }

  function checkValidMove(index) {
    if (board[index] == "") return true;
    return false;
  }

  function checkCat() {
    if (board.indexOf("") !== -1) {
      // return false if a blank 'cell' exists
      return false;
    }
    Game.updateGameState("no opponent");
    DisplayController.displayGameResult("cat");
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
    if (checkBoard() && player3.getTurn()) {
      Game.updateGameState("no opponent");
      if (Game.getLastMove() == "x") {
        DisplayController.displayGameResult("win", player1);
      } else {
        DisplayController.displayGameResult("win", player3);
      }
    }
    // prettier ignore
    else if (checkBoard()) {
      Game.updateGameState("no opponent");
      if (Game.getLastMove() == "x") {
        DisplayController.displayGameResult("win", player1);
      } else {
        DisplayController.displayGameResult("win", player2);
      }
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
      DisplayController.updateTurnIndicator(player2);
      Game.updateLastMove("x");
    } else if (player2.getTurn() && board[cellNumber] == "") {
      board[cellNumber] = "o";
      e.path[0].innerHTML = '<img src="assets/img/o.svg" />';
      player1.toggleTurn();
      player2.toggleTurn();
      DisplayController.updateTurnIndicator(player1);
      Game.updateLastMove("o");
    }
  }

  function updateBoardAndPlayerTurnComp(cellNumber, e) {
    if (Board.checkValidMove(cellNumber)) {
      board[cellNumber] = "x";
      e.path[0].innerHTML = '<img src="assets/img/x.svg" />';
      Game.updateLastMove("x");
    }
  }

  return {
    checkWin,
    checkCat,
    resetBoard,
    updateBoardAndPlayerTurn,
    updateBoardAndPlayerTurnComp,
    getValidMoves,
    checkValidMove,
    updateBoard,
    board,
  };
})();

const DisplayController = (() => {
  const mainCont = document.querySelector(".main-content");
  const choices = document.querySelectorAll("button");
  const gameCells = document.querySelectorAll(".cell");
  const reset = document.querySelector(".reset");
  const choicesWrapper = document.querySelector(".wrapper");
  const results = document.querySelector(".display-result");
  const resultsText = document.querySelector(".result");
  const turnText = document.querySelector(".turn-text");

  function toggleChoicesDiv() {
    if (choicesWrapper.classList.contains("hide"))
      choicesWrapper.classList.remove("hide");
    else choicesWrapper.classList.add("hide");
  }

  function toggleBlurContent() {
    if (mainCont.classList.contains("blur")) mainCont.classList.remove("blur");
    else mainCont.classList.add("blur");
  }

  function toggleResultsDiv() {
    if (results.classList.contains("hide")) results.classList.remove("hide");
    else results.classList.add("hide");
  }

  function blurContent() {
    mainCont.classList.add("blur");
  }

  function showResultsDiv() {
    results.classList.remove("hide");
  }

  function resetTurnIndicator() {
    turnText.innerHTML = "";
  }

  function resetGridSquares() {
    gameCells.forEach((cell) => {
      if (cell.childNodes[0]) {
        cell.removeChild(cell.childNodes[0]);
      }
    });
  }

  function displayGameResult(winOrCat, player) {
    blurContent();
    showResultsDiv();
    if (winOrCat == "win") {
      resultsText.innerHTML = `${player.getName()} wins!`;
    }
    // prettier ignore
    else if (winOrCat == "cat") {
      resultsText.innerHTML = `It's a draw! CAT`;
    }
  }

  function updateTurnIndicator(player) {
    if (typeof player == "object") {
      turnText.innerHTML = `${player.getName()}'s Turn`;
    } else turnText.innerHTML = `${player}'s Turn`;
  }

  function displayPlayerDiv(oppenent) {
    if (oppenent == "human") Game.updateWhoseTurn(player1);
  }

  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      let oppenent = e.path[0].className;
      Game.updateGameState(oppenent);
      toggleChoicesDiv();
      displayPlayerDiv(oppenent);
      updateTurnIndicator(player1);
      if (Game.getGameState() == "computer") {
        player3.toggleTurn();
      }
    });
  });

  gameCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (Game.getGameState() == "no opponent") {
        //do nothing
      }
      // prettier block
      else if (Game.getGameState() == "human") {
        const cellNumber = e.target.dataset.cell;
        Board.updateBoardAndPlayerTurn(cellNumber, e);
        Board.checkCat();
        Board.checkWin();
      }
      // prettier block
      else if (Game.getGameState() == "computer") {
        const cellNumber = e.target.dataset.cell;
        Board.updateBoardAndPlayerTurnComp(cellNumber, e);
        Board.checkCat();
        Board.checkWin();
        if (Game.getGameState() != "no opponent" && Game.getLastMove() == "x") {
          const randomMove = AI.getRandomMove();
          Board.updateBoard(randomMove, "o");
          gameCells[randomMove].innerHTML = '<img src="assets/img/o.svg" />';
          Game.updateLastMove("o");
          Board.checkCat();
          Board.checkWin();
        }
      }
    });
  });

  reset.addEventListener("click", (e) => {
    Game.reset();
  });

  return {
    updateTurnIndicator,
    resetTurnIndicator,
    displayGameResult,
    resetGridSquares,
    toggleBlurContent,
    toggleResultsDiv,
  };
})();

const AI = (() => {
  function getRandomMove() {
    validMoves = Board.getValidMoves();
    const randomMove = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomMove];
  }

  return { getRandomMove };
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

  function setTurn(turnBool) {
    playerTurn = turnBool;
  }

  return { toggleTurn, getName, getTurn, getType, setTurn };
};

let player1 = playerFactory("Player 1", true, "X");
let player2 = playerFactory("Player 2", false, "O");
let player3 = playerFactory("Computer", false, "O");
