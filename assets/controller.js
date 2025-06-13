import {Gameboard} from './model.js'
import { View } from "./view.js";

function Controller(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = Gameboard();
  const view = new View(board.getBoard());
  
  const players = [
    {
      name: playerOneName,
      token: 'X',
    },
    {
      name: playerTwoName,
      token: 'O',
    },
  ];


  view.bindStartGame(
    (p) => {
        players[0].name = p.player1;
        players[1].name = p.player2;
        board.reset();
        printNewRound();

    }   
  );


  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    view.setMessage(`${getActivePlayer().name}'s turn.`)
    console.log(`${getActivePlayer().name}'s turn.`);
  };
  const displayBoard = board => {
    view.displayBoard(board);
  };
  const newBoard = board => {
    view.newBoard(board);
  };
  const checkWin = (row, col, player) => {
    let board_arr = board.getBoard();
    //check row
    if(board_arr[row].every(cell => cell.getValue() == player))
        return [[row, 0], [row, 1], [row, 2]];
    //check col
    let board_cols_at_row = board_arr.map(element => element[col]);
    if(board_cols_at_row.every(cell => cell.getValue() == player))
        return [[0, col], [1, col], [2, col]];
    // check diagonal
    if(col == row || 2 == Math.abs((col - row))){
        if([0, 1, 2].every(i => board_arr[i][i].getValue() === player))
            return [[0, 0], [1, 1], [2, 2]];

        if([0, 1, 2].every(i => board_arr[i][2 - i].getValue() === player))
            return [[0, 2], [1, 1], [2, 0]];

    }

    return false;

  };
  const playRound = (row, column) => {
    console.log(
      `Checking ${getActivePlayer().name}'s token into cell[${row},${column}] ...`
    );
    
    let cell = board.getBoard()[row][column];

    if(! cell.isEmpty()){
        view.setMessage('Cell already taken..');
        console.log('Cell already taken..');
        return;
    }
    
    cell.addToken(getActivePlayer().token);
    let message = 0;
    let res = checkWin(row, column, getActivePlayer().token);
    if(res){
        message = `${getActivePlayer().name} WIN!!`;
        view.highlightWinning(res);
    }
    else if(board.fullBoard())
        message = 'Draw !';
    
    if(message){
        board.printBoard();
        view.setMessage(message);
        console.log(message);
        displayBoard(board.getBoard());
        return;        
    }

    displayBoard(board.getBoard());

    switchPlayerTurn();
    printNewRound();
    view.setMessage(`${getActivePlayer().name}'s turn.`);
  };
    displayBoard(board.getBoard());

  view.bindCheckCell(playRound);
  view.bindResetGame(() => {
        board.reset();
        printNewRound();
        newBoard(board.getBoard());

  });

  // For the console version, we will only use playRound, but we will need
  // getActivePlayer for the UI version, so I'm revealing it now
  return {
    playRound,
    getActivePlayer,
  };


}



const game = Controller();

document.game = game;

