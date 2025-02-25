import React from "react";

function Player({ id, name, score, currentScore, isActive, isWinner }) {
  return (
    <section
      className={`player ${isActive ? "player--active" : ""} ${isWinner ? "player--winner" : ""}`}
    >
      <h2 className="name" id={`name--${id}`}>
        {name}
      </h2>
      <p className="score" id={`score--${id}`}>
        {score}
      </p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id={`current--${id}`}>
          {currentScore}
        </p>
      </div>
    </section>
  );
}

export default Player;
