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

const port = "8081";
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(cors());
app.use(bodyParser.json());

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
