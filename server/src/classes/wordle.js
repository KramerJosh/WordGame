// wordle.js

export const checkGuess = (guess, targetWord) => {
  const feedback = [];
  const targetArray = targetWord.split("");
  const guessArray = guess.split("");

  // First pass: check for correct positions (green)
  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === targetArray[i]) {
      feedback[i] = "green"; // Correct position
      targetArray[i] = null; // Remove matched letter from target
    } else {
      feedback[i] = null; // Placeholder for yellow/gray
    }
  }

  // Second pass: check for correct letters in the wrong positions (yellow)
  for (let i = 0; i < guessArray.length; i++) {
    if (feedback[i] === null && targetArray.includes(guessArray[i])) {
      feedback[i] = "yellow";
      targetArray[targetArray.indexOf(guessArray[i])] = null;
    }
  }

  // Third pass: any remaining letters are incorrect (gray)
  for (let i = 0; i < guessArray.length; i++) {
    if (feedback[i] === null) {
      feedback[i] = "gray";
    }
  }

  return feedback;
};
