// ok so this is the first file to look at on the client side.


// this is where we'll make the request to our server for a word.
// check out the vite config for details on how this is allowed
export const getRandomWord = async () => {
  try {
    const response = await fetch("/random-word"); 
    const data = await response.json();

    // Clean up the word: remove quotes, commas, or any unwanted characters
    // trim gets rid of whitespace
    let word = data.word.trim(); 
    // regex used here to say: if you see a single or double quote, or a comma, no you didn't
    return word = word.replace(/['",]/g, '');
  } catch (error) {
    console.error("Error fetching random word:", error);
    return "error"; // Handle any errors gracefully
  }
};

