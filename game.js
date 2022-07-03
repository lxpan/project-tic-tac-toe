// Project: Tic Tac Toe

// *--------- Modules

// store the game board as an array inside this object
TEST_BOARD = [['X', 'X', ''], ['O', 'O', ''], ['', '', '']];

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

    const validateVictory = (movesObj) => {
        const movesArray = Array.from(movesObj);

        const allEqualX = movesArray.every(move => move === 'X');
        const allEqualO = movesArray.every(move => move === 'O');

        if(allEqualX) console.log('Player X wins!');
        if(allEqualO) console.log('Player O wins!');
    }

    // const checkRowsForVictory = () => {
    //     let prev = 0;
        
    //     for(let i = 1; i<= 3; i++) {
    //         let index = null;
    //         let moves = [];
            
    //         for(let j = 1; j <= 3; j++) {
    //             index = prev + j;
    //             moves.push(boardState[index - 1])
    //             // console.log(index);
    //         }
    //         console.log(moves);
    //         validateVictory(moves);

            
    //         prev = index;
    //     }
    // }

    const checkRowsForVictory = () => {
        // for each row, check if rows are allEqual
        for(let i = 0; i < 3; i++) {
            validateVictory(boardState[i]);
        }
    }

    const checkColumnsForVictory = () => {
        let prev = 0;
        
        for(let i = 1; i<= 3; i++) {
            let index = null;
            let moves = [];
            
            for(let j = 1; j <= 3; j++) {
                index = prev + j;
                moves.push(boardState[index - 1])
                // console.log(index);
            }
            console.log(moves);
            validateVictory(moves);

            
            prev = index;
        }
    }

    

    return {
        boardState,
        checkRowsForVictory
    }
}) ();

/* 
render contents of gameBoard array to webpage
input: boardState
action: modify DOM to display boardState
*/


const game = ( (doc) => {
    const board = gameBoard;

    let currentPlayer = 1;
    let currentPlayerMove = null;

    // function used by eventListener
    // if empty, place an 'X' or 'O' depending on if player 1 or player 2
    const _playMove = (evt) => {
        const _writePlayedMoveToBoard = () => {
            // retrieve the cell number that was played
            const playedRowNumber = evt.target.dataset.rowNumber;
            const playedColumnNumber = evt.target.dataset.columnNumber;

            // write current move to gameBoard array
            board.boardState[playedRowNumber - 1][playedColumnNumber - 1] = currentPlayerMove;
            console.log(`Row: ${playedRowNumber}, Col: ${playedColumnNumber}`);
            console.log(board.boardState);
        }

        // Plays an 'X' if player 1's turn, an 'O' otherwise
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

        _writePlayedMoveToBoard();
        board.checkRowsForVictory();
    }

    const renderGameBoard = () => {
        const gameBoardContainer = doc.querySelector('.gameBoard');
        const gameBoardCells = gameBoardContainer.children;

        // console.log(cells);
        
        // for each board array slot
        const flatArray = board.boardState.flat();
        
        for(let i = 0; i < flatArray.length; i++) {
            let cellDiv = gameBoardCells[i];
            cellDiv.innerHTML = flatArray[i];
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
    const _game = game;  // renders the board by reading from gameBoard.

    const run = () => {
        _game.renderGameBoard();
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
