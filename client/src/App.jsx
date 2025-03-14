import { useState } from "react";
import LetterRow from "./components/LetterRow";
import Keyboard from "./components/Keyboard";
import { getRandomWord } from "../words";
import { checkGuess } from "../../server/src/classes/wordle"; // Import checkGuess

const App = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord());
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
      const feedback = checkGuess(currentGuess, targetWord); // Get feedback for guess
      setGuesses((prev) => [...prev.slice(-3), { guess: currentGuess, feedback }]); // Keep last 4 guesses
      setCurrentGuess("");
    }
  };

  const handleNewGame = () => {
    setTargetWord(getRandomWord());
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
