(function () {
  const fields = [...document.querySelectorAll(".field")];

  let tableFields = [];
  let xTurn = true;

  function renderGameBoard() {
    for (const field in fields) {
      fields[field].textContent = tableFields[field];
    }

  }

  function fillField() {
    if (tableFields[this.id - 1]) return;

    xTurn ? (tableFields[this.id - 1] = "X") : (tableFields[this.id - 1] = "O");
    xTurn = !xTurn;
    renderGameBoard();
  }

  fields.forEach((field) => field.addEventListener("click", fillField));
})();

// render contests of gameboard
