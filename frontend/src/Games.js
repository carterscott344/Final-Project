import React, { useState, useEffect } from 'react';
import './Games.css';

const Games = () => {
  const [games, setGames] = useState({ platformers: [], kartGames: [], partyGames: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [isUS, setIsUS] = useState(true); // Track whether US or Japan boxart is displayed
  const [ratings, setRatings] = useState([]); // State to hold ratings list
  const [isRatingsVisible, setIsRatingsVisible] = useState(false); // Control visibility of ratings list
  const [rating, setRating] = useState(''); // Track user's rating
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false); // Track if the rating is submitted

  useEffect(() => {
    fetch(`http://localhost:8081/games`)
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
    setRating('');
    setIsRatingSubmitted(false);
    setIsRatingsVisible(false);
  
    // Fetch ratings for the selected game
    fetch(`http://localhost:8081/games/${game.id}/ratings`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRatings(data); // Ensure that only arrays are set as ratings
        } else {
          console.error("Unexpected ratings data format:", data);
          setRatings([]); // Set an empty array if data isn't in the correct format
        }
      })
      .catch((error) => {
        console.error('Error fetching ratings:', error);
        setRatings([]); // Reset to an empty array if an error occurs
      });
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

  const ratingFix = (rating) => {
    if (rating === 0 || Number.isNaN(rating)) {
      return 'N/A';
    }
    return rating;
  };

  const submitRating = async (id) => {
    const newRating = Number(document.getElementById("rating").value);
    if (newRating >= 0 && newRating <= 100) {
        try {
            const response = await fetch(`http://localhost:8081/games/${id}/submitRating`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newRating }),
            });

            if (response.ok) {
                const data = await response.json();
                setRatings(data.ratings); // Update the local ratings list with the new ratings
                alert("Rating added successfully!");
            } else {
                const errorData = await response.json();
                alert(`Failed to add rating: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("An error occurred while submitting the rating.");
        }
    } else {
        alert("Please enter a number between 0 and 100.");
    }
};


  

const deleteRating = async (index) => {
  try {
      const response = await fetch(`http://localhost:8081/games/${currentGame.id}/ratings/${index}`, {
          method: "DELETE",
      });

      if (response.ok) {
          const data = await response.json();
          setRatings(data.ratings);
          alert("Rating deleted successfully!");
      } else {
          const errorData = await response.json();
          alert(`Failed to delete rating: ${errorData.error}`);
      }
  } catch (error) {
      console.error("Error deleting rating:", error);
      alert("An error occurred while deleting the rating.");
  }
};


  const updateRating = async (index) => {
    const newRating = Number(prompt('Enter your updated rating:', ''));
    if (newRating >= 0 && newRating <= 100) {
        try {
            const response = await fetch(`http://localhost:8081/games/${currentGame.id}/updateRating/${index}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newRating }),
            });

            if (response.ok) {
                const data = await response.json();
                setRatings(data.ratings);
                alert("Rating updated successfully!");
            } else {
                const errorData = await response.json();
                alert(`Failed to update rating: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Error updating rating:", error);
            alert("An error occurred while updating the rating.");
        }
    } else {
        alert("Please enter a valid number between 0 and 100.");
    }
};


  // Toggle ratings list visibility
  const toggleRatingsVisibility = () => {
    setIsRatingsVisible(!isRatingsVisible);
  };

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
              <p>Average User Rating: {ratingFix(Number(currentGame.average_rating))}</p>
            </div>
            <button onClick={toggleBoxart}>
              Switch to {isUS ? 'Japan' : 'US'} Boxart
            </button>
            <input id="rating" type="number" placeholder="Enter your rating" />
            <button onClick={() => submitRating(currentGame.id)}>
              Submit rating for this game
            </button>

            {/* Button to toggle the ratings list visibility */}
            <button onClick={toggleRatingsVisibility}>
              {isRatingsVisible ? 'Hide Ratings' : 'Show Ratings'}
            </button>

            {/* Scrollable ratings list */}
            {isRatingsVisible && (
              <div className="ratings-list">
                <h4>All Ratings</h4>
                <ul>
                  {ratings.map((rating, index) => (
                    <li key={index}>
                      <span>Rating: {rating}</span>
                      <button onClick={() => deleteRating(index)}>Delete</button>
                      <button onClick={() => {
                        const newRating = prompt('Enter new rating:', rating);
                        if (newRating) updateRating(index, Number(newRating));
                      }}>Update</button>
                    </li>
                  ))}
                </ul>

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;