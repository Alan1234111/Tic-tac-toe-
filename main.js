(function () {
  const fields = [...document.querySelectorAll(".field")];

  let tableFields = [];
  let xTurn = true;

  function columnsWin(playerMark) {
    return (tableFields[0] == playerMark && tableFields[3] == playerMark && tableFields[6] == playerMark) || (tableFields[1] == playerMark && tableFields[4] == playerMark && tableFields[7] == playerMark) || (tableFields[2] == playerMark && tableFields[5] == playerMark && tableFields[8] == playerMark);
    if ((tableFields[0] == playerMark && tableFields[3] == playerMark && tableFields[6] == playerMark) || (tableFields[1] == playerMark && tableFields[4] == playerMark && tableFields[7] == playerMark) || (tableFields[2] == playerMark && tableFields[5] == playerMark && tableFields[8] == playerMark)) {
      return true;
    } else {
      return false;
    }
  }

  function rowsWin(playerMark) {
    return (tableFields[0] == playerMark && tableFields[1] == playerMark && tableFields[2] == playerMark) || (tableFields[3] == playerMark && tableFields[4] == playerMark && tableFields[5] == playerMark) || (tableFields[6] == playerMark && tableFields[7] == playerMark && tableFields[8] == playerMark);
    // return true;
    // } else {
    // return false;
    // }
  }

  function diagonallyWin(playerMark) {
    return (tableFields[0] == playerMark && tableFields[4] == playerMark && tableFields[8] == playerMark) || (tableFields[2] == playerMark && tableFields[4] == playerMark && tableFields[6] == playerMark);
    // if ((tableFields[0] == playerMark && tableFields[4] == playerMark && tableFields[8] == playerMark) || (tableFields[2] == playerMark && tableFields[4] == playerMark && tableFields[6] == playerMark)) {
    // return true;
    // } else {
    // return false;
    // }
  }

  function isWin(mark) {
    if (columnsWin(mark) || rowsWin(mark) || diagonallyWin(mark)) {
      return true;
    } else {
      return false;
    }
  }

  function renderGameBoard() {
    for (const field in fields) {
      fields[field].textContent = tableFields[field];
    }
  }

  function fillField() {
    if (tableFields[this.id - 1]) return;

    let mark = "X";
    xTurn ? (mark = "X") : (mark = "O");

    xTurn = !xTurn;

    tableFields[this.id - 1] = mark;
    renderGameBoard();
    isWin(mark);
  }

  fields.forEach((field) => field.addEventListener("click", fillField));
})();

// render contests of gameboard
