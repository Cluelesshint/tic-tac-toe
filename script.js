const game = (() => {
    const checkWin = () => {
        const board = Gameboard.gameboard;
    }
    return { checkWin };
})();

const Gameboard = (() => {
    const gameboard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];


    return { gameboard };
})();

const displayController = (() => {
    const container = document.querySelector('.main-container');

    const displayBoard = () => {

    }
})();

const playerFactory = (name) => {
    return { name };
}

const player1 = playerFactory('Player One');
const player2 = playerFactory('Player Two');
