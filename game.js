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
    const victoryTracker = {
        'winner': null,
        'type': null
    }

    const checkThreeInARow = (movesObj, winType) => {
        const movesArray = Array.from(movesObj);
        const allEqualX = movesArray.every(move => move === 'X');
        const allEqualO = movesArray.every(move => move === 'O');

        if(allEqualX) {
            victoryTracker.winner = 1;
            victoryTracker.type = winType;
        }
        else if(allEqualO) {
            victoryTracker.winner = 2;
            victoryTracker.type = winType;
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
        return victoryTracker;
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
        victoryTracker
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

    const victoryDiv = document.querySelector('.victoryMessage');

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
        if(!victoryStatus.winner) {
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

        // this needs to mutate victoryStatus
        // return: who won, win type
        victoryStatus = board.checkBoardForVictory(board.state);

        if (board.checkBoardForTie(board.state)) {
            _resetGame();
        }

        // update the score if we have a winner
        if(victoryStatus.winner) {
            if(victoryStatus.winner == '1') {
                _updateScoreDOM(1, ++playerOne.score);
            }
            else if(victoryStatus.winner == '2') {
                _updateScoreDOM(2, ++playerTwo.score);
            }

            victoryDiv.textContent = `Congratulations Player ${victoryStatus.winner}! You have won!`;
            
            console.log(`Player ${victoryStatus.winner} has won ${victoryStatus.type}! Their score is now: ${playerOne.score}`);

            _resetGame();
        }
    }

    const _resetGame = () => {
        function resetVictoryObject(vObj) {
            vObj.winner = null;
            vObj.type = null;
        }

        board.state = [['', '', ''], ['', '', ''], ['', '', '']];

        resetVictoryObject(board.victoryTracker);
        resetVictoryObject(victoryStatus);
        
        currentPlayer = 1;
        currentPlayerMove = null;
        renderGameBoard();
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
