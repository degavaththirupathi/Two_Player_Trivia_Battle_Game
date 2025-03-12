const apiUrl = "https://the-trivia-api.com/v2/questions";
let player1Name, player2Name;
let player1Score = 0, player2Score = 0;
let currentPlayer = 1;
let categories = [];
let usedCategories = [];
let questions = [];
let currentQuestionIndex = 0;

document.getElementById("startGame").addEventListener("click", startGame);
document.getElementById("nextCategory").addEventListener("click", nextCategoryHandler);
document.getElementById("endGame").addEventListener("click", endGame);

async function startGame() {
  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;
  if (!player1Name || !player2Name) {
    alert("Please enter both players' names.");
    return;
  }
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  await fetchCategories();
}

async function fetchCategories() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  categories = [...new Set(data.map(q => q.category))].filter(c => !usedCategories.includes(c));
  if (categories.length === 0) {
    endGame();
    return;
  }
  displayCategories();
}

function displayCategories() {
  const categoriesDiv = document.getElementById("categories");
  categoriesDiv.innerHTML = categories.map(category => `
    <button onclick="selectCategory('${category}')">${category}</button>
  `).join("");
  document.getElementById("categorySelection").classList.remove("hidden");
}

async function selectCategory(category) {
  usedCategories.push(category);
  // Fetch 2 easy, 2 medium, and 2 hard questions
  const easyQuestions = await fetchQuestions(category, "easy", 2);
  const mediumQuestions = await fetchQuestions(category, "medium", 2);
  const hardQuestions = await fetchQuestions(category, "hard", 2);
  questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
  document.getElementById("categorySelection").classList.add("hidden");
  document.getElementById("questionSection").classList.remove("hidden");
  showNextQuestion();
}

async function fetchQuestions(category, difficulty, limit) {
  const response = await fetch(`${apiUrl}?categories=${encodeURIComponent(category)}&difficulties=${difficulty}&limit=${limit}`);
  return await response.json();
}

function showNextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById("nextCategory").classList.remove("hidden");
    document.getElementById("endGame").classList.remove("hidden");
    document.getElementById("questionSection").classList.add("hidden");
    return;
  }
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question.text;
  const options = shuffle([...question.incorrectAnswers, question.correctAnswer]);
  document.getElementById("options").innerHTML = options.map(option => `
    <button onclick="checkAnswer('${option}', '${question.correctAnswer}')">${option}</button>
  `).join("");
  currentQuestionIndex++;
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    const points = getPoints(questions[currentQuestionIndex - 1].difficulty);
    if (currentPlayer === 1) {
      player1Score += points;
    } else {
      player2Score += points;
    }
    updateScores();
  }
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  showNextQuestion();
}

function getPoints(difficulty) {
  switch (difficulty) {
    case "easy": return 10;
    case "medium": return 15;
    case "hard": return 20;
    default: return 0;
  }
}

function updateScores() {
  document.getElementById("player1Score").textContent = `${player1Name}: ${player1Score}`;
  document.getElementById("player2Score").textContent = `${player2Name}: ${player2Score}`;
}

function endGame() {
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  let resultText;
  if (player1Score > player2Score) {
    resultText = `${player1Name} wins!`;
  } else if (player2Score > player1Score) {
    resultText = `${player2Name} wins!`;
  } else {
    resultText = "It's a tie!";
  }
  document.getElementById("result").innerHTML = `<h2>Game Over!</h2><p>${resultText}</p>`;
}

function shuffle(array) {
  return array.sort(() => Math.random()-0.5)
}

// New function to handle "Next Category" button click
async function nextCategoryHandler() {
  currentQuestionIndex = 0; // Reset question index
  document.getElementById("nextCategory").classList.add("hidden");
  document.getElementById("endGame").classList.add("hidden");
  await fetchCategories(); // Fetch new categories
}
