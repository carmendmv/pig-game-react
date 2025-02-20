import "./style.css";

// Defino los elementos HTML del DOM
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

const sectionPlayer0 = document.querySelector(".player--0");
const sectionPlayer1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

// defino las variables de estado
let score, currentScore, activePlayer, isPlaying;
// defino la puntuación ganadora
const WINNING_SCORE = 100;

const initData = () => {
  // inicializo los datos
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0; // el jugador activo empieza siendo el jugador 0
  isPlaying = true; // El juego comienza

  // muestro las puntuaciones iniciales
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  // escondo el dado
  dice.classList.add("hidden");

  sectionPlayer0.classList.remove("player--winner");
  sectionPlayer1.classList.remove("player--winner");

  btnRoll.disabled = false;
  btnHold.disabled = false;

  sectionPlayer0.classList.add("player--active"); // comienza el jugador 0
  sectionPlayer1.classList.remove("player--active");
};

const checkWinner = () => {
  // verifico si el jugador activo ha alcanzado la puntuación ganadora
  if (score[activePlayer] >= WINNING_SCORE) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner"); // lo marca como ganador
    dice.classList.add("hidden"); // escondo el dado
    btnRoll.disabled = true; // deshabilito el botón de tirar dado
    btnHold.disabled = true; // deshabilito el botón de mantener
    isPlaying = false; // paro el juego
    return true; // devuelvo el jugador ganador
  }
  return false; // si no ha ganado, sigue jugando
};

const throwDice = () => {
  // Función que se activa al tirar el dado
  if (!isPlaying) return; // Si el juego ha terminado, no hace nada

  // obtengo un número aleatorio entre 1 y 6
  const random = Math.trunc(Math.random() * 6) + 1;

  // Intento cargar la imagen del dado con el número aleatorio
  const diceImg = new Image(); //creo un nuevo objeto  q utilizaré más tarde
  diceImg.onload = () => {
    //el método onload --> lo uso para ejecutar la imagen cuando se ha cargado correctamente. Es como decir: "cuando esta imagen esté lista, haz esto"
    dice.classList.remove("hidden"); // muestra el dado
    dice.src = `dice-${random}.png`; // establece la imagen según el valor del dado
  };
  diceImg.onerror = () => {
    // .onerror --> si por alguna razón no se puede cargar la imagen, esto va a saltar. Es como un plan B, para que no me quede sin imagen del dado
    console.error(`Failed to load dice image: dice-${random}.png`);
    dice.classList.add("hidden"); // Si hay error, escondo el dado
  };
  diceImg.src = `dice-${random}.png`;

  // si el dado no es 1, sumo el valor al puntaje actual del jugador
  if (random !== 1) {
    updateCurrentScore(random);
  } else {
    changePlayer(true); // si el dado es 1, cambio de jugador
  }
};

function updateCurrentScore(random) {
  // Actualizo la puntuación actual del jugador activo con el valor del dado
  if (!isPlaying) return;
  currentScore += random;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

function changePlayer(resetCurrent = false) {
  // cambio de jugador y reseteo el puntaje actual si es necesario
  if (!isPlaying) return;

  if (!resetCurrent) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (checkWinner()) return; // verifico si el jugador ha ganado
  }

  resetCurrentScore(); // reseteo el puntaje actual
  sectionPlayer0.classList.toggle("player--active"); // alterno el estado activo entre los jugadores
  sectionPlayer1.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0; // Cambio de jugador utilizando el operador ternario
}

function resetCurrentScore() {
  // reseteo el puntaje actual para el jugador
  currentScore = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
}

//habilito los botones con las funciones correspondientes al hacer click
btnRoll.addEventListener("click", throwDice);
btnHold.addEventListener("click", () => changePlayer(false));
btnNew.addEventListener("click", initData);

// Inicializo el juego
initData();
