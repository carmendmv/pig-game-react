import { useState } from "react";
import Player from "./Player";
import "./style.css";

// Defino la puntuación ganadora
const WINNING_SCORE = 100;

function App() {
  // Estado del juego
  // 'score' es un arreglo que contiene los puntajes de los dos jugadores.
  const [score, setScore] = useState([0, 0]);

  // 'currentScore' guarda el puntaje acumulado durante el turno actual del jugador.
  const [currentScore, setCurrentScore] = useState(0);

  // 'activePlayer' indica qué jugador está activo, 0 para el primer jugador, 1 para el segundo.
  const [activePlayer, setActivePlayer] = useState(0);

  // 'isPlaying' es un booleano que indica si el juego está en curso o no.
  const [isPlaying, setIsPlaying] = useState(true);

  // 'diceNumber' guarda el número que muestra el dado (un número aleatorio entre 1 y 6).
  const [diceNumber, setDiceNumber] = useState(null);

  // Función para inicializar los datos del juego
  const initData = () => {
    setScore([0, 0]); // Restablecer los puntajes de los jugadores a 0
    setCurrentScore(0); // Restablecer el puntaje acumulado del turno actual
    setActivePlayer(0); // Establecer al jugador 1 como el activo
    setIsPlaying(true); // Iniciar el juego
    setDiceNumber(null); // Restablecer el número del dado
  };

  // Función para verificar si algún jugador ha ganado
  const checkWinner = () => {
    // Si el puntaje del jugador activo es mayor o igual al puntaje ganador
    if (score[activePlayer] >= WINNING_SCORE) {
      return true; // El jugador ha ganado
    }
    return false; // El jugador no ha ganado
  };

  // Función para lanzar el dado
  const throwDice = () => {
    if (!isPlaying) return; // Si el juego ha terminado, no hace nada

    // Generar un número aleatorio entre 1 y 6 para simular el lanzamiento del dado
    const random = Math.trunc(Math.random() * 6) + 1;
    setDiceNumber(random); // Actualizar el número del dado

    // Si el número lanzado no es 1, se añade al puntaje del turno actual
    if (random !== 1) {
      setCurrentScore((prev) => prev + random);
    } else {
      // Si el número es 1, se cambia de jugador sin guardar puntuación
      changePlayer(true);
    }
  };

  // Función para cambiar de jugador
  const changePlayer = (resetCurrent = false) => {
    if (!isPlaying) return; // Si el juego ha terminado, no hace nada

    if (!resetCurrent) {
      // Copiar el arreglo de puntajes y actualizar el puntaje del jugador actual
      const newScores = [...score];
      newScores[activePlayer] += currentScore;
      setScore(newScores);

      // Verificar si el jugador ha ganado
      if (checkWinner()) {
        setIsPlaying(false); // Si el jugador ha ganado, se detiene el juego
      }
    }

    // Reseteamos el puntaje actual
    setCurrentScore(0);

    // Cambiar al siguiente jugador (si es jugador 1, pasa a jugador 2, y viceversa)
    setActivePlayer((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <main>
      {/* Componente Player para el Jugador 1 */}
      <Player
        id={0}
        name="Player 1"
        score={score[0]} // Mostrar el puntaje total del jugador 1
        currentScore={activePlayer === 0 ? currentScore : 0} // Mostrar el puntaje del turno actual solo si el jugador 1 está activo
        isActive={activePlayer === 0} // Indicar si el jugador 1 es el jugador activo
        isWinner={score[0] >= WINNING_SCORE} // Indicar si el jugador 1 ha ganado
      />

      {/* Componente Player para el Jugador 2 */}
      <Player
        id={1}
        name="Player 2"
        score={score[1]} // Mostrar el puntaje total del jugador 2
        currentScore={activePlayer === 1 ? currentScore : 0} // Mostrar el puntaje del turno actual solo si el jugador 2 está activo
        isActive={activePlayer === 1} // Indicar si el jugador 2 es el jugador activo
        isWinner={score[1] >= WINNING_SCORE} // Indicar si el jugador 2 ha ganado
      />

      {/* Si hay un número en el dado, mostrar la imagen del dado correspondiente */}
      {diceNumber && (
        <img
          src={`dice-${diceNumber}.png`} // La imagen depende del número del dado
          alt="Playing dice"
          className="dice"
        />
      )}

      {/* Botón para iniciar un nuevo juego */}
      <button className="btn btn--new" onClick={initData}>
        🔄 New game
      </button>

      {/* Botón para lanzar el dado. Se deshabilita si el juego ha terminado. */}
      <button
        className="btn btn--roll"
        onClick={throwDice}
        disabled={!isPlaying} // Deshabilitar si el juego ha terminado
      >
        🎲 Roll dice
      </button>

      {/* Botón para cambiar de jugador (hold). Se deshabilita si el juego ha terminado. */}
      <button
        className="btn btn--hold"
        onClick={() => changePlayer(false)}
        disabled={!isPlaying} // Deshabilitar si el juego ha terminado
      >
        📥 Hold
      </button>
    </main>
  );
}

export default App;
