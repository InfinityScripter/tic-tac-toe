const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")

const startCells = [
  '', '', '',
  '', '', '',
  '', '', ''
]

function createBoard () {
startCells.forEach ((cell,index) => {
  const cellElement = document.createElement ("div")
  cellElement.classList.add("cell")
  cellElement.id = index
  cellElement.addEventListener("click", addXorO)
  gameBoard.append(cellElement)
})}

createBoard ()

function addXorO (e) {
  const display = document.createElement("div")
  display.classList.add("cross")
  e.target.append(display)
}
