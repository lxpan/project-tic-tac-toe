// Project: Tic Tac Toe

// *--------- Modules

// store the game board as an array inside this object
TEST_BOARD = [['X', 'X', 'O'], ['X', 'O', 'O'], ['', '', 'X']];
EMPTY_BOARD = [['', '', ''], ['', '', ''], ['', '', '']];

const gameBoard = ( () => {
    // const boardState = TEST_BOARD;
    const boardState = EMPTY_BOARD;

    const validateVictory = (movesObj, winType) => {
        const movesArray = Array.from(movesObj);

        const allEqualX = movesArray.every(move => move === 'X');
        const allEqualO = movesArray.every(move => move === 'O');

        if(allEqualX) console.log(`Player X wins ${winType}!`);
        if(allEqualO) console.log(`Player O wins ${winType}!`);
    }

    const checkRowsForVictory = () => {
        // for each row, check if rows are allEqual
        for(let i = 0; i < 3; i++) {
            validateVictory(boardState[i], 'horizontally');
        }
    }

    const checkColumnsForVictory = () => {
        for(let col = 0; col < 3; col++) {
            const moves = [];

            for(let row = 0; row < 3; row++) {
                moves.push(boardState[row][col])
            }

            validateVictory(moves, 'vertically');
        }
    }

    const checkDiagonalsForVictory = () => {
        let mainDiagonalMoves = [];
        // check main diagonal
        for(let i = 0; i < 3; i++) {
            mainDiagonalMoves.push(boardState[i][i]);
        }

        // check reverse diagonal
        reverseDiagonalMoves = [];
        let row = 0; let col = 2;
        while(col >= 0) {
            reverseDiagonalMoves.push(boardState[row][col]);
            row++;
            col--;
        }

        console.log(reverseDiagonalMoves);
        validateVictory(mainDiagonalMoves, 'on the main diagonal');
        validateVictory(reverseDiagonalMoves, 'on the reverse diagonal');
    }

    const checkBoardForVictory = () => {
        checkRowsForVictory();
        checkColumnsForVictory();
        checkDiagonalsForVictory();    
    }

    return {
        boardState,
        checkBoardForVictory
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
            // console.log(`Row: ${playedRowNumber}, Col: ${playedColumnNumber}`);
            // console.log(board.boardState);
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
        board.checkBoardForVictory();
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
const playerFactory = (name, order) => {
    const getName = () => name;
    const getPlayerOrder = () => order;
    const score = 0;

    return {
        getName,
        getPlayerOrder,
        score
    }

}

// player1 = playerFactory('Luoxi', 'human');
// player2 = playerFactory('Hal', 'AI');

const runner = gameRunner;
runner.run();
