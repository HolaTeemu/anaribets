require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const gamesService = require("./services/gamesService");

const Bet = require("./models/bets");
const { response } = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return;
});

app.use(
  morgan(`:method :url :status :res[content-length] :response-time ms :body`)
);

app.get("/api/results", (req, res) => {
  gamesService
    .getResults()
    .then((response) => {
      res.json(response.data.games);
    })
    .catch((error) =>
      console.log(`Error fetching the results - ${error.message}`)
    );
});

app.get("/api/upcoming", (req, res) => {
  const startDate = new Date().toISOString().split("T")[0];
  gamesService
    .getUpcomingGames(startDate)
    .then((response) => {
      res.json(response.data[0].games);
    })
    .catch((error) => {
      console.log(`Error fetching the upcoming games - ${error.message}`);
    });
});

app.get("/api/ongoing", (req, res) => {
  const startDate = new Date().toISOString().split("T")[0];
  gamesService
    .getUpcomingGames(startDate)
    .then((response) => {
      const liveGames = response.data[0].games.filter((game) => game.status.state === "LIVE");
      res.json(liveGames);
    })
    .catch((error) => {
      console.log(`Error fetching the ongoing games - ${error.message}`);
    });
});

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
})

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
