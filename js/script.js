const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const btnStart = document.querySelector('#btn-start');

// Player factory
const Player = (name, mark) => {
  const getName = () => name;
  const setMark = () => mark;
  const getMark = () => mark;
  return { getName, getMark, setMark };
};

// Board module
const board = (() => {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  const saveMark = (mark, pos) => arr[pos] = mark;
  return { saveMark, arr };
})();

// Game module
const game = (() => {
  const player1 = Player('Anthony', 'X');
  const player2 = Player('Redvan', 'O');

  const checkHorizontal = () => (
    (board.arr[0] === board.arr[1] && board.arr[1] === board.arr[2])
    || (board.arr[3] === board.arr[4] && board.arr[4] === board.arr[5])
    || (board.arr[6] === board.arr[7] && board.arr[7] === board.arr[8]));

  const checkVertical = () => (
    (board.arr[0] === board.arr[3] && board.arr[3] === board.arr[6])
    || (board.arr[1] === board.arr[4] && board.arr[4] === board.arr[7])
    || (board.arr[2] === board.arr[5] && board.arr[5] === board.arr[8]));

  const checkDiagonal = () => (
    (board.arr[0] === board.arr[4] && board.arr[4] === board.arr[8])
    || (board.arr[6] === board.arr[4] && board.arr[4] === board.arr[2]));

  const checkWinner = () => (checkDiagonal() || checkHorizontal() || checkVertical());

  // const checkEmptySpace = () => {
  //   board.arr.forEach((num) => {

  //   });
  // };

  // const checkDraw = () => {

  // };

  return { player1, player2, checkWinner };
})();

// 0 1 2
// 3 4 5
// 6 7 8

function render() {
  const playerX = Player(player1.value, Player.getMark);
  // const playerO = Player(player2.value, Player.setMark('O'));
  
  
  console.log(playerX, 'Game started!');
}

console.log(game.player1.getMark());
console.log(game.player2.getMark());

console.log(game.checkWinner());
// console.log('empty space: ', game.checkEmptySpace());

// player1.addEventListener

btnStart.addEventListener('click', render);
