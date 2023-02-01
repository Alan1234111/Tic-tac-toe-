const gameBoard = (() => {
  const fields = [...document.querySelectorAll(".field")];
  const btnReplay = document.querySelector(".btn-replay");
  const winInfo = document.querySelector(".win-info");
  const firstScreen = document.querySelector(".game-options");
  const secondScreen = document.querySelector(".board-section");

  const playerFactory = (name, mark, ai, turn) => {
    return {name, mark, ai, turn};
  };

  let mode = "easy";

  let board = [];

  let winCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
  ];

  let player1 = playerFactory("player1", "X", false, true);
  let player2 = undefined;

  function createSecondPlayer() {
    if (mode == "player") return playerFactory("player2", "O", false, false);
  }

  function chooseMode() {
    firstScreen.classList.add("hide");
    secondScreen.classList.remove("hide");

    mode = this.id;
    player2 = createSecondPlayer();
  }

  function displayWinner(mark) {
    btnReplay.classList.remove("hide");
    winInfo.classList.remove("hide");

    if (mark == "tie") return (winInfo.textContent = "It's a tie");

    winInfo.textContent = `${mark} Wins the round`;
  }

  function endGame() {
    fields.forEach((field) => {
      field.style.pointerEvents = "none";
    });
  }

  function isTie() {
    const allFilledUp = fields.filter((field) => field.textContent);
    const isWinField = allFilledUp.some((filledUp) => filledUp.classList.contains("win"));

    if (allFilledUp.length === 9 && !isWinField) {
      displayWinner("tie");
      return endGame();
    }
  }

  function isWin() {
    winCombos.forEach((winCombo) => {
      if (!board[winCombo[0]] || !board[winCombo[1]] || !board[winCombo[2]]) return;

      if (board[winCombo[0]] == board[winCombo[1]] && board[winCombo[0]] == board[winCombo[2]]) {
        for (let i = 0; i < winCombo.length; i++) {
          fields[winCombo[i]].classList.add("win");
        }

        displayWinner(board[winCombo[0]]);
        return endGame();
      }
    });
  }

  function renderGameBoard(singleField) {
    for (const field in fields) {
      fields[field].textContent = board[field];
    }
    if (singleField) singleField.style.opacity = "1";

    isWin();
    isTie();
  }

  function fillField() {
    if (board[this.id - 1]) return;

    if (player1.turn) {
      board[this.id - 1] = player1.mark;
      fields[this.id - 1].style.color = "#ee6c4d";
    } else {
      // ai
      board[this.id - 1] = player2.mark;
      fields[this.id - 1].style.color = "#98c1d9";
    }

    player1.turn = !player1.turn;
    player2.turn = !player2.turn;

    renderGameBoard(this);
  }

  function reset() {
    board = [];
    renderGameBoard();

    btnReplay.classList.add("hide");
    winInfo.classList.add("hide");

    fields.forEach((field) => {
      console.log(field);
      field.classList.remove("win");
      field.style.opacity = "0";
      field.style.pointerEvents = "fill";
    });

    player1.turn = true;
    player2.turn = false;
  }

  function returnToStart() {
    firstScreen.classList.remove("hide");
    secondScreen.classList.add("hide");

    reset();
  }

  //event Listeners

  const modes = document.querySelectorAll(".game-options__modes li .btn");
  modes.forEach((mode) => mode.addEventListener("click", chooseMode));

  fields.forEach((field) => field.addEventListener("click", fillField));

  const btnBack = document.querySelector(".btn-back");
  btnBack.addEventListener("click", returnToStart);

  btnReplay.addEventListener("click", reset);
})();

//stworzyc 2 zawodnikow w zaleznosi od wybranego trybu

// (function () {
//   const fields = [...document.querySelectorAll(".field")];
//   const modes = document.querySelectorAll(".game-options__modes li .btn");
//   const firstScreen = document.querySelector(".game-options");
//   const secondScreen = document.querySelector(".board-section");
//   const btnBack = document.querySelector(".btn-back");

//   let tableFields = [];
//   let xTurn = true;

//   const playerFactory = (nick, playingMark, isComputer, mode) => {
//     this.nick = nick;
//     this.playerMark = playingMark;
//     this.isComputer = isComputer;
//     this.mode = mode;
//   };

//   const playerOne = playerFactory("player", "X", false);
//   // const playerTwo = null;

//   function chooseMode() {
//     firstScreen.classList.add("hide");
//     secondScreen.classList.remove("hide");
//     const playerTwo = playerFactory("Ai", "O", true, "easy");
//     console.log(this);
//   }

//   function returnToStart() {
//     firstScreen.classList.remove("hide");
//     secondScreen.classList.add("hide");
//     tableFields = [];
//     renderGameBoard();
//   }

//   function columnsWin(playerMark) {
//     return (tableFields[0] == playerMark && tableFields[3] == playerMark && tableFields[6] == playerMark) || (tableFields[1] == playerMark && tableFields[4] == playerMark && tableFields[7] == playerMark) || (tableFields[2] == playerMark && tableFields[5] == playerMark && tableFields[8] == playerMark);
//     if ((tableFields[0] == playerMark && tableFields[3] == playerMark && tableFields[6] == playerMark) || (tableFields[1] == playerMark && tableFields[4] == playerMark && tableFields[7] == playerMark) || (tableFields[2] == playerMark && tableFields[5] == playerMark && tableFields[8] == playerMark)) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   function rowsWin(playerMark) {
//     return (tableFields[0] == playerMark && tableFields[1] == playerMark && tableFields[2] == playerMark) || (tableFields[3] == playerMark && tableFields[4] == playerMark && tableFields[5] == playerMark) || (tableFields[6] == playerMark && tableFields[7] == playerMark && tableFields[8] == playerMark);
//     // return true;
//     // } else {
//     // return false;
//     // }
//   }

//   function diagonallyWin(playerMark) {
//     return (tableFields[0] == playerMark && tableFields[4] == playerMark && tableFields[8] == playerMark) || (tableFields[2] == playerMark && tableFields[4] == playerMark && tableFields[6] == playerMark);
//     // if ((tableFields[0] == playerMark && tableFields[4] == playerMark && tableFields[8] == playerMark) || (tableFields[2] == playerMark && tableFields[4] == playerMark && tableFields[6] == playerMark)) {
//     // return true;
//     // } else {
//     // return false;
//     // }
//   }

//   function isWin(mark) {
//     if (columnsWin(mark) || rowsWin(mark) || diagonallyWin(mark)) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   function renderGameBoard(singleField) {
//     for (const field in fields) {
//       fields[field].textContent = tableFields[field];
//     }
//     if (singleField) singleField.style.opacity = "1";
//   }

//   function fillField() {
//     if (tableFields[this.id - 1]) return;

//     let mark = "X";
//     xTurn ? (mark = "X") : (mark = "O");

//     xTurn = !xTurn;

//     tableFields[this.id - 1] = mark;
//     renderGameBoard(this);
//     isWin(mark);
//   }

//   fields.forEach((field) => field.addEventListener("click", fillField));
//   modes.forEach((mode) => mode.addEventListener("click", chooseMode));
//   btnBack.addEventListener("click", returnToStart);
// })();

// // render contests of gameboard
