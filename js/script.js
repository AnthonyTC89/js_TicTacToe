const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return { getName, getMark };
};

const board = (() => {
  const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  const saveMark = (mark, pos) => arr[pos] = mark;
  return { saveMark, arr };
})();

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

  return { player1, player2, checkWinner };
})();

console.log(game.player1.getMark());
console.log(game.player2.getMark());

console.log(game.checkWinner());
