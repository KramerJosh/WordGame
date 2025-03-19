// ok so this is the first file to look at on the client side.

// I should probably take the call from the server and put it here



const GITHUB_WORDS_URL = "https://raw.githubusercontent.com/axlrommel/wordle/main/fiveLetterWords.js";

export const getRandomWord = async () => {
  try {
    const response = await fetch(GITHUB_WORDS_URL);
    const text = await response.text(); // Get raw text from the file

    // Split into an array and clean up the words
    const wordList = text.split("\n").map((word) => word.trim());

    // Pick a random word
    const randomIndex = Math.floor(Math.random() * wordList.length);
    let word = wordList[randomIndex];

    // Clean up any unwanted characters (quotes, commas, etc.)
    word = word.replace(/['",]/g, "");

    console.log("Selected word:", word); 
    return word;
  } catch (error) {
    console.error("Error fetching words from GitHub:", error);
    return "error"; 
  }
};
