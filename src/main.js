import "./style.css";

document.querySelector("#app").innerHTML = `
 <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">Player 1</h2>
        <p class="score" id="score--0">43</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">0</p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">Player 2</h2>
        <p class="score" id="score--1">24</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">0</p>
        </div>
      </section>

      <img src="dice-5.png" alt="Playing dice" class="dice" />
      <button class="btn btn--new">🔄 New game</button>
      <button class="btn btn--roll">🎲 Roll dice</button>
      <button class="btn btn--hold">📥 Hold</button>
    </main>
`;

//1) Seleccionar todos los elementos de DOM:

//activePlayer --> variables de estado en JS
const sectionPlayer0 = document.querySelector(".player--0");
const sectionPlayer1 = document.querySelector(".player--1");
//score = [0, 0] --> variables de estado en JS
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
//current --> variables de estado en JS
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

//botones --> variables del DOM
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//imagen --> variables del DOM
const dice = document.querySelector(".dice");

//para las variables de estado
let score, currentScore, activePlayer;

//iniciar los valores a 0 al comenzar la partida
const initData = () => {
  //init state variables
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  //update DOM
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  dice.classList.add("hidden");
};

initData();

//función para sacar dado aleatorio
const throwDice = () => {
  const random = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.src = `dice-${random}.png`;

  if (random !== 1) {
    updateCurrentScore(random);
    if (currentScore >= 100) {
      alert(`Player ${activePlayer + 1} loses!`);
      initData();
    }
  } else {
    changePlayer();
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
};

function updateCurrentScore(random) {
  currentScore += random; // current = current + random
  if (activePlayer === 0) currentScore0.textContent = currentScore;
  else currentScore1.textContent = currentScore;
}

function changePlayer() {
  //currentScore actualizada
  resetCurrentScore();
  //cambiamos de jugador activo
  //si el jugador activo es el 0, se cambia al 1
  //si el jugador activo es el 1, se cambia al 0
  //uso el operador ternario que verifica si el valor
  //de activePlayer es 0 o 1 y devuelve el valor contrario

  sectionPlayer0.classList.toggle("player--active");
  sectionPlayer1.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;
  //la función toogle indica que clase poner en función de la condición
}

function resetCurrentScore() {
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  currentScore = 0;
  if (activePlayer === 0) currentScore0.textContent = currentScore;
  else currentScore1.textContent = currentScore;
}

//funcionalidad para los botones:

btnRoll.addEventListener("click", throwDice);
btnHold.addEventListener("click", changePlayer);
btnNew.addEventListener("click", initData);
