var express = require("express");
var cors = require("cors");
var multer = require("multer");
var fs = require("fs");
const path = require("path");
var bodyParser = require("body-parser");
var app = express();
const mysql = require("mysql2");
require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));


const port = "8081";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}


app.get("/games", (req, res) => {
    db.query('SELECT * FROM games', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).send({ error: "Failed to fetch games data." });
        } else {
            res.json(results); 
        }
    });
});

app.post("/games/:id", (req, res) => {
    const id = req.params.id;
    const {average_rating, total_ratings} = req.body;

    const query =`UPDATE games SET average_rating=?, total_ratings=? WHERE id=?`

    console.log(average_rating);
    
  db.query(query, [average_rating, total_ratings, id]);
  console.log("ssaaahuashiushius");
});


app.get("/games/:id/ratings", (req, res) => {
    const id = req.params.id;
    db.query('SELECT all_ratings FROM games WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching ratings:', err);
            return res.status(500).send({ error: "Failed to fetch ratings." });
        }

        let ratings;
        try {
            ratings = JSON.parse(results[0].all_ratings || '[]'); // Parse ratings safely
            if (!Array.isArray(ratings)) ratings = []; // Ensure ratings is an array
        } catch (parseErr) {
            console.error("Error parsing all_ratings:", parseErr);
            ratings = []; // Default to an empty array if parsing fails
        }

        res.json(ratings); // Send all valid ratings
    });
});

  
app.post("/games/:id/submitRating", (req, res) => {
    const { id } = req.params;
    const { newRating } = req.body;

    // Retrieve the current ratings and game data
    db.query('SELECT all_ratings, average_rating, total_ratings FROM games WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching game data:', err);
            return res.status(500).send({ error: "Failed to fetch game data." });
        }

        let ratings = [];
        try {
            ratings = JSON.parse(results[0].all_ratings || '[]');
            if (!Array.isArray(ratings)) ratings = [];
        } catch (parseErr) {
            console.error("Error parsing all_ratings:", parseErr);
            ratings = [];
        }

        // Append the new rating to the list
        ratings.push(newRating);
        const updatedRatings = JSON.stringify(ratings);
        const totalRatings = ratings.length;

        // Recalculate the average rating
        const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings;

        // Update the game data in the database
        db.query('UPDATE games SET all_ratings = ?, average_rating = ?, total_ratings = ? WHERE id = ?', 
            [updatedRatings, averageRating, totalRatings, id], 
            (updateErr) => {
                if (updateErr) {
                    console.error('Error updating ratings:', updateErr);
                    return res.status(500).send({ error: "Failed to update ratings." });
                }

                res.json({ message: "Rating added successfully.", ratings });
            }
        );
    });
});


app.put("/games/:id/updateRating/:ratingIndex", (req, res) => {
    const { id, ratingIndex } = req.params;
    const { newRating } = req.body;

    // Retrieve the current ratings and game data
    db.query('SELECT all_ratings FROM games WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching game data:', err);
            return res.status(500).send({ error: "Failed to fetch game data." });
        }

        let ratings = [];
        try {
            ratings = JSON.parse(results[0].all_ratings || '[]');
            if (!Array.isArray(ratings)) ratings = [];
        } catch (parseErr) {
            console.error("Error parsing all_ratings:", parseErr);
            ratings = [];
        }

        // Check if the rating index is valid
        if (ratingIndex < 0 || ratingIndex >= ratings.length) {
            return res.status(400).send({ error: "Invalid rating index." });
        }

        // Update the rating at the given index
        ratings[ratingIndex] = newRating;
        const updatedRatings = JSON.stringify(ratings);
        const totalRatings = ratings.length;

        // Recalculate the average rating
        const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings;

        // Update the game data in the database
        db.query('UPDATE games SET all_ratings = ?, average_rating = ?, total_ratings = ? WHERE id = ?', 
            [updatedRatings, averageRating, totalRatings, id], 
            (updateErr) => {
                if (updateErr) {
                    console.error('Error updating ratings:', updateErr);
                    return res.status(500).send({ error: "Failed to update rating." });
                }

                res.json({ message: "Rating updated successfully.", ratings });
            }
        );
    });
});


app.put("/games/:id/ratings/:ratingIndex", (req, res) => {
    const id = req.params.id;
    const ratingIndex = parseInt(req.params.ratingIndex);
    const { newRating } = req.body;
  
    db.query('SELECT all_ratings FROM games WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error fetching ratings:', err);
        res.status(500).send({ error: "Failed to fetch ratings." });
      } else {
        let ratings = JSON.parse(results[0].all_ratings || '[]');
        if (ratingIndex >= 0 && ratingIndex < ratings.length) {
          ratings[ratingIndex] = newRating; // Update the specific rating
          const updatedRatings = JSON.stringify(ratings);
  
          db.query('UPDATE games SET all_ratings = ? WHERE id = ?', [updatedRatings, id], (updateErr) => {
            if (updateErr) {
              console.error('Error updating ratings:', updateErr);
              res.status(500).send({ error: "Failed to update rating." });
            } else {
              res.json({ message: "Rating updated successfully.", ratings });
            }
          });
        } else {
          res.status(400).send({ error: "Invalid rating index." });
        }
      }
    });
  });
  

app.delete("/games/:id/ratings/:ratingIndex", (req, res) => {
    const { id, ratingIndex } = req.params;

    // Retrieve the current ratings and game data
    db.query('SELECT all_ratings FROM games WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching game data:', err);
            return res.status(500).send({ error: "Failed to fetch game data." });
        }

        let ratings = [];
        try {
            ratings = JSON.parse(results[0].all_ratings || '[]');
            if (!Array.isArray(ratings)) ratings = [];
        } catch (parseErr) {
            console.error("Error parsing all_ratings:", parseErr);
            ratings = [];
        }

        // Check if the rating index is valid
        if (ratingIndex < 0 || ratingIndex >= ratings.length) {
            return res.status(400).send({ error: "Invalid rating index." });
        }

        // Remove the rating at the specified index
        ratings.splice(ratingIndex, 1);
        const updatedRatings = JSON.stringify(ratings);
        const totalRatings = ratings.length;

        // Recalculate the average rating
        const averageRating = totalRatings > 0 
            ? ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings 
            : 0;

        // Update the game data in the database
        db.query('UPDATE games SET all_ratings = ?, average_rating = ?, total_ratings = ? WHERE id = ?', 
            [updatedRatings, averageRating, totalRatings, id], 
            (updateErr) => {
                if (updateErr) {
                    console.error('Error updating ratings:', updateErr);
                    return res.status(500).send({ error: "Failed to delete rating." });
                }

                res.json({ message: "Rating deleted successfully.", ratings });
            }
        );
    });
});

