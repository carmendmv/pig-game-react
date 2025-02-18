function Player(props) {
  const { playerId, score, currentScore, isActive } = props;
  return (
    <section
      className={`player player--${playerId} ${isActive ? "player--active" : ""}`}
    >
      <h2 className="name" id={`name--${playerId}`}>
        Player {playerId + 1}
      </h2>
      <p className="score" id={`score--${playerId}`}>
        {score}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id={`current--${playerId}`}>
          {currentScore}
        </p>
      </div>
    </section>
  );
}

export default Player;
