// Project: Tic Tac Toe

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

// *--------- Modules

// store the game board as an array inside this object
TEST_BOARD = [['X', 'X', 'O'], ['X', 'O', 'O'], ['', '', 'X']];
EMPTY_BOARD = [['', '', ''], ['', '', ''], ['', '', '']];

const gameBoard = ( () => {
    // const boardState = TEST_BOARD;
    const boardState = EMPTY_BOARD;


    const resetBoard = () => {
        return [['', '', ''], ['', '', ''], ['', '', '']];
        // boardState = [['', '', ''], ['', '', ''], ['', '', '']];
    }

    const resetVictoryStatus = () => {
        return {
            'winner': null,
            'type': null
        }
    }

    return {
        boardState,
        // checkBoardForVictory,
        // victoryStatus,
        // resetBoard,
        // resetVictoryStatus
    }
}) ();

/* 
render contents of gameBoard array to webpage
input: boardState
action: modify DOM to display boardState
*/


const game = ( (doc) => {
    let board = gameBoard;
    let playerOne;
    let playerTwo;

    let currentPlayer = 1;
    let currentPlayerMove = null;
    let score = {
        'playerOne': 0,
        'playerTwo': 0,
    }

    let victoryStatus = {
        'winner': null,
        'type': null
    }

    const checkPlayerWin = (movesObj, winType) => {
        // console.log('Check for victory...');
        const movesArray = Array.from(movesObj);
        const allEqualX = movesArray.every(move => move === 'X');
        const allEqualO = movesArray.every(move => move === 'O');

        if(allEqualX) {
            victoryStatus.winner = 1;
            victoryStatus.type = winType;
        }
        else if(allEqualO) {
            victoryStatus.winner = 2;
            victoryStatus.type = winType;
        }
        // console.log(victoryStatus);
    }

    // function references a different boardState
    const checkBoardForVictory = () => {
        console.log(board.boardState);
        const checkRowsForVictory = () => {
            // for each row, check if rows are allEqual
            for(let i = 0; i < 3; i++) {
                checkPlayerWin(board.boardState[i], 'horizontally');
                // console.log(self.boardState[i]);
            }
        }
    
        const checkColumnsForVictory = () => {
            for(let col = 0; col < 3; col++) {
                const moves = [];
    
                for(let row = 0; row < 3; row++) {
                    moves.push(board.boardState[row][col])
                }
    
                checkPlayerWin(moves, 'vertically');
            }
        }
    
        const checkDiagonalsForVictory = () => {
            let mainDiagonalMoves = [];
            // check main diagonal
            for(let i = 0; i < 3; i++) {
                mainDiagonalMoves.push(board.boardState[i][i]);
            }
    
            // check reverse diagonal
            reverseDiagonalMoves = [];
            let row = 0; let col = 2;
            while(col >= 0) {
                reverseDiagonalMoves.push(board.boardState[row][col]);
                row++;
                col--;
            }
    
            checkPlayerWin(mainDiagonalMoves, 'on the main diagonal');
            checkPlayerWin(reverseDiagonalMoves, 'on the reverse diagonal');
        }

        checkRowsForVictory();
        checkColumnsForVictory();
        checkDiagonalsForVictory();    
    }

    const _updateScore = (player, score) => {
        const idName = (player == 1) ? 'playerOneScore' : 'playerTwoScore';
        const playerScore = doc.getElementById(idName);
        playerScore.textContent = score;
    }

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
                evt.target.textContent=  currentPlayerMove;
                currentPlayer = 1;
            }
        }

        _writePlayedMoveToBoard();
        // board.checkBoardForVictory();
        checkBoardForVictory();

        if(victoryStatus.winner) {
            if(victoryStatus.winner == '1') {
                _updateScore(1, ++score.playerOne);
            }
            else if(victoryStatus.winner == '2') {
                _updateScore(2, ++score.playerTwo);
            }
            
            console.log(`Player ${victoryStatus.winner} has won!`);

            // reset board
            // console.log(board.victoryStatus);
            _resetGame();
        }
    }

    const _resetGame = () => {
        // board.boardState = board.resetBoard();
        // board.resetBoard();
        // 
        board.boardState = [['', '', ''], ['', '', ''], ['', '', '']];

        victoryStatus = {
            'winner': null,
            'type': null
        }

        console.log(board.victoryStatus);
        
        currentPlayer = 1;
        currentPlayerMove = null;
        renderGameBoard();
    }

    const renderGameBoard = () => {
        const gameBoardContainer = doc.querySelector('.gameBoard');
        const gameBoardCells = gameBoardContainer.children;
        
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

function setupModal() {
    const modal = document.querySelector(".modal");
    const trigger = document.querySelector(".trigger");
    const closeButton = document.querySelector(".close-button");
    
    function toggleModal() {
        modal.classList.toggle("show-modal");
    }
    
    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }
    
    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}


const gameInstance = game;
gameInstance.renderGameBoard();

setupModal();

const btn = document.querySelector('#submit');
const form = document.querySelector('#playerNameForm');

function readFormData(e) {
    const modifyPlayerNameDOM = () => {
        let p1NameInput = document.getElementById('playerOneName');
        let p2NameInput = document.getElementById('playerTwoName');
    
        p1NameInput.textContent = formData.get('player1Name');
        p2NameInput.textContent = formData.get('player2Name');

        gameInstance.playerOne = playerFactory(formData.get('player1Name'), 1);
        gameInstance.playerTwo = playerFactory(formData.get('player2Name'), 2);
        // log players
        console.log(gameInstance.playerOne.getName(), gameInstance.playerTwo.getName());
    }

    // prevent the form from submitting
    e.preventDefault();

    // show the form values
    const formData = new FormData(form);
    const values = [...formData.entries()];
    console.log(values);

    modifyPlayerNameDOM();
}

btn.addEventListener('click', readFormData);
