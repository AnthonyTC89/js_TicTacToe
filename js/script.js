const input1 = document.querySelector('#player1');
const input2 = document.querySelector('#player2');
const btnStart = document.querySelector('#btn-start');
const startGameSection = document.querySelector('#start-game-section');
const tictactoe = document.querySelector('#tictactoe');
const restart = document.querySelector('#restart');

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
  const startGame = () => {
    if (!input1.value && !input2.value) {
      return alert('Please fill up the players names!');
    }
    const player1 = Player(input1.value, 'X');
    const player2 = Player(input2.value, 'O');

    
    return { player1, player2 };
  };
  
  const render = () => {
    startGameSection.classList.toggle('hidden');
    tictactoe.classList.toggle('hidden');
    
  };
  
  const restartGame = () => {
    startGameSection.classList.toggle('hidden');
    tictactoe.classList.toggle('hidden');
    input1.value = '';
    input2.value = '';
  };
  
  return { startGame, render, restartGame };
})();

btnStart.addEventListener('click', gameController.startGame);
btnStart.addEventListener('click', gameController.render);
restart.addEventListener('click', gameController.restartGame);
