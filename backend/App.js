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

    const query = `UPDATE games SET average_rating=?, total_ratings=? WHERE id=?`

    console.log(average_rating);
    
  db.query(query, [average_rating, total_ratings, id]);
  console.log("ssaaahuashiushius");
});


app.get("/games/:id/ratings", (req, res) => {
    const id = req.params.id;
    db.query('SELECT all_ratings FROM games WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching ratings:', err);
            res.status(500).send({ error: "Failed to fetch ratings." });
        } else {
            const ratings = JSON.parse(results[0].all_ratings || '[]');
            res.json(ratings);
        }
    });
});


app.post("/games/:id/updateRatings", (req, res) => {
    const { id } = req.params;
    const { all_ratings } = req.body;
  
    const query = `UPDATE games SET all_ratings = ? WHERE id = ?`;
    db.query(query, [JSON.stringify(all_ratings), id], (err) => {
      if (err) {
        console.error('Error updating ratings:', err);
        res.status(500).send({ error: "Failed to update ratings." });
      } else {
        res.send({ message: "Ratings updated successfully." });
      }
    });
  });

app.delete("/games/:id/ratings/:ratingIndex", (req, res) => {
    const id = req.params.id;
    const ratingIndex = req.params.ratingIndex;

    db.query('SELECT all_ratings FROM games WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching ratings:', err);
            res.status(500).send({ error: "Failed to fetch ratings." });
        } else {
            let ratings = JSON.parse(results[0].all_ratings || '[]');
            ratings.splice(ratingIndex, 1);
            const updatedRatings = JSON.stringify(ratings);
            db.query('UPDATE games SET all_ratings = ? WHERE id = ?', [updatedRatings, id], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating ratings:', updateErr);
                    res.status(500).send({ error: "Failed to delete rating." });
                } else {
                    res.json({ success: true, ratings });
                }
            });
        }
    });
});