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
  let isGameOver = false;

  let player1 = playerFactory("player1", "X", false, true);
  let player2 = undefined;

  function createSecondPlayer() {
    if (mode == "player") return playerFactory("player2", "O", false, false);
    if (mode == "easy") return playerFactory("AiEasy", "O", true, false);
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

    if (allFilledUp.length === 9 && !isGameOver) {
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
          isGameOver = true;
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

  function easyMode(field) {
    if (field) {
      board[field.id - 1] = player1.mark;
      fields[field.id - 1].style.color = "#ee6c4d";
      renderGameBoard(field);
    }

    if (isGameOver) return;

    const randomIndex = Math.floor(Math.random() * 9);

    const allFilledUp = fields.filter((field) => field.textContent);

    if (fields[randomIndex].textContent && allFilledUp.length !== 9) {
      return easyMode();
    }

    board[randomIndex] = player2.mark;
    fields[randomIndex].style.color = "#98c1d9";

    setTimeout(() => {
      renderGameBoard(fields[randomIndex]);
    }, 200);
  }

  function playVsComputer(field) {
    if (mode == "easy") return easyMode(field);
  }

  function playVsUser(field) {
    if (player1.turn) {
      board[field.id - 1] = player1.mark;
      fields[field.id - 1].style.color = "#ee6c4d";
    } else {
      board[field.id - 1] = player2.mark;
      fields[field.id - 1].style.color = "#98c1d9";
    }

    player1.turn = !player1.turn;
    player2.turn = !player2.turn;

    renderGameBoard(field);
  }

  function fillField() {
    if (board[this.id - 1]) return;

    player2.ai == true ? playVsComputer(this) : playVsUser(this);
  }

  function reset() {
    board = [];
    renderGameBoard();

    btnReplay.classList.add("hide");
    winInfo.classList.add("hide");

    fields.forEach((field) => {
      field.classList.remove("win");
      field.style.opacity = "0";
      field.style.pointerEvents = "fill";
    });

    player1.turn = true;
    player2.turn = false;
    isGameOver = false;
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
