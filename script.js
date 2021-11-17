const game = (() => {
    function checkWin() {

    }
    function checkTurn(){
        if (player1.turn) return 'x';
        else return 'o';
    }
    return { checkWin, checkTurn };
})();

const Gameboard = (() => {
    let gameboard = [
        '','','',
        '','','',
        '','','',
    ];
    return { gameboard };
})();

const displayController = (() => {
    const turnIndicator = document.querySelector('#ind');
    const buttons = document.querySelectorAll('#grid');

    buttons.forEach((button) => { 
        button.addEventListener('click', (e) => {
            let key = e.target.dataset.key;
            displayBoard(button, key);
        });
    });
    function displayBoard(button, key){
        if (game.checkWin()){
            console.log('You Win!')
        }
        else if (checkEmpty(button)){
            if (game.checkTurn() === 'x'){
                button.innerHTML = '<img src="img/x.png" />';
                button.classList.add('x');
                player1.turn = false;
                player2.turn = true;
                turnIndicator.innerHTML = 'Player O\'s turn!';
                Gameboard.gameboard[key] = 'x';
                console.table(Gameboard.gameboard);
            }
            else {
                button.innerHTML = '<img src="img/o.png" />';
                button.classList.add('o');
                player1.turn = true;
                player2.turn = false;
                turnIndicator.innerHTML = 'Player X\'s turn!';
                Gameboard.gameboard[key] = 'o';
                console.table(Gameboard.gameboard);
            }
        }
        else return;
    }
    function checkEmpty(button){
        if (button.classList.contains('x') || button.classList.contains('o')){
            return false;
        }else return true;
    }
})();

const playerFactory = (name, value, type) => {
    let turn = value;
    let typeOf = type;

    return { name, turn, typeOf };
}

const player1 = playerFactory('Player One', true, 'x');

const player2 = playerFactory('Player Two', false, 'o');
