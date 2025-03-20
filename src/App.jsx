import { useState, useEffect } from "react";
import LetterRow from "./components/LetterRow";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal"; // Import Modal component
import { getRandomWord, getAllWords } from "../words"; // Import word list function
import Wordle, { GREEN, YELLOW, BLACK } from "./utils/wordle";

const App = () => {
  // Used to store the current wordle game (instance of the wordle class)
  const [wordle, setWordle] = useState(null);
  // a set that contains all possible words, used for validation
  const [validWords, setValidWords] = useState(new Set());
  // an array of previous guesses, will be visible on the page
  const [guesses, setGuesses] = useState([]);
  // a string that, once submitted, will be added to the guesses array
  const [currentGuess, setCurrentGuess] = useState("");
  // a set that contains all letters that have been guessed, but aren't in the green or yellow array
  const [usedLetters, setUsedLetters] = useState(new Set());
  // set's the game header, changes based on victory state
  const [gameHeader, setGameHeader] = useState("Take a Guess!");
  // we'll pass this value into the keyboard - it determines whether the submit and delete keys are disabled
  const [otherButtons, setOtherButtons] = useState("");
  // this set tracks which letters have been green or yellow at any point in the current game.  Keeps letters from being disabled in edge cases
  const [greenOrYellow, setGreenOrYellow] = useState(new Set());
  // set's game state to failure, disables all keys but new game and changes header
  const [gameOver, setGameOver] = useState(false);
  // sets the messasge for the modal, right now it'll always be the same.
  const [modalMessage, setModalMessage] = useState("Word not in list!"); 
  // Controls modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // runs on page load to set word
  useEffect(() => {
    const fetchWord = async () => {
      //runs the getRandomWord function imported from words.js
      const word = await getRandomWord();
      if (word) {
        // creates a new Wordle Object with the word
        setWordle(new Wordle(word));
        console.log(word);
      }
    };
    fetchWord();

    // creates a set for validation
    setValidWords(new Set(getAllWords()));
  }, []);

  // when I click a letter, if i haven't done 5 letters yet, add that letter to the end of my current guess
  const handleLetterClick = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };
  // if i hit delete, set the current guess to the same string, but remove the last letter
  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  // when i hit submit, 
  const handleSubmit = () => {
    // if the current guess is not long enough end loop
    if (currentGuess.length !== 5) return;

    // if we get past the first statemnet, we know that the word has 5 letters, so all remaining paths assume that

    // if the valid words set does not contain the current guess, pop up a modal to tell us
    if (!validWords.has(currentGuess)) {
      setModalMessage("Word not in list!");
      setIsModalOpen(true);
      return;
    }

    // if the current guess is the word, set the header to congrats, disable everything but the new game key.
    if (currentGuess === wordle.word) {
      setGameHeader("Correct!");
      setUsedLetters(new Set("abcdefghijklmnopqrstuvwxyz".split("")));
      setOtherButtons("disable");
    }

    // if we're in a current game of wordle
    if (wordle) {
      // create an array of feeback colors based on the current word, using the checkWord class method
      const feedback = wordle.checkWord(currentGuess);
      // take the previously exisitng guesses, and add to them the current guess with the color feedback.
      // the ...prev.slice(-4) ensures we only ever see 5 guesses max, it's part of older code though
      setGuesses((prev) => [...prev.slice(-4), { guess: currentGuess, feedback }]);
      setCurrentGuess("");
      // once the guess is submitted, we update the letter trackers
      setUsedLetters((prevUsedLetters) => {
        const newUsedLetters = new Set(prevUsedLetters);
        const newGreenOrYellow = new Set(greenOrYellow);

        currentGuess.split("").forEach((letter, index) => {
          // if the letter feedback was either green or yellow, add it to the green or yellow tracker
          if (feedback[index] === "g" || feedback[index] === "y") {
            newGreenOrYellow.add(letter);
            // if the feedback was black AND the letter isn't in the green or yellow tracker
          } else if (feedback[index] === "b" && !newGreenOrYellow.has(letter)) {
            // add the letter to the disabled list
            newUsedLetters.add(letter);
          }
        });

        setGreenOrYellow(newGreenOrYellow);
        return newUsedLetters;
      });
    }
    // if there were already 4 previous guesses, and the 5th guess isn't the wordle, set game state to "game over", disable the other buttons, and change header to include the wordle.
    if (guesses.length === 4 && currentGuess !== wordle.word) {
      setOtherButtons("disable");
      setGameHeader(`Game Over. Word was ${wordle.word}.`);
      setGameOver(true);
    }
  };

    // this is what happens when you hit the new game button
  const handleNewGame = async () => {
    // try to get a new word and create new wordle object
    try {
      const word = await getRandomWord();
      if (word) {
        setWordle(new Wordle(word));
        // add the word the console for debugging
        console.log(word);
        // initalize everything back to base state
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
