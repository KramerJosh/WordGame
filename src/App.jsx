import { useState, useEffect } from "react";
import LetterRow from "./components/LetterRow";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal"; // Import Modal component
import { getRandomWord, getAllWords } from "../words"; // Import word list function
import Wordle, { GREEN, YELLOW, BLACK } from "./utils/wordle";

const App = () => {
  const [wordle, setWordle] = useState(null);
  const [validWords, setValidWords] = useState(new Set()); // Store valid words
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [usedLetters, setUsedLetters] = useState(new Set());
  const [gameHeader, setGameHeader] = useState("Take a Guess!");
  const [otherButtons, setOtherButtons] = useState("");
  const [greenOrYellow, setGreenOrYellow] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [modalMessage, setModalMessage] = useState("Word not in list!"); // State for modal message
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal visibility

  useEffect(() => {
    const fetchWord = async () => {
      const word = await getRandomWord();
      if (word) {
        setWordle(new Wordle(word));
        console.log(word);
      }
    };
    fetchWord();

    // Load valid words into a Set for quick lookup
    setValidWords(new Set(getAllWords()));
  }, []);

  const handleLetterClick = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5) return;

    // Check if the word is valid
    if (!validWords.has(currentGuess)) {
      setModalMessage("Invalid Word!");
      setIsModalOpen(true);
      return;
    }

    if (currentGuess === wordle.word) {
      setGameHeader("Correct!");
      setUsedLetters(new Set("abcdefghijklmnopqrstuvwxyz".split("")));
      setOtherButtons("disable");
    }

    if (wordle) {
      const feedback = wordle.checkWord(currentGuess);
      setGuesses((prev) => [...prev.slice(-4), { guess: currentGuess, feedback }]);
      setCurrentGuess("");

      setUsedLetters((prevUsedLetters) => {
        const newUsedLetters = new Set(prevUsedLetters);
        const newGreenOrYellow = new Set(greenOrYellow);

        currentGuess.split("").forEach((letter, index) => {
          if (feedback[index] === "g" || feedback[index] === "y") {
            newGreenOrYellow.add(letter);
          } else if (feedback[index] === "b" && !newGreenOrYellow.has(letter)) {
            newUsedLetters.add(letter);
          }
        });

        setGreenOrYellow(newGreenOrYellow);
        return newUsedLetters;
      });
    }

    if (guesses.length === 4 && currentGuess !== wordle.word) {
      setOtherButtons("disable");
      setGameHeader("You Lose Mate");
      setGameOver(true);
    }
  };

  const handleNewGame = async () => {
    try {
      const word = await getRandomWord();
      if (word) {
        setWordle(new Wordle(word));
        console.log(word);
        setGuesses([]);
        setCurrentGuess("");
        setUsedLetters(new Set());
        setGameHeader("Take a Guess!");
        setOtherButtons("");
        setGreenOrYellow(new Set());
        setGameOver(false);
        setModalMessage("Invalid Word!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to start a new game:", error);
    }
  };

  return (
    <div id="app-container">
      <h1>{gameHeader}</h1>

      <div id="current-guess-container">
        <LetterRow wordArray={currentGuess.split("")} colorArray={Array(5).fill("lightblue")} />
      </div>

      <div id="guesses-container">
        {guesses.map((entry, index) => (
          <LetterRow key={index} wordArray={entry.guess.split("")} colorArray={entry.feedback} />
        ))}
      </div>

      <div id="new-game-container">
        <button onClick={handleNewGame} className="new-game-button">New Game</button>
      </div>

      <div id="keyboard-container">
        <Keyboard
          onLetterClick={handleLetterClick}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          usedLetters={usedLetters}
          otherButtons={otherButtons}
          gameover={gameOver}
        />
      </div>

      {isModalOpen && <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
