const express = require("express");
const cors = require("cors");
const { Wordle, GREEN, YELLOW, BLACK } = require("./src/classes/Wordle");

const app = express();
app.use(express.json());
app.use(cors());

const game = new Wordle("STINK"); // This should be random in a real game

app.post("/check", (req, res) => {
    const { guess } = req.body;
    const result = game.checkWord(guess);
    res.json(result);
});

app.listen(5000, () => console.log("Server running on port 5000"));
