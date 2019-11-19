/* eslint-disable no-alert */

const input1 = document.querySelector('#player1');
const input2 = document.querySelector('#player2');
const btnStart = document.querySelector('#btn-start');
const startGameSection = document.querySelector('#start-game-section');
const tictactoe = document.querySelector('#tictactoe');
const restart = document.querySelector('#restart');
const cells = document.querySelectorAll('td[data-name]');
const endDiv = document.querySelector('.end-game');
const endTitle = document.querySelector('#restart-title');



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

  const checkWinner = (arr) => (checkDiagonal(arr) || checkHorizontal(arr) || checkVertical(arr));

  const checkDraw = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      const element = arr[i];

      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(element)) {
        return false;
      }
    }
    return true;

  };

  return { checkWinner, checkDraw };
})();


// Game Controller module
const gameController = (() => {
  let players = [];
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

  const restartGame = () => {
    startGameSection.classList.toggle('hidden');
    tictactoe.classList.toggle('hidden');
    endDiv.classList.toggle('hidden');
    input1.value = '';
    input2.value = '';
    players = [];
    board.arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    turn = true;
    cells.forEach((cell) => {
      cell.innerHTML = '';
    });
  };
  
  // eslint-disable-next-line func-names
  const render = function () {
    const currentPlayer = turn ? players[0] : players[1];

    board.arr.forEach((key) => {
      if (this.dataset.name === key) {
        board.arr[key] = currentPlayer.mark;
        turn = !turn;
        cells[key].innerHTML = currentPlayer.mark;
        // console.log(board.arr[key]);
        if (game.checkWinner(board.arr)) {
          // console.log('win!');
          endDiv.classList.toggle('hidden');
          endTitle.innerHTML = `${currentPlayer.name} wins!`;
        }
        else if (game.checkDraw(board.arr)) {
          endDiv.classList.toggle('hidden');
          endTitle.innerHTML = `${players[0].name} - ${players[1].name} DRAW!`;
        }
        
      }
    });
  };


  return { startGame, render, restartGame };
})();

cells.forEach((cell) => cell.addEventListener('click', gameController.render));

btnStart.addEventListener('click', gameController.startGame);
// btnStart.addEventListener('click', gameController.render);
restart.addEventListener('click', gameController.restartGame);
