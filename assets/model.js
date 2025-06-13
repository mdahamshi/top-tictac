import { sb_utils } from "./utils.js";
const sb = sb_utils;


function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = sb.createBoard(rows, columns, 
    boardRow => boardRow.push(Cell()));
  

  const getBoard = () => board;
  const fullBoard = () => {
    return board.every(row => 
        row.every(cell => ! cell.isEmpty())
    );
  };
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.table(boardWithCellValues);
  };
  const reset = () => {
    board.forEach(row => {
        row.forEach(cell => cell.addToken(''))
    });
  };
  return { getBoard, printBoard, reset, fullBoard };
}

function Cell() {
  let value = '';

  const addToken = (player) => {
    value = player;
  };
  const isEmpty = () => (value === '');
  const getValue = () => value;

  return {
    addToken,
    getValue,
    isEmpty
  };
}

export {Gameboard}