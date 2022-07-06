// Project: Tic Tac Toe

// *--------- Factories
const playerFactory = (_name, _order) => {
    let name = _name;
    let order = _order;
    const score = 0;
    return {
        name,
        order,
        score
    }
}

// *--------- Modules

// store the game board as an array inside this object
TEST_BOARD = [['X', 'X', 'O'], ['X', 'O', 'O'], ['', '', 'X']];
EMPTY_BOARD = [['', '', ''], ['', '', ''], ['', '', '']];

const gameBoard = ( () => {
    const boardState = EMPTY_BOARD;

    return {
        boardState
    }
}) ();


const game = ( (doc) => {
    let board = gameBoard;
    // create players with default names
    let playerOne = playerFactory('Player 1', 1);
    let playerTwo = playerFactory('Player 2', 2);

    let currentPlayer = 1;
    let currentPlayerMove = null;

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
    }

    const checkBoardForVictory = () => {
        const checkRowsForVictory = () => {
            // for each row, check if rows are allEqual
            for(let i = 0; i < 3; i++) {
                checkPlayerWin(board.boardState[i], 'horizontally');
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

    const _updateScoreDOM = (player, score) => {
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
                _updateScoreDOM(1, ++playerOne.score);
                console.log(playerOne.score);
            }
            else if(victoryStatus.winner == '2') {
                _updateScoreDOM(2, ++playerTwo.score);
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
        renderGameBoard,
        playerOne,
        playerTwo
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

        gameInstance.playerOne.name = formData.get('player1Name');
        gameInstance.playerTwo.name = formData.get('player2Name');
        // log players
        console.log(gameInstance.playerOne.name + gameInstance.playerTwo.name);
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
