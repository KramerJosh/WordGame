// After making sure words.js is looking good, this is where most of the magic happens on the client side.

import { useState, useEffect } from "react";
import LetterRow from "./components/LetterRow";
import Keyboard from "./components/Keyboard";
import { getRandomWord } from "../words"; // Import the getRandomWord function
import Wordle, { GREEN, YELLOW, BLACK } from "./utils/wordle";

const App = () => {
  const [wordle, setWordle] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [usedLetters, setUsedLetters] = useState(new Set()); 
  const [gameHeader, setGameHeader] = useState("Take a Guess!")
  const [otherButtons, setOtherButtons] = useState('')
  const [greenOrYellow, setGreenOrYellow] = useState(new Set());



// this sets the game on page load.  
// currently it's a little bugged, and loads two words quickly.  Doesn't impact game.
  useEffect(() => {
    const fetchWord = async () => {
      const word = await getRandomWord(); 
      if (word) {
        //ok so this first checks if a word has been succesfully sent back, then:
        // it creates a wordle object of class Wordle and passes it the chosen word.
        setWordle(new Wordle(word)); 
        console.log(word)
      }
    };
// now that fetchword has been defined, we call it, but only on page load.
    fetchWord(); 
  }, []); 

  // here we reference the currentGuess state defined above, which starts out as an empty string.
  // as long as that string stays under 5 characters,
  // the string will add the letter to itself
  const handleLetterClick = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  // takes currentGuess string, and modifies it so that it starts in the same place, but ends 1 earlier.
  const handleDelete = () => {
    const lastLetter = currentGuess[currentGuess.length - 1];
    setUsedLetters((prev) => {
      const newUsedLetters = new Set(prev);
       // Remove the last letter from used, double check if this is still needed
      newUsedLetters.delete(lastLetter);
      return newUsedLetters;
    });
    setCurrentGuess((prev) => prev.slice(0, -1));
  };


  const handleSubmit = () => {
    // we should also check if the currentGuess = the target word.
    if (currentGuess === wordle.word) {
      console.log("Correct!")
      // this is where we can put in a return with a congrats message.
      setGameHeader("Correct!")
      // disable the keyboard by setting used letters to contain all letters
      setUsedLetters('abcdefghijklmnopqrstuvwxyz'.split(''))
      // disable delete and submit
      setOtherButtons('disable')
    }

      // first - check if the length is = 5 AND the wordle object exists.
    if (currentGuess.length === 5 && wordle) {
      // feedback holds the background color.
      // we're going to use the checkWord class method in our wordle object and return an array of bg colors.
      const feedback = wordle.checkWord(currentGuess);
      ///guesses is initialized as an empty array, and below we update the array to be hold the last four values entered, plus our current guess and it's color.
      setGuesses((prev) => [...prev.slice(-4), { guess: currentGuess, feedback }]);
      // here we reset the currentGuess to be an empty string
      setCurrentGuess("");
      // this is where we track which letters have been used. 
      setUsedLetters((prevUsedLetters) => {
        // we're tracking two sets here:
        // used letters will become disabled, greenOrYellow are marked as safe and cannot become disabled
        const newUsedLetters = new Set(prevUsedLetters);
        const newGreenOrYellow = new Set(greenOrYellow); 
        
        // here we map over each letter in the current guess
        currentGuess.split("").forEach((letter, index) => {
          // if that letter returns either green or yellow  it gets added to the safe list
          if (feedback[index] === "g" || feedback[index] === "y") {
            newGreenOrYellow.add(letter); 
            // otherwise if it returns black it gets added to the disabled list (assuming it isn't safe)
          } else if (feedback[index] === "b" && !newGreenOrYellow.has(letter)) {
            newUsedLetters.add(letter); 
          }
        });
        // this was a huge pain
        // we're calling the setter for greenAndYellow here, inside of the setter for usedLetters
        // this works way better then creating the green and yellow list first, then calling the setter for used letters
        setGreenOrYellow(newGreenOrYellow);
        return newUsedLetters;
      });
    }
  };
  // we call this function when the New Game button is pressed - thought about also calling this on page load, which I may do
  const handleNewGame = async () => {
    try {
      // we call getRandomWord from the word.js file, which in turn makes an api call to the server, which calls out to the list on github
      const word = await getRandomWord(); 
      // checks if we get a word back
      if (word) {
        // create a new wordle instance of class Wordle - gives us access to Wordle methods
        setWordle(new Wordle(word)); 
        console.log(word)
        // these reset all of the states to make it a new game
        setGuesses([]); 
        setCurrentGuess(""); 
        setUsedLetters(new Set());
        setGameHeader("Take a Guess!");
        setOtherButtons("");
        setGreenOrYellow(new Set());
      }
    } catch (error) {
      console.error("Failed to start a new game:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{gameHeader}</h1>

      {/* Show last 4 guesses with color feedback */}
      {guesses.map((entry, index) => (
        <LetterRow key={index} wordArray={entry.guess.split("")} colorArray={entry.feedback} />
      ))}

      {/* Show current guess */}
      <LetterRow wordArray={currentGuess.split("")} colorArray={Array(5).fill("lightblue")} />

      {/* Keyboard */}
      <Keyboard onLetterClick={handleLetterClick} onDelete={handleDelete} onSubmit={handleSubmit} usedLetters={usedLetters} otherButtons={otherButtons}/>

      {/* New Game Button */}
      <button onClick={handleNewGame} style={{ marginTop: "20px", padding: "10px" }}>
        New Game
      </button>
    </div>
  );
};

export default App;
