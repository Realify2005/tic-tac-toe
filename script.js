const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const findWinner = () => {
    const board = GameBoard.getBoard();
    let boxFilled = 0;

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return "winner";
      }
    }

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        break;
      }
      boxFilled++;

      if (boxFilled === 9) {
        return "draw";
      }
    }
    return null;
  };

  const makeMove = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return {
    getBoard,
    makeMove,
    resetBoard,
    findWinner,
  };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const playGame = () => {
  let currentPlayer = player1;
  const winnerText = document.querySelector(".winner-announcer");
  const boxes = document.querySelectorAll("td");

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const resetGame = () => {
    GameBoard.resetBoard();
    currentPlayer = player1;
    winnerText.textContent = "";
    boxes.forEach((box) => {
      box.textContent = "";
      box.addEventListener("click", handleClick);
    });
  };

  const playRound = (index) => {
    GameBoard.makeMove(parseInt(index), currentPlayer.marker);
    switchPlayer();
  };

  const disableBoxes = () => {
    boxes.forEach((box) => {
      box.removeEventListener("click", handleClick);
    });
  };

  const checkWinner = () => {
    const winner = GameBoard.findWinner();
    if (winner === "winner") {
      winnerText.textContent = `Game ended. Winner is ${currentPlayer.name}!`;
      disableBoxes();
    } else if (winner === "draw") {
      winnerText.textContent =
        "Game has ended in a draw. Click reset to play again";
    }
  };

  const handleClick = (e) => {
    const box = e.target;
    if (box.textContent === "") {
      index = box.getAttribute("id");
      box.textContent = currentPlayer.marker;
      playRound(index);
      console.log(GameBoard.getBoard()); //delete after
      checkWinner();
    }
  };

  boxes.forEach((box) => {
    box.addEventListener("click", handleClick);
  });

  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", function () {
    resetGame();
  });
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

playGame();
