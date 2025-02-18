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
    setScore([0, 0]);
    setCurrentScore([0, 0]);
    setActivePlayer(0);
    setGameOver(false);
    setDiceRoll(null);
  };

  // Función para tirar el dado
  const throwDice = () => {
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

    if (currentScore[activePlayer] + random >= 100) {
      setGameOver(true);
      alert(`Player ${activePlayer + 1} wins!`);
    }
  };

  // Función para cambiar de jugador
  const changePlayer = () => {
    setCurrentScore([0, 0]);
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  // Función para guardar la puntuación actual
  const holdScore = () => {
    const newScores = [...score];
    newScores[activePlayer] += currentScore[activePlayer];
    setScore(newScores);
    changePlayer();
  };

  return (
    <main>
      <Player
        playerId={0}
        score={score[0]}
        currentScore={currentScore[0]}
        isActive={activePlayer === 0}
      />
      <Player
        playerId={1}
        score={score[1]}
        currentScore={currentScore[1]}
        isActive={activePlayer === 1}
      />

      <img
        src={diceRoll ? `dice-${diceRoll}.png` : "dice-5.png"}
        alt="Playing dice"
        className={diceRoll ? "" : "hidden"}
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

      {gameOver && <div>Game Over!</div>}
    </main>
  );
}

export default App;
