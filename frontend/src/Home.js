import React, { useEffect, useState } from "react";
import './Home.css';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1>Welcome to the Mario Games Archive</h1>
        <p>Explore the iconic Mario games across generations, from platformers to kart racing!</p>
      </header>

      {/* Featured Games Section*/}
      <section className="featured-section">
        <h2>Featured Games</h2>
        <div className="featured-games">
          {games.slice(0, 3).map((game) => (
            <div key={game.id} className="featured-card">
              <img
                src={`http://localhost:8081/uploads/${game.usa_boxart}`}
                alt={game.title}
                className="featured-image"
              />
              <h3>{game.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* History of Mario Section */}
      <section className="history-section">
        <h2>The History of Mario</h2>
        <p>
          Mario, the beloved plumber from Nintendo, first appeared in 'Donkey Kong' in 1981 as "Jumpman."
          His first solo game, 'Super Mario Bros.', was released in 1985 for the Nintendo Entertainment System (NES),
          and it changed the gaming world forever. With over 200 million copies sold worldwide, Mario’s legacy
          has evolved with the times, expanding into kart racing, party games, and even educational titles.
        </p>
        <div className="history-images">
          <img
            src="http://localhost:8081/uploads/SuperMario US.png"
            alt="Super Mario Bros."
            className="history-image"
          />
          <img
            src="http://localhost:8081/uploads/SuperMarioKart US.png"
            alt="Mario Kart"
            className="history-image"
          />
          <img
            src="http://localhost:8081/uploads/MarioParty US.png"
            alt="Mario Party"
            className="history-image"
          />
        </div>
      </section>

      {/* Sections for Game Genres */}
      <section className="game-genres">
        <h2>Explore Game Genres</h2>
        <div className="game-genres-grid">
          <div className="genre-card">
            <h3>Platformers</h3>
            <img
              src="http://localhost:8081/uploads/SuperMario 64 US.png"
              alt="Super Mario 64"
              className="genre-image"
            />
            <p>Explore the classic platforming world of Mario games.</p>
          </div>
          <div className="genre-card">
            <h3>Kart Games</h3>
            <img
              src="http://localhost:8081/uploads/MarioKart 8Deluxe US.png"
              alt="Mario Kart 8 Deluxe"
              className="genre-image"
            />
            <p>Race through wild and fun tracks in Mario Kart games.</p>
          </div>
          <div className="genre-card">
            <h3>Party Games</h3>
            <img
              src="http://localhost:8081/uploads/MarioParty 10 US.png"
              alt="Mario Party 10"
              className="genre-image"
            />
            <p>Gather your friends for a fun-filled Mario Party game night!</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
