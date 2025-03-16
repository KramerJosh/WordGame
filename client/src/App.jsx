import { useState, useEffect } from "react";
import LetterRow from "./components/LetterRow";
import Keyboard from "./components/Keyboard";
import { getRandomWord } from "../words"; // Import the getRandomWord function
import Wordle, { GREEN, YELLOW, BLACK } from "./utils/wordle";

const App = () => {
  const [targetWord, setTargetWord] = useState(null);
  const [wordle, setWordle] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  // Fetch word from server once on mount
  useEffect(() => {
    const fetchWord = async () => {
      const word = await getRandomWord(); // Fetch the random word from words.js
      if (word) {
        setTargetWord(word);
        setWordle(new Wordle(word)); // Create a new Wordle instance
        console.log(word)
      }
    };

    fetchWord(); // Fetch word when the component mounts
  }, []); // Empty dependency array ensures this only runs once

  const handleLetterClick = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length === 5 && wordle) {
      const feedback = wordle.checkWord(currentGuess); // Use Wordle class to check guess
      setGuesses((prev) => [...prev.slice(-3), { guess: currentGuess, feedback }]); // Keep last 4 guesses
      setCurrentGuess("");
    }
  };

  const handleNewGame = async () => {
    try {
      const word = await getRandomWord(); // Get a new word from the GitHub list
      if (word) {
        setTargetWord(word);
        setWordle(new Wordle(word)); // Create a new Wordle instance
        console.log(word)
        setGuesses([]); // Reset guesses
        setCurrentGuess(""); // Reset current guess
      }
    } catch (error) {
      console.error("Failed to start a new game:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Wordle Clone</h1>

      {/* Show last 4 guesses with color feedback */}
      {guesses.map((entry, index) => (
        <LetterRow key={index} wordArray={entry.guess.split("")} colorArray={entry.feedback} />
      ))}

      {/* Show current guess */}
      <LetterRow wordArray={currentGuess.split("")} colorArray={Array(5).fill("lightblue")} />

      {/* Keyboard */}
      <Keyboard onLetterClick={handleLetterClick} onDelete={handleDelete} onSubmit={handleSubmit} />

      {/* New Game Button */}
      <button onClick={handleNewGame} style={{ marginTop: "20px", padding: "10px" }}>
        New Game
      </button>
    </div>
  );
};

export default App;
