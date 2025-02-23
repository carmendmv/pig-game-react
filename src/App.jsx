import { useState } from 'react';
import Player from './components/Player';
import './style.css';

/**
 * App Component - Componente principal del juego Pig Game
 * 
 * Reglas del juego:
 * - Los jugadores tiran un dado por turnos
 * - Los puntos de cada tirada se suman al puntaje actual
 * - Si sale 1, se pierde el puntaje actual y pasa al siguiente jugador
 * - El jugador puede "Hold" para guardar sus puntos y pasar el turno
 * - Gana el primer jugador en llegar a 100 puntos
 */
function App() {
  // Estado del juego
  const [scores, setScores] = useState([0, 0]);         // Puntuaciones totales de los jugadores
  const [currentScore, setCurrentScore] = useState(0);  // Puntuación actual del turno
  const [activePlayer, setActivePlayer] = useState(0);  // Jugador activo (0 o 1)
  const [playing, setPlaying] = useState(true);         // Estado del juego (true = en curso)
  const [diceNumber, setDiceNumber] = useState(1);      // Número actual del dado

  /**
   * Cambia al siguiente jugador y reinicia la puntuación actual
   */
  const switchPlayer = () => {
    setCurrentScore(0);
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  /**
   * Maneja la tirada del dado
   * - Genera un número aleatorio entre 1 y 6
   * - Si es 1, cambia de jugador
   * - Si no, suma al puntaje actual
   */
  const rollDice = () => {
    if (playing) {
      const dice = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(dice);

      if (dice !== 1) {
        setCurrentScore(prev => prev + dice);
      } else {
        switchPlayer();
      }
    }
  };

  /**
   * Guarda la puntuación actual y verifica si hay un ganador
   * - Suma la puntuación actual al total del jugador
   * - Si llega a 100 puntos, gana el juego
   * - Si no, cambia al siguiente jugador
   */
  const holdScore = () => {
    if (playing) {
      setScores(prevScores => {
        const newScores = [...prevScores];
        newScores[activePlayer] += currentScore;
        
        if (newScores[activePlayer] >= 100) {
          setPlaying(false);
          return newScores;
        }
        
        switchPlayer();
        return newScores;
      });
    }
  };

  /**
   * Reinicia el juego a su estado inicial
   */
  const newGame = () => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setPlaying(true);
    setDiceNumber(1);
  };

  return (
    <main>
      <Player 
        name="PLAYER 1" 
        score={scores[0]} 
        currentScore={activePlayer === 0 ? currentScore : 0}
        isActive={activePlayer === 0}
        isWinner={!playing && scores[0] >= 100}
      />
      <Player 
        name="PLAYER 2" 
        score={scores[1]} 
        currentScore={activePlayer === 1 ? currentScore : 0}
        isActive={activePlayer === 1}
        isWinner={!playing && scores[1] >= 100}
      />

      <img src={`dice-${diceNumber}.png`} alt="Playing dice" className="dice" />
      <button className="btn btn--new" onClick={newGame}>🔄 New game</button>
      <button className="btn btn--roll" onClick={rollDice}>🎲 Roll dice</button>
      <button className="btn btn--hold" onClick={holdScore}>📥 Hold</button>
    </main>
  );
}

export default App;
