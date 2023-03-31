const gameBoard = document.querySelector ("#gameboard")
const infoDisplay = document.querySelector ("#info")

const startCells = [
  '', '', '',
  '', '', '',
  '', '', ''
]

let go = "circle"
infoDisplay.textContent = `${go}'s turn`

function createBoard() {
  startCells.forEach ((cell, index) => {
    const cellElement = document.createElement ("div")
    cellElement.classList.add ("cell")
    cellElement.id = index
    cellElement.addEventListener ("click", addXorO)
    gameBoard.append (cellElement)
  })
}

createBoard ()

function addXorO(e) {
  const display = document.createElement("div");
  display.classList.add(go);
  e.target.append(display);
  go = go === "circle" ? "cross" : "circle";
  e.target.removeEventListener("click", addXorO);
  checkScore();

  // Если после хода человека нет победителя, делаем ход AI
  if (infoDisplay.textContent !== "Circle WINS!") {
    aiMove();
  }
}

function aiMove() {
  const allCells = document.querySelectorAll(".cell");
  const emptyCells = Array.from(allCells).filter(cell => cell.firstChild === null);

  // Если есть пустые клетки, выбираем случайную и делаем ход
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiCell = emptyCells[randomIndex];

    const display = document.createElement("div");
    display.classList.add(go);
    aiCell.append(display);
    go = go === "circle" ? "cross" : "circle";
    aiCell.removeEventListener("click", addXorO);
    checkScore();
  }
}


function checkScore() {
  const allCells = document.querySelectorAll (".cell")
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  winningCombos.forEach ((combo) => {
    const circleWins = combo.every (cell => allCells[cell].firstChild?.classList.contains ('circle'))
    if (circleWins) {
      infoDisplay.textContent = "Circle WINS!"
      allCells.forEach(square=> square.replaceWith(square.cloneNode(true)))
      return
    }
  })

  winningCombos.forEach ((combo) => {
    const crossWins = combo.every (cell => allCells[cell].firstChild?.classList.contains ('cross'))
    if (crossWins) {
      infoDisplay.textContent = "Cross WINS!"
      allCells.forEach(square=> square.replaceWith(square.cloneNode(true)))
      return
    }
  })

}


function restartPage() {
  location.reload();
}
