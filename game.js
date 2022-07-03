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
    const board = gameBoard;

    let currentPlayer = 1;
    let currentPlayerMove = null;

    // function used by eventListener
    // if empty, place an 'X' or 'O' depending on if player 1 or player 2
    const _playMove = (evt) => {
        if(!evt.target.textContent) {
            if(currentPlayer === 1) {
                currentPlayerMove = 'X';
                evt.target.textContent = currentPlayerMove;
                currentPlayer = 2;
            }
            else {
                currentPlayerMove = 'O';
                evt.target.textContent = currentPlayerMove;
                currentPlayer = 1;
            }
        }

        // retrieve the cell number that was played
        const playedCellNumber = evt.target.dataset.cellNumber;
        // write current move to gameBoard array
        board.boardState[playedCellNumber - 1] = currentPlayerMove;
        console.log(`Cell number: ${playedCellNumber}`);
        console.log(board.boardState);
    }

    const renderGameBoard = () => {
        const gameBoardContainer = doc.querySelector('.gameBoard');
        const gameBoardCells = gameBoardContainer.children;

        // console.log(cells);
        
        // for each board array slot
        for(let i = 0; i < board.boardState.length; i++) {
            let cellDiv = gameBoardCells[i];
            cellDiv.innerHTML = board.boardState[i];
            cellDiv.addEventListener('click', _playMove);
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
const gameRunner = ( () => {
    /* This function/module will invoke the displayController and handle click events from the player. */
    const controller = displayController;  // renders the board by reading from gameBoard.

    const run = () => {
        controller.renderGameBoard();
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

const runner = gameRunner;
runner.run();
