import { useState } from "react";
import Player from "./Player"; 

import "./App.css";

const WINNING_SCORE = 100;

const App = () => {
  const [scores, setScores] = useState([0, 0]); // Puntuaciones totales de los jugadores
  const [currentScore, setCurrentScore] = useState(0); // Puntuación actual de cada turno
  const [activePlayer, setActivePlayer] = useState(0); // Jugador activo
  const [isPlaying, setIsPlaying] = useState(true); // Estado del juego
  const [dice, setDice] = useState(null); // Estado del dado

  const throwDice = () => {
    if (!isPlaying) return; // Si el juego ha terminado, no hace nada

    const random = Math.floor(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6
    console.log(random); // Verifica el valor del dado

    if (random === 1) {
      // Si el dado es 1, el jugador pierde su puntuación actual
      setCurrentScore(0);
      setDice(random); // Actualiza el estado del dado
      changePlayer();
    } else {
      // Si no es 1, se acumula la puntuación
      setCurrentScore((prevScore) => prevScore + random);
      setDice(random); // Actualiza el estado del dado
    }
  };

  const holdScore = () => {
    if (!isPlaying) return; // Si el juego ha terminado, no hace nada

    // Agrega la puntuación actual al total del jugador activo
    const newScores = [...scores];
    newScores[activePlayer] += currentScore;
    setScores(newScores);

    // Si el jugador alcanza o supera el puntaje ganador, se acaba el juego
    if (newScores[activePlayer] >= WINNING_SCORE) {
      alert(`Player ${activePlayer + 1} wins!`);
      setIsPlaying(false); // Detiene el juego
    } else {
      // Cambia al siguiente jugador
      changePlayer();
    }
  };

  const changePlayer = () => {
    setCurrentScore(0); // Resetea la puntuación actual
    setActivePlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0)); // Cambia de jugador
  };

  const resetGame = () => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setIsPlaying(true);
    setDice(null); // Restablece el dado
  };

  return (
    <div className="game">
      <h1>Pig Game</h1>
      <main>
        <div className="players">
          <Player
            playerId={0}
            name="Player 1"
            score={scores[0]}
            currentScore={currentScore}
            isActive={activePlayer === 0}
            onRollDice={throwDice}
            onHoldScore={holdScore}
            dice={dice}
          />
          <Player
            playerId={1}
            name="Player 2"
            score={scores[1]}
            currentScore={currentScore}
            isActive={activePlayer === 1}
            onRollDice={throwDice}
            onHoldScore={holdScore}
            dice={dice}
          />
        </div>

        <button onClick={resetGame} className="btn btn--new">
          🔄 New Game
        </button>
      </main>
    </div>
  );
};

export default App;
