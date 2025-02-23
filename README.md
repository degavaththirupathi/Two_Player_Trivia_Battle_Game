# 🎉 Two_Player_Trivia_Battle_Game

## 📝 Description
This project is a competitive two-player trivia game developed using HTML, CSS, and JavaScript. It leverages The Trivia API to fetch questions from selected categories, providing an engaging and dynamic gameplay experience. Players take turns answering questions, aiming to achieve the highest score. The game concludes when all selected categories have been exhausted or when players choose to end it early.

---

## 🚀 How the Game Works

### 1️⃣ Game Setup 
- Players **enter their names** in the input form.
- Clicking **"Start Game"** saves the names and moves to the next step.

### 2️⃣ Category Selection
- The game fetches available categories from The Trivia API and 
  displays them as selectable buttons. 
- Players choose a category to begin answering questions. 

### 3️⃣ Question Display
- For the selected category, the game retrieves:  
-  o 2 easy questions 
-  o 2 medium questions 
-  o 2 hard questions 
- Questions are displayed one at a time, with answer options 
  shuffled for fairness.

### 4️⃣ Answer Checking
- Players take **turns** answering questions.
- If a player answers correctly, they earn points based on the 
  difficulty level:  
- o **Easy**: 10 points 
-  o **Medium**: 15 points 
- o **Hard**: 20 points
-The game updates the scores and switches to the next player. 

### 5️⃣ Next Category Selection
- After all questions in a category have been answered, players can:  
- Choose another available category. 
- End the game to view the **final results**.
  
### 6️⃣ Game Over
- Once the game ends, the final scores are compared.
- The game declares a **winner** based on the highest score or 
  announces a tie **if** scores are equal. 
---

## 📂 Project Structure
```
Trivia-Quiz-Game/
│-- index.html         # Main game structure
│-- style.css          # Styling 
│-- script.js          # Game logic 
│-- README.md          # Project documentation
```

---
----
### Scoring System:
Correct answers are rewarded based on question difficulty:
- Easy: 10 points
- Medium: 15 points
- Hard: 20 points
----

## 🔧 Technologies Used
- **HTML** → Page structure
- **CSS** → Styling & animations
- **JavaScript (ES6)** → Game logic
- **Trivia API** → Fetching quiz questions dynamically

---

## 🎯 How to Run
1. Clone this repository:
   ```sh
   git clone https://github.com/degavaththirupathi/Two_Player_Trivia_Battle_Game.git
   ```
2. Navigate to the project directory:
 ```sh
cd two-player-game
 ```
3. Open `index.html` in a web browser.
