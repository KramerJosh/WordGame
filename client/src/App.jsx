import { useState } from "react";
import LetterRow from "./components/LetterRow";
import Keyboard from "./components/Keyboard";
import { getRandomWord } from "../words";
// import wordleModule from "./utils/wordle";
import Wordle, { GREEN, YELLOW, BLACK } from "./utils/wordle";

const App = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [wordle, setWordle] = useState(new Wordle(targetWord)); // Create Wordle instance
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const handleLetterClick = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length === 5) {
      const feedback = wordle.checkWord(currentGuess); // Use Wordle class to check guess
      setGuesses((prev) => [...prev.slice(-3), { guess: currentGuess, feedback }]); // Keep last 4 guesses
      setCurrentGuess("");
    }
  };

  const handleNewGame = async () => {
    try {
        const response = await fetch("http://localhost:5000/random-word");
        const data = await response.json();
        console.log("Target Word received from server:", data.word); // Log the word received
        setTargetWord(data.word); // Set the random word received from server
    } catch (error) {
        console.error("Error fetching random word:", error);
    }

    // Reset guesses or any other state related to a new game
    setGuesses([]);
    setCurrentGuess("");
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
