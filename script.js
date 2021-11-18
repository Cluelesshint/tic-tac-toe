const game = (() => {
    let currentName = 1;

    const nameInput = document.querySelector('#input');
    const label = document.querySelector('label');
    const remove = document.querySelector('.input');
    const button = document.querySelector('.choice');

    nameInput.addEventListener('keypress', takeInput);
    button.addEventListener('click', update);

    function reset(){
        
    }
    
    function update(){
        if (button.innerHTML === 'Start'){
            remove.style.opacity = 100;
            button.innerHTML = 'Reset';
        }
        else if (button.innerHTML === 'Reset'){
            remove.style.opacity = 0;
            button.innerHTML = 'Start';
        }
    }
    function takeInput(e){
        if (e.key === 'Enter') updateInput(nameInput.value);
    }
    function updateInput(userInput){
        if (currentName === 1){
            player1.changeName(userInput);
            nameInput.value = '';
            label.innerHTML = 'Player 2:'
            currentName++;
        }
        else if (currentName === 2){
            player2.changeName(userInput);
            nameInput.value = '';
            currentName--;
            remove.style.opacity = 0;
            button.style.opacity = 0;
            displayController.turnIndicator.innerHTML = `${player1.Name}'s Turn!`
        }
    }
    function checkTurn(){
        if (player1.turn) return 'x';
        else return 'o';
    }
    return { checkTurn };
})();

const Board = (() => {
    let board = [
        '','','',
        '','','',
        '','','',
    ];
    function checkCat(board){
        let count = 0;
        for (let i = 0; i < board.length; i++){
            if (board[i] !== '') count++;
        }
        if (count === 9){
            displayController.showCat();
            return true;
        }
        else return false;
    }
    function isEqual(n1, n2, n3){
        if (n1 !== '' && n2 !== '' && n3 !== ''){
            if (n1 === n2 && n1 === n3 && n2 === n3){
                displayController.winner(n1);
                return true;
            } 
            else return false;
        } 
    }
    function checkWin() {
        return isEqual(board[0], board[1], board[2]) ||
               isEqual(board[3], board[4], board[5]) ||
               isEqual(board[6], board[7], board[8]) ||
               isEqual(board[0], board[3], board[6]) ||
               isEqual(board[1], board[4], board[7]) ||
               isEqual(board[2], board[5], board[8]) ||
               isEqual(board[2], board[4], board[6]) ||
               isEqual(board[0], board[4], board[8]) 
    }
    return { board, checkWin, checkCat };
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
            turnIndicator.innerHTML = `${player1.Name} wins!`;
        }
        else turnIndicator.innerHTML = `${player2.Name} wins!`;
    }
    function showCat(){
        turnIndicator.innerHTML = `It's a Tie`;
    }
    function displayBoard(button, key){
        console.log(player1);
        console.log(player2);
        if (Board.checkWin()){
            //reset
        }
        else if (checkEmpty(button)){
            if (game.checkTurn() === 'x'){
                button.innerHTML = '<img src="img/x.png" />';
                button.classList.add('x');
                player1.turn = false;
                player2.turn = true;
                turnIndicator.innerHTML = `${player2.Name}'s Turn!`;
                Board.board[key] = 'x';
            }
            else {
                button.innerHTML = '<img src="img/o.png" />';
                button.classList.add('o');
                player1.turn = true;
                player2.turn = false;
                turnIndicator.innerHTML = `${player1.Name}'s Turn!`;
                Board.board[key] = 'o';
            }
        }
        if (Board.checkWin()){
            //reset
        }
        else if (Board.checkCat(Board.board)){
            //reset
        }
        else return;
    }
    function checkEmpty(button){
        if (button.classList.contains('x') || button.classList.contains('o')){
            return false;
        }else return true;
    }
    return { turnIndicator, winner, showCat };
})();

const playerFactory = (name, value, type) => {
    let Name = name;
    let turn = value;
    let win = false;
    let typeOf = type;

    function changeName(input) {
        this.Name = input;
    }
    function isWin() {
        return win;
    }

    return { Name, turn, typeOf, isWin, changeName };
}

let player1 = playerFactory('Player 1', true, 'x');
let player2 = playerFactory('Player 2', false, 'o');