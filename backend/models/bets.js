const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB - ", error.message);
  });

const betsSchema = new mongoose.Schema({
  gameId: String,
  bets: Array,
});

module.exports = mongoose.model("Bet", betsSchema);