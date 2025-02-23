/**
 * Componente Player - Representa a un jugador en el juego
 * 
 * @param {Object} props
 * @param {string} props.name - Nombre del jugador
 * @param {number} props.score - Puntuación total del jugador
 * @param {number} props.currentScore - Puntuación actual del turno
 * @param {boolean} props.isActive - Indica si es el turno del jugador
 * @param {boolean} props.isWinner - Indica si el jugador ha ganado
 */
function Player({ name, score, currentScore, isActive, isWinner }) {
  return (
    <section className={`player ${isActive ? 'player--active' : ''} ${isWinner ? 'player--winner' : ''}`}>
      <h2 className="name">{name}</h2>
      <p className="score">{score}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">{currentScore}</p>
      </div>
    </section>
  );
}

export default Player;
