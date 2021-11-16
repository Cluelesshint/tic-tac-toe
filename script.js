const game = (() => {
    function checkWin() {
        const board = Gameboard.gameboard;
    }
    return { checkWin };
})();

const Gameboard = (() => {
    let gameboard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];


    return { gameboard };
})();

const displayController = (() => {
    const buttons = document.querySelectorAll('#grid');
    
    buttons.forEach((button) => { 
        button.addEventListener('click', displayBoard);
    })

    function displayBoard(e){
        const dataKey = e.target.attributes[1].nodeValue;
        console.log(dataKey);
    }

    return { displayBoard };
})();

const playerFactory = (name) => {
    return { name };
}

const player1 = playerFactory('Player One');
const player2 = playerFactory('Player Two');
