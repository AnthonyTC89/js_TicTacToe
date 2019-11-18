/* eslint-disable no-alert */

const input1 = document.querySelector('#player1');
const input2 = document.querySelector('#player2');
const btnStart = document.querySelector('#btn-start');
const startGameSection = document.querySelector('#start-game-section');
const tictactoe = document.querySelector('#tictactoe');
const restart = document.querySelector('#restart');
const cells = document.querySelectorAll('td[data-name]');



// const cellTest = document.querySelector('td[data-name="1"]');

// cellTest.addEventListener('click', test);

// Player factory
const Player = (name, mark) => {
  return { name, mark };
};

// Board module
const board = (() => {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  const saveMark = (mark, pos) => {
    arr[pos] = mark;
  };
  return { saveMark, arr };
})();

// Game module
const game = (() => {

  const checkHorizontal = (arr) => (
    (arr[0] === arr[1] && arr[1] === arr[2])
    || (arr[3] === arr[4] && arr[4] === arr[5])
    || (arr[6] === arr[7] && arr[7] === arr[8]));

  const checkVertical = (arr) => (
    (arr[0] === arr[3] && arr[3] === arr[6])
    || (arr[1] === arr[4] && arr[4] === arr[7])
    || (arr[2] === arr[5] && arr[5] === arr[8]));

  const checkDiagonal = (arr) => (
    (arr[0] === arr[4] && arr[4] === arr[8])
    || (arr[6] === arr[4] && arr[4] === arr[2]));

  const checkWinner = () => (checkDiagonal() || checkHorizontal() || checkVertical());



  return { checkWinner };
})();


// Game Controller module
const gameController = (() => {
  const players = [];
  let turn = true;
  const startGame = () => {
    if (!input1.value && !input2.value) {
      return alert('Please fill up the players names!');
    }
    const player1 = Player(input1.value, 'X');
    const player2 = Player(input2.value, 'O');

    players.push(player1, player2);
    startGameSection.classList.toggle('hidden');
    tictactoe.classList.toggle('hidden');
    
    return { players };
  };
  
  
  const render = () => {
  };
  
  const restartGame = () => {
    startGameSection.classList.toggle('hidden');
    tictactoe.classList.toggle('hidden');
    input1.value = '';
    input2.value = '';
    board.arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    turn = true;
  };
  
  const test = function (e) {
    console.log(e);
    board.arr.forEach((key) => {

      const currentPlayer = turn ? players[0] : players[1];
      if (this.dataset.name === key) {
        // key = player1.mark;
        // console.log(key, players[0].mark);
        // console.log(players);
        
        
        board.arr[key] = currentPlayer.mark;
        turn = !turn;
        console.log(board.arr);
      }
    });
  };


  return { startGame, render, restartGame, test };
})();




cells.forEach((cell) => cell.addEventListener('click', gameController.test));

btnStart.addEventListener('click', gameController.startGame);
// btnStart.addEventListener('click', gameController.render);
restart.addEventListener('click', gameController.restartGame);
