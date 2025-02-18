import "./App.css";
import { useState } from "react";
import Player from "./Player";

function App() {
  // Estado de la aplicación
  const [score, setScore] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState([0, 0]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [diceRoll, setDiceRoll] = useState(null);

  // Función para reiniciar el juego
  const initData = () => {
    // Restablecer las puntuaciones
    setScore([0, 0]);
    setCurrentScore([0, 0]);
    setActivePlayer(0);
    setGameOver(false);
    setDiceRoll(null);

    document.querySelector(".player--0").classList.remove("player--winner");
    document.querySelector(".player--1").classList.remove("player--winner");
  };

  // Función para tirar el dado
  const throwDice = () => {
    if (gameOver) return;

    const random = Math.trunc(Math.random() * 6) + 1;
    setDiceRoll(random);

    if (random !== 1) {
      setCurrentScore((prev) => {
        const newScores = [...prev];
        newScores[activePlayer] += random;
        return newScores;
      });
    } else {
      changePlayer();
    }

    if (score[activePlayer] + currentScore[activePlayer] >= 100) {
      setGameOver(true);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    }
  };

  // Función para cambiar de jugador
  const changePlayer = () => {
    updateScores();
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  // Función para acumular la puntuación actual en la puntuación total
  const updateScores = () => {
    setScore((prev) => {
      const newScores = [...prev];
      newScores[activePlayer] += currentScore[activePlayer]; // Añado la puntuación actual al total
      return newScores;
    });
    setCurrentScore([0, 0]); // Reinicia la puntuación actual después de guardar
  };

  // Función para guardar la puntuación actual sin cambiar de jugador (al presionar "Hold")
  const holdScore = () => {
    updateScores();
    if (score[activePlayer] + currentScore[activePlayer] >= 100) {
      setGameOver(true); // Detiene el juego si la puntuación total llega a 100
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner"); // Marca al jugador como ganador
    } else {
      changePlayer(); // Cambia al siguiente jugador
    }
  };

  return (
    <main>
      <Player
        playerId={0}
        score={score[0]}
        currentScore={currentScore[0]}
        isActive={activePlayer === 0}
      />

      <img
        src={`dice-${diceRoll || 5}.png`}
        alt="Playing dice"
        className={diceRoll ? "dice" : "hidden"}
      />

      <Player
        playerId={1}
        score={score[1]}
        currentScore={currentScore[1]}
        isActive={activePlayer === 1}
      />

      <div>
        <button onClick={initData} className="btn btn--new">
          🔄 New game
        </button>
        <button onClick={throwDice} className="btn btn--roll">
          🎲 Roll dice
        </button>
        <button onClick={holdScore} className="btn btn--hold">
          📥 Hold
        </button>
      </div>
    </main>
  );
}

export default App;
