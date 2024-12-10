import React, { useEffect, useState } from "react";
import './Games.css'; // You can style this as needed

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/games") // Adjust the URL if needed
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div className="games-container">
        <div className="games-grid">
          {games.map((game) => (
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
  );
};

export default Games;
