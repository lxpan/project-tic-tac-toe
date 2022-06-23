// Project: Tic Tac Toe

// *--------- Modules

// store the game board as an array inside this object
const gameBoard = ( () => {
    const createBoard = (rows=3, columns=3) => {
        let boardArr = []
        for(let i = 0; i < rows; i++) {
            let _row = [];
            for(let j = 0; j < columns; j++) {
                _row.push(j);
            }
            boardArr.push(_row);
        }
        return boardArr;
    };

    const boardState = [ 
        ['', 'X', ''],
        ['', 'O', ''],
        ['', '', '']
    ]
    //createBoard();

    return {
        boardState
    }
}) ();

// render contents of gameBoard array to webpage
const displayController = {

}

// the outermost object
const gameRunner = {

}

// *--------- Factories
const playerFactory = {

}

// player1 = playerFactory('Luoxi', 'human');
// player2 = playerFactory('Hal', 'AI');

myBoard = gameBoard;
let arr = gameBoard.boardState;
console.log(arr);
console.log(arr[0][1]);  // first row, 2nd column
