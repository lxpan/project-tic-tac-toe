// Project: Tic Tac Toe

// *--------- Modules

// represents current state of the game board (and actions that players can take?)
const gameBoard = {

}

// render contents of gameBoard array to webpage
const displayController = {

}

// the outermost object
const gameRunner = {

}

// *--------- Factories

const playerFactory = {

}

players = []
player1 = playerFactory('Luoxi', 'human');
player2 = playerFactory('Hal', 'AI');
players.push(player1, player2);

const gameInstance = gameRunner(players, gameBoard);
