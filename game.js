// Project: Tic Tac Toe

// *--------- Modules

// store the game board as an array inside this object
const gameBoard = ( () => {
    // redundant
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

/* 
render contents of gameBoard array to webpage
input: boardState
action: modify DOM to display boardState
*/
TEST_BOARD = ['X', 'X', 'O', 'O', 'X', 'O', 'O', 'O', 'X'];

const displayController = ( (doc) => {
    const renderGameBoard = (boardArr) => {
        const gameBoardContainer = doc.querySelector('.gameBoard');
        const gameBoardCells = gameBoardContainer.children;

        // console.log(cells);
        
        // for each board array slot
        for(let i = 0; i < boardArr.length; i++) {
            let cellDiv = gameBoardCells[i];
            cellDiv.innerHTML = boardArr[i];
            // add event listener here
        }
    }

    return {
        renderGameBoard
    };
}) (document);

// the outermost object
const gameRunner = ( () => {
    /* This function/module will invoke the displayController and handle click events from the player. */
    const myBoard = gameBoard; // creates board object filled with board slot objects.
    const controller = displayController;  // renders the board by reading from gameBoard.

    const run = () => {
        controller.renderGameBoard(TEST_BOARD);
    }

    return {
        run
    }
}) ();

// *--------- Factories
const playerFactory = {

}

// player1 = playerFactory('Luoxi', 'human');
// player2 = playerFactory('Hal', 'AI');

const runner = gameRunner;
runner.run();
