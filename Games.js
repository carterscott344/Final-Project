import React, { useState, useEffect } from 'react';
import './Games.css';

const Games = () => {
  const [games, setGames] = useState({ platformers: [], kartGames: [], partyGames: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [isUS, setIsUS] = useState(true); // Track whether US or Japan boxart is displayed
  const [rating, setRating] = useState(''); // Track user's rating
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false); // Track if the rating is submitted

  useEffect(() => {
    fetch('http://localhost:8081/games')
      .then((response) => response.json())
      .then((data) => {
        const platformers = data.filter(game => game.genre === 'Platformer');
        const kartGames = data.filter(game => game.genre === 'Kart Game');
        const partyGames = data.filter(game => game.genre === 'Party Game');

        setGames({ platformers, kartGames, partyGames });
      })
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  const openPopup = (game) => {
    setCurrentGame(game);
    setIsPopupOpen(true);
    setRating(''); // Reset the rating field
    setIsRatingSubmitted(false); // Reset submission status
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsUS(true); // Reset to US boxart when closing the popup
  };

  const toggleBoxart = () => {
    setIsUS(!isUS); // Toggle between US and Japan boxart
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); // Formats the date as MM/DD/YYYY
  };

  const ratingFix = (rating) =>{
    if(rating === 0){
      return 'N/A'
    }
    return rating
  }

  const submitRating = async (id) => {
    console.log("test1");
    console.log(document.getElementById("rating").value);
    if (document.getElementById("rating").value >= 0 && document.getElementById("rating").value <= 100) {
      console.log("test2");
      var average_rating;
      var total_ratings;

      if (currentGame.average_rating == null) {
         average_rating = 0;
      } else {
         average_rating = currentGame.average_rating;
      }

      if (currentGame.total_ratings == null) {
         total_ratings = 0;
      } else {
         total_ratings = currentGame.total_ratings;
      }

    // average rating is actually the sum of all ratings because i messed up so yeah


      console.log(average_rating);
      console.log(total_ratings);
      // const formData = new FormData();
      //       formData.append("average_rating", average_rating + document.getElementById("rating").value / (total_ratings + 1));
      //       formData.append("total_ratings", total_ratings + 1);

      // console.log(formData.get("average_rating"));
      // console.log(formData.get("total_ratings"));

      average_rating = Number(average_rating) + Number(document.getElementById("rating").value);
      total_ratings = Number(total_ratings) + 1;

      console.log(average_rating);
      console.log(total_ratings);

      const response = await fetch(`http://localhost:8081/games/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ average_rating, total_ratings}),
        });

        await response.json();

        console.log("test3");

        alert("Rating added!");
    } else {
      alert("Please enter a number between 1 and 100.");
    }
  }

  return (
    <div className="games-container">
      <div className="games-section">
        <div className="section-bar" id="platformers">Platformers</div>
        <div className="games-grid">
          {games.platformers.map((game) => (
            <div className="game-card" key={game.id} onClick={() => openPopup(game)}>
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
        <div className="section-bar" id="kart">Kart Games</div>
        <div className="games-grid">
          {games.kartGames.map((game) => (
            <div className="game-card" key={game.id} onClick={() => openPopup(game)}>
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
        <div className="section-bar" id="party">Party Games</div>
        <div className="games-grid">
          {games.partyGames.map((game) => (
            <div className="game-card" key={game.id} onClick={() => openPopup(game)}>
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
      

      {isPopupOpen && currentGame && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>X</button>
            <img
              src={`http://localhost:8081/uploads/${isUS ? currentGame.usa_boxart : currentGame.japan_boxart}`}
              alt={currentGame.title}
              className="popup-image"
            />
            <div className="popup-details">
              <h3>{currentGame.title}</h3>
              <p>Platform: {currentGame.platforms}</p>
              <p>US Release Date: {formatDate(currentGame.usa_release_date)}</p>
              <p>Japan Release Date: {formatDate(currentGame.japan_release_date)}</p>
              <p>MetaCritic Rating: {ratingFix(currentGame.metacritic_rating)}</p>
              <p>User Rating: {Number(ratingFix(currentGame.average_rating)) / Number(currentGame.total_ratings)}</p>
            </div>
            <button onClick={toggleBoxart}>
              Switch to {isUS ? 'Japan' : 'US'} Boxart
            </button>
            <input id="rating" type="number"></input>
            <button onClick={() => submitRating(currentGame.id)}>
              Submit rating for this game
            </button>


            {}
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
