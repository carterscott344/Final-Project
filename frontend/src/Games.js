import React, { useEffect, useState } from "react";
import './Games.css'; 

const Games = () => {
  const [games, setGames] = useState({ platformers: [], kartGames: [], partyGames: [] });

  useEffect(() => {
    fetch("http://localhost:8081/games") 
      .then((response) => response.json())
      .then((data) => {
        const platformers = data.filter(game => game.genre === "Platformer");
        const kartGames = data.filter(game => game.genre === "Kart Game");
        const partyGames = data.filter(game => game.genre === "Party Game");

        setGames({ platformers, kartGames, partyGames });
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div className="games-container">
      <div className="games-section">
        <div className="section-bar" id='platformers'>Platformers</div>
        <div className="games-grid">
          {games.platformers.map((game) => (
            <div className="game-card" key={game.id}>
              <img
                src={`http://localhost:8081/uploads/${game.usa_boxart}`}
                alt={game.title}
                className="game-image"
              />
              <h3>{game.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="games-section">
        <div className="section-bar" id='kart'>Kart Games</div>
        <div className="games-grid">
          {games.kartGames.map((game) => (
            <div className="game-card" key={game.id}>
              <img
                src={`http://localhost:8081/uploads/${game.usa_boxart}`}
                alt={game.title}
                className="game-image"
              />
              <h3>{game.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="games-section">
        <div className="section-bar" id='party'>Party Games</div>
        <div className="games-grid">
          {games.partyGames.map((game) => (
            <div className="game-card" key={game.id}>
              <img
                src={`http://localhost:8081/uploads/${game.usa_boxart}`}
                alt={game.title}
                className="game-image"
              />
              <h3>{game.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
