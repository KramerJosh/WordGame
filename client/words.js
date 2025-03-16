let words = []; // This will store the fetched words
let isWordsFetched = false; // A flag to ensure the words are fetched only once

// This function fetches words from the server (via your /random-word endpoint)
export const fetchWords = async () => {
  if (!isWordsFetched) { // Check if words have been fetched already
    try {
      const response = await fetch('http://localhost:5000/random-word'); // Your server endpoint
      const data = await response.json();
      
      if (data.word) {
        // Remove any surrounding quotes, trim spaces, and ensure it's lowercase
        let formattedWord = data.word.replace(/"/g, '').trim().toLowerCase();
        
        // Remove any trailing comma, just in case
        formattedWord = formattedWord.replace(/,$/, '').trim();

        // Add the formatted word into the words array (no comma issue)
        if (formattedWord) {
          words.push(formattedWord);
        }
        
        isWordsFetched = true; // Set the flag to prevent further fetching
        console.log("Fetched word from server:", formattedWord);
      } else {
        console.error("No word received from the server.");
      }
    } catch (error) {
      console.error("Error fetching words from the server:", error);
    }
  }
};

export const getRandomWord = async () => {
  try {
    const response = await fetch("http://localhost:5000/random-word");
    const data = await response.json();

    // Clean up the word: remove quotes, commas, or any unwanted characters
    let word = data.word.trim(); // Remove leading/trailing spaces
    word = word.replace(/['",]/g, ''); // Remove quotes and commas

    return word.toLowerCase(); // Ensure it's in lowercase
  } catch (error) {
    console.error("Error fetching random word:", error);
    return "error"; // Handle any errors gracefully
  }
};
