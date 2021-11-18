const game = (() => {
    function isEqual(n1, n2, n3){
        if (n1 !== '' && n2 !== '' && n3 !== ''){
            if (n1 === n2 && n1 === n3 && n2 === n3){
                displayController.winner(n1);
                return true;
            } 
            else return false;
        } 
    }
    function checkCat(board){
        let count = 0;
        for (let i = 0; i < board.length; i++){
            if (board[i] === '') return false;
            else count++;
        }
        if (count === 8) return true;
    }
    function checkWin() {
        return isEqual(Board.board[0], Board.board[1], Board.board[2]) ||
               isEqual(Board.board[3], Board.board[4], Board.board[5]) ||
               isEqual(Board.board[6], Board.board[7], Board.board[8]) ||
               isEqual(Board.board[0], Board.board[3], Board.board[6]) ||
               isEqual(Board.board[1], Board.board[4], Board.board[7]) ||
               isEqual(Board.board[2], Board.board[5], Board.board[8]) ||
               isEqual(Board.board[2], Board.board[4], Board.board[6]) ||
               isEqual(Board.board[0], Board.board[4], Board.board[8]) ||
               checkCat(Board.board);

    }
    function checkTurn(){
        if (player1.turn) return 'x';
        else return 'o';
    }
    return { checkWin, checkTurn };
})();

const Board = (() => {
    let board = [
        '','','',
        '','','',
        '','','',
    ];
    return { board };
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
    function winner(n1){
        if (n1 === player1.typeOf){
            turnIndicator.innerHTML = `${player1.name} wins!`;
        }
        else turnIndicator.innerHTML = `${player2.name} wins!`;
    }
    function displayBoard(button, key){
        if (game.checkWin()){
            //reset
        }
        else if (checkEmpty(button)){
            if (game.checkTurn() === 'x'){
                button.innerHTML = '<img src="img/x.png" />';
                button.classList.add('x');
                player1.turn = false;
                player2.turn = true;
                turnIndicator.innerHTML = 'Player O\'s turn!';
                Board.board[key] = 'x';
            }
            else {
                button.innerHTML = '<img src="img/o.png" />';
                button.classList.add('o');
                player1.turn = true;
                player2.turn = false;
                turnIndicator.innerHTML = 'Player X\'s turn!';
                Board.board[key] = 'o';
            }
        }
        if (game.checkWin()){
            //reset
        }
        else return;
    }
    function checkEmpty(button){
        if (button.classList.contains('x') || button.classList.contains('o')){
            return false;
        }else return true;
    }
    return { winner };
})();

const playerFactory = (name, value, type) => {
    let turn = value;
    let win = false;
    let typeOf = type;

    const isWin = (value) => win = value;

    return { name, turn, typeOf, isWin };
}

const player1 = playerFactory('Player One', true, 'x');

const player2 = playerFactory('Player Two', false, 'o');
