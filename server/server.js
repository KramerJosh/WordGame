const express = require('express');
const cors = require('cors'); // Import cors
const axios = require('axios'); // Import axios

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173'  // Allow only this origin
}));

// Function to fetch words from GitHub using axios
async function fetchWordsFromGitHub() {
    try {
        const response = await axios.get("https://raw.githubusercontent.com/axlrommel/wordle/main/fiveLetterWords.js");
        const data = response.data;
        const words = data.split("\n").map(word => word.trim().toUpperCase());
        return words;
    } catch (error) {
        console.error('Error fetching words from GitHub:', error);
        throw error;  // Rethrow error to be handled by the route
    }
}

// Endpoint to get a random word
app.get('/random-word', async (req, res) => {
    try {
        const wordList = await fetchWordsFromGitHub();  // Get words from GitHub
        const randomIndex = Math.floor(Math.random() * wordList.length);
        const selectedWord = wordList[randomIndex];
        console.log('Selected word:', selectedWord);  // Log to verify the selected word
        res.json({ word: selectedWord });  // Send back the selected word as JSON
    } catch (error) {
        console.error('Error fetching word:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
