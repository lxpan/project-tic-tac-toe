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
    const state = EMPTY_BOARD;
    const _victoryStatus = {
        'winner': null,
        'playerName': null,
        'type': null
    }

    const checkThreeInARow = (movesObj, winType) => {
        const movesArray = Array.from(movesObj);
        const allEqualX = movesArray.every(move => move === 'X');
        const allEqualO = movesArray.every(move => move === 'O');

        if(allEqualX) {
            _victoryStatus.winner = 1;
            _victoryStatus.type = winType;
        }
        else if(allEqualO) {
            _victoryStatus.winner = 2;
            _victoryStatus.type = winType;
        }
    }

    const checkBoardForVictory = (boardArr) => {
        const checkRowsForVictory = () => {
            // for each row, check if rows are allEqual
            for(let i = 0; i < 3; i++) {
                // checkThreeInARow(boardArr[i], 'horizontally');
                checkThreeInARow(boardArr[i], 'horizontally'); // 1, 2, or false
            }
        }
    
        const checkColumnsForVictory = () => {
            for(let col = 0; col < 3; col++) {
                const moves = [];
    
                for(let row = 0; row < 3; row++) {
                    moves.push(boardArr[row][col])
                }
    
                checkThreeInARow(moves, 'vertically');
            }
        }
    
        const checkDiagonalsForVictory = () => {
            let mainDiagonalMoves = [];
            // check main diagonal
            for(let i = 0; i < 3; i++) {
                mainDiagonalMoves.push(boardArr[i][i]);
            }
    
            // check reverse diagonal
            reverseDiagonalMoves = [];
            let row = 0; let col = 2;
            while(col >= 0) {
                reverseDiagonalMoves.push(boardArr[row][col]);
                row++;
                col--;
            }
    
            checkThreeInARow(mainDiagonalMoves, 'on the main diagonal');
            checkThreeInARow(reverseDiagonalMoves, 'on the reverse diagonal');
        }

        checkRowsForVictory();
        checkColumnsForVictory();
        checkDiagonalsForVictory();    
        // return _victoryStatus;
    }

    const checkBoardForTie = (boardArr) => {
        const playerMovesOnly = boardArr.flat().filter(x => x == 'X' || x == 'O')

        if(playerMovesOnly.length == 9) {
            console.log('Tie detected!')
            return true;
        }
    }

    return {
        state,
        checkBoardForVictory,
        checkBoardForTie,
        _victoryStatus
    }
}) ();


const game = ( (doc) => {
    let board = gameBoard;
    // create players with default names
    let playerOne = playerFactory('Player 1', 1);
    let playerTwo = playerFactory('Player 2', 2);

    let currentPlayer = 1;
    let currentPlayerMove = null;

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
            board.state[playedRowNumber - 1][playedColumnNumber - 1] = currentPlayerMove;
        }

        // clear victory message on new round
        if(!board._victoryStatus.winner) {
            victoryDiv.textContent = '';
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
        board.checkBoardForVictory(board.state);

        if (board.checkBoardForTie(board.state)) {
            _resetGame();
        }

        // update the score if we have a winner
        if(board._victoryStatus.winner) {
            if(board._victoryStatus.winner == '1') {
                _updateScoreDOM(1, ++playerOne.score);
                board._victoryStatus.playerName = playerOne.name;
            }
            else if(board._victoryStatus.winner == '2') {
                _updateScoreDOM(2, ++playerTwo.score);
                board._victoryStatus.playerName = playerTwo.name;
            }
            victoryDiv.textContent = (board._victoryStatus.playerName) ?
                `Congratulations ${board._victoryStatus.playerName}! \n You have won!` :
                `Congratulations Player ${board._victoryStatus.playerName}! \n You have won!`;
            
            console.log(`Player ${board._victoryStatus.winner} has won ${board._victoryStatus.type}! Their score is now: ${playerOne.score}`);

            _resetGame();
        }
    }

    const _resetGame = () => {
        function resetVictoryObject(vObj) {
            vObj.winner = null;
            vObj.playerName = null;
            vObj.type = null;
        }

        board.state = [['', '', ''], ['', '', ''], ['', '', '']];
        
        resetVictoryObject(board._victoryStatus);
        
        currentPlayer = 1;
        currentPlayerMove = null;
        renderGameBoard();
    }

    const resetPlayerScores = () => {
        playerOne.score = 0;
        playerTwo.score = 0;
    }

    const renderGameBoard = () => {
        const gameBoardContainer = doc.querySelector('.gameBoard');
        const gameBoardCells = gameBoardContainer.children;
        
        // for each board array slot
        const flatArray = board.state.flat();
        
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
        playerTwo,
        _resetGame,
        _updateScoreDOM,
        resetPlayerScores
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

const gameInstance = game;
const gameBoardDiv = document.querySelector('.gameBoard');
const victoryDiv = document.querySelector('.victoryMessage');
const startBtn = document.querySelector('.start');
let canRestart = false;

setupModal();

const btn = document.querySelector('#submit');
const form = document.querySelector('#playerNameForm');

btn.addEventListener('click', readFormData);
startBtn.addEventListener('click', startOrRestartGame);

function startOrRestartGame() {
    gameBoardDiv.classList.remove('hidden');
    gameInstance.renderGameBoard();
    startBtn.textContent = 'Restart';
    startMode = 'restart';
    canRestart = true;

    if(canRestart) {
        gameInstance._resetGame();
        victoryDiv.textContent = '';

        // reset DOM score
        gameInstance._updateScoreDOM(1, 0);
        gameInstance._updateScoreDOM(2, 0);
        // reset player score
        gameInstance.resetPlayerScores();    
        canRestart = false;
    }
}
