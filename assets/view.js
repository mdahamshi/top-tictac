// import { myLibrary, addBookToLibrary } from "./model.js";
import { sb_utils } from "./utils.js";
const sb = sb_utils;

class View {
  constructor(board) {

    this.board = document.getElementById("board");
    this.colorize();
    this.dialog = document.getElementById("dialog-new-game");
    let dialog_close = document.getElementById("dialog-close");
    this.player1 = document.querySelector("#header-player-1 > h2");
    this.player2 = document.querySelector("#header-player-2 > h2");
    this.messages = document.getElementById("message-center");
    this.resetButton = document.getElementById("button-reset-game");
    dialog_close.addEventListener("click", () => {
      this.dialog.close();
    });
    sb.addCopyRight("TicTacToe");
    this.dialog.showModal();
    this.newBoard(board);
    this.isBoardLocked = false;
  }
  createCell(c) {
    const cell = document.createElement("button");
    cell.textContent = c.getValue();
    cell.classList.add("cell");
    return cell;
  }
  colorize(){
    document.documentElement.style.setProperty(
      "--sb-theme-color",
      sb.getRandomColor(true)
    );
  }
  boardLocked() {
    return this.isBoardLocked;
  }
  setMessage(msg) {
    this.messages.textContent = msg;
  }
  highlightWinning(winning) {
    winning.forEach(([r, c]) => {
      const el = document.querySelector(
        `.cell[data-row="${r}"][data-col="${c}"]`
      );
      if (el) el.classList.add("winning");
    });
    this.disableAllCells();
    this.isBoardLocked = true;
  }
  newBoard(b) {
    this.colorize();
    while (this.board.firstChild) {
      this.board.removeChild(this.board.firstChild);
    }
    this.isBoardLocked = false;
    let r = 0;
    b.forEach((row) => {
      let c = 0;
      row.forEach((cell) => {
        let cell_item = this.createCell(cell);
        cell_item.dataset.row = r;
        cell_item.dataset.col = c;
        this.board.appendChild(cell_item);
        c++;
      });
      r++;
    });
  }
  disableAllCells(){
    const cells = document.querySelectorAll('#board .cell');
    cells.forEach(button => button.disabled = true);
  }
  displayBoard(b) {
    let r = 0;
    b.forEach((row) => {
      let c = 0;
      row.forEach((cell) => {
        const cell_item = document.querySelector(
          `.cell[data-row="${r}"][data-col="${c}"]`
        );
        cell_item.textContent = cell.getValue();
        c++;
      });
      r++;
    });
  }

  bindStartGame(handler) {
    this.dialog.addEventListener("click", (event) => {
      if (event.target.id == "button-start-game") {
        event.preventDefault();

        let player1 = document.getElementById("player-1").value;
        let player2 = document.getElementById("player-2").value;
        this.player1.textContent = player1;
        this.player2.textContent = player2;

        this.dialog.close();

        handler({ player1, player2 });
      }
    });
  }
  bindResetGame(handler) {
    this.resetButton.addEventListener("click", (event) => {
      if (event.target.closest("#button-reset-game")) {
        handler();
      }
    });
  }

  bindCheckCell(handler) {
    this.board.addEventListener("click", (event) => {
      if (event.target.classList.contains("cell")) {
        if (this.boardLocked()) return;
        let cell = event.target;
        let row = parseInt(cell.dataset.row);
        let col = parseInt(cell.dataset.col);
        cell.disabled = true;
        handler(row, col);
      }
    });
  }
}

export { View };
