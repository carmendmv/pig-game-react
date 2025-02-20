import { useState } from "react"; 
import Player from "./Player"; 
import "./App.css"; // Importamos el archivo CSS

// predefino la puntuación del ganador
const WINNING_SCORE = 100;

const App = () => {
  // defino las variables de estado
  const [scores, setScores] = useState([0, 0]); // Ppuntuaciones totales de los jugadores
  const [currentScore, setCurrentScore] = useState(0); // la puntuación actual de cada turno
  const [activePlayer, setActivePlayer] = useState(0); // Jquien es el jugador activo
  const [isPlaying, setIsPlaying] = useState(true); // estado del juego

  // Función para tirar el dado
  const throwDice = () => {
    if (!isPlaying) return; // si el juego ha terminado, no hace nada

    const random = Math.floor(Math.random() * 6) + 1; // genera un número aleatorio entre 1 y 6

    if (random === 1) {
      // Si el dado es 1, el jugador pierde su puntuación actual
      setCurrentScore(0);
      changePlayer(); // Cambia de jugador
    } else {
      // Si no es 1, se acumula la puntuación
      setCurrentScore((prevScore) => prevScore + random);
    }
  };

  // Función para "guardar" la puntuación actual y cambiar de turno
  const holdScore = () => {
    if (!isPlaying) return; // si el juego ha terminado, no se hace nada

    // Agrega la puntuación actual al total del jugador activo
    const newScores = [...scores];
    newScores[activePlayer] += currentScore;
    setScores(newScores); // Actualiza las puntuaciones totales

    // Si el jugador alcanza o supera el puntaje ganador, se acaba el juego
    if (newScores[activePlayer] >= WINNING_SCORE) {
      alert(`Player ${activePlayer + 1} wins!`); // Muestra un mensaje de victoria
      setIsPlaying(false); // Detiene el juego
    } else {
      // Cambia al siguiente jugador
      changePlayer();
    }
  };

  // Función para cambiar de jugador
  const changePlayer = () => {
    setCurrentScore(0); // Resetea la puntuación actual
    setActivePlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0)); // Cambia de jugador
  };

  // Función para resetear el juego
  const resetGame = () => {
    setScores([0, 0]); // Resetea las puntuaciones de los jugadores
    setCurrentScore(0); // Resetea la puntuación del turno
    setActivePlayer(0); // Vuelve a ser el turno del jugador 1
    setIsPlaying(true); // El juego empieza de nuevo
  };

  return (
    <div className="game">
      <h1>Pig Game</h1>
      <div className="players">
        {/* Componente Player para el Jugador 1 */}
        <Player
          playerId={0}
          name="Player 1"
          score={scores[0]}
          currentScore={currentScore}
          isActive={activePlayer === 0} // Muestra si el jugador está activo
          onRollDice={throwDice} // Función para tirar el dado
          onHoldScore={holdScore} // Función para mantener la puntuación
        />
        {/* Componente Player para el Jugador 2 */}
        <Player
          playerId={1}
          name="Player 2"
          score={scores[1]}
          currentScore={currentScore}
          isActive={activePlayer === 1} // Muestra si el jugador está activo
          onRollDice={throwDice} // Función para tirar el dado
          onHoldScore={holdScore} // Función para mantener la puntuación
        />
      </div>

      {/* Botón para reiniciar el juego */}
      <button onClick={resetGame} className="btn btn--new">
        🔄 New Game
      </button>
    </div>
  );
};

export default App;
