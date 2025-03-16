const express = require("express");
const axios = require("axios");

const router = express.Router();

// Function to fetch words from GitHub
async function fetchWordsFromGitHub() {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/axlrommel/wordle/main/fiveLetterWords.js"
    );
    const data = response.data;
    // ok so - the code below takes all of the words from the github repo as a large array
    // then splits them into substrings whenever there's a space
    // and normalizes them to be all caps.
    // This whole function really only gets called from within the get request below
    const words = data.split("\n").map((word) => word.trim());
    return words;
  } catch (error) {
    console.error("Error fetching words from GitHub:", error);
    throw error;
  }
}

// Endpoint to get a random word
// I'll call this on the client side in words.js

router.get("/random-word", async (__req, res) => {
  try {
    const wordList = await fetchWordsFromGitHub();
    //pick a random number between 0 (if Math.random() = 0) and the length of the list (if Math.random() = 1)
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const selectedWord = wordList[randomIndex];
    // here we log in the server the word with double quotes and a trailing comma
    console.log("Selected word:", selectedWord);
    // we send the same information to the client side as a response
    res.json({ word: selectedWord });
  } catch (error) {
    console.error("Error fetching word:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
