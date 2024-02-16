let currentPlayer = 'X';
let gameActive = false; // Set to false initially, until names are entered
let gameState = ["", "", "", "", "", "", "", "", ""];
let player1Name = 'X';
let player2Name = 'O';

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const playerMove = (cellIndex) => {
  if (!gameActive || gameState[cellIndex] !== "") return; // Game inactive or cell already marked
  gameState[cellIndex] = currentPlayer;
  document.querySelectorAll('.cell')[cellIndex].innerText = currentPlayer;
  handleResultValidation();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameActive = false;
    const winner = currentPlayer === 'X' ? player1Name : player2Name;
    displayResultScreen(`${winner} wins!`);
    return;
  }

  if (!gameState.includes("")) {
    gameActive = false;
    displayResultScreen(`It's a draw!`);
    return;
  }
};

// Function to display game results in modal
const displayResultScreen = (result) => {
  const modal = document.getElementById("modal");
  const resultMessage = document.getElementById("result-message");
  resultMessage.innerText = result;
  modal.style.display = "block";
}

// Function to start a new game
const startNewGame = () => {
  player1Name = document.getElementById('player1Input').value.trim() || 'X';
  player2Name = document.getElementById('player2Input').value.trim() || 'O';
  document.getElementById('player1Name').innerText = player1Name;
  document.getElementById('player2Name').innerText = player2Name;
  
  document.getElementById('form').style.display = 'none';
  document.getElementById('game-board').style.display = 'grid'; // Show the game board
  gameActive = true;
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.getElementById('message').innerText = '';
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
  });
};

// Function to start a new game after game end
const newGame = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none"; // Hide the result modal
  document.getElementById('form').style.display = 'block';
  document.getElementById('game-board').style.display = 'none';
  document.getElementById('player1Input').value = '';
  document.getElementById('player2Input').value = '';
  document.getElementById('player1Name').innerText = 'X';
  document.getElementById('player2Name').innerText = 'O';
  
  // Reset game state
  gameActive = false;
  currentPlayer = 'X';
  gameState = ["", "", "", "", "", "", "", "", ""];
  document.getElementById('message').innerText = '';
  
  // Clear cell contents
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
  });
};

// Close modal when the close button is clicked
document.getElementById("close").onclick = function() {
  closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    closeModal();
  }
}

// Close modal function
const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
