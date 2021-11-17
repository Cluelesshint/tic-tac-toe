const game = (() => {
    function checkWin() {
        const board = Gameboard.gameboard;
    }
    function checkTurn(){
        if (player1.turn) return 'x';
        else return 'o';
    }
    return { checkWin, checkTurn };
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
    const turnIndicator = document.querySelector('#ind');
    const buttons = document.querySelectorAll('#grid');

    buttons.forEach((button) => { 
        button.addEventListener('click', (e) => {
            displayBoard(button);
        });
    });

    function displayBoard(button){
        if (checkEmpty(button)){
            if (game.checkTurn() === 'x'){
                button.innerHTML = '<img src="img/x.png" />';
                button.classList.add('x');
                player1.turn = false;
                player2.turn = true;
                turnIndicator.innerHTML = 'Player O\'s turn!';
            }
            else {
                button.innerHTML = '<img src="img/o.png" />';
                button.classList.add('o');
                player1.turn = true;
                player2.turn = false;
                turnIndicator.innerHTML = 'Player X\'s turn!';
            }
        }
        else return;
    }
    
    function checkEmpty(button){
        if (button.classList.contains('x') || button.classList.contains('o')){
            return false;
        }else return true;
    }
    return { };
})();

const playerFactory = (name, value, type) => {
    let turn = value;
    let typeOf = type;

    return { name, turn, typeOf };
}

const player1 = playerFactory('Player One', true, 'x');

const player2 = playerFactory('Player Two', false, 'o');
