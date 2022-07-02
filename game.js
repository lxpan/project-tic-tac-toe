// Project: Tic Tac Toe

// *--------- Modules

// store the game board as an array inside this object
TEST_BOARD = ['X', 'X', 'O', '', '', '', '', '', ''];

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

    const boardState = TEST_BOARD;
    // [ ['', 'X', ''],['', 'O', ''],['', '', '']]
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


const displayController = ( (doc) => {
    // function used by eventListener
    // if empty, place an 'X' or 'O' depending on if player 1 or player 2
    const _placeMove = (evt) => {
        if(!evt.target.textContent) {
            evt.target.textContent = '?';
        }

        console.log(`Cell number: ${evt.target.dataset.cellNumber}`);
    }

    const renderGameBoard = (boardArr) => {
        const gameBoardContainer = doc.querySelector('.gameBoard');
        const gameBoardCells = gameBoardContainer.children;

        // console.log(cells);
        
        // for each board array slot
        for(let i = 0; i < boardArr.length; i++) {
            let cellDiv = gameBoardCells[i];
            cellDiv.innerHTML = boardArr[i];
            cellDiv.addEventListener('click', _placeMove);
        }

        console.log(Array
                        .from(gameBoardCells)
                        .map(cell => cell.textContent));
    }

    return {
        renderGameBoard
    };
}) (document);

// the outermost object
const game = ( () => {
    /* This function/module will invoke the displayController and handle click events from the player. */
    const myBoard = gameBoard; // creates board object filled with board slot objects.
    const controller = displayController;  // renders the board by reading from gameBoard.

    const placeMove = () => {
        
    }

    const run = () => {
        controller.renderGameBoard(myBoard.boardState);
    }

    return {
        run
    }
}) ();

// *--------- Factories
const playerFactory = {
    'name': null,
    'assigned': 'noughts'
}

// player1 = playerFactory('Luoxi', 'human');
// player2 = playerFactory('Hal', 'AI');

const runner = game;
runner.run();
