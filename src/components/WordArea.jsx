import { useState, useEffect } from "react";
import LetterRow from "./LetterRow";

const WordArea = () => {
    const [guesses, setGuesses] = useState([]);
    const [results, setResults] = useState([]);
    const [targetWord, setTargetWord] = useState("");  // This holds the word from the API

    // Fetch the random word from the server
    const getTargetWord = async () => {
        try {
            const response = await fetch("http://localhost:5000/random-word");
            const data = await response.json();
            
            console.log("Target Word received from server:", data.word);  // Log the word received
    
            setTargetWord(data.word); // Set the random word received
            // Reset guesses and results to start fresh
            setGuesses([]);
            setResults([]);
        } catch (error) {
            console.error("Error fetching target word:", error);  // Error handling if fetch fails
        }
    };

    // Initial load fetch
    useEffect(() => {
        getTargetWord();
    }, []);

    // Log target word when it changes
    useEffect(() => {
        if (targetWord) {
            console.log("Target word set in state:", targetWord);  // Log after word is set
        }
    }, [targetWord]); // This will run every time targetWord is updated

    const handleGuess = async (guess) => {
        // Ensure you are checking against the targetWord from the API
        try {
            const response = await fetch("http://localhost:5000/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guess, targetWord }),  // Pass the targetWord here
            });

            const data = await response.json();
            setGuesses([...guesses, guess.split("")]);
            setResults([...results, data]);
        } catch (error) {
            console.error("Error checking word:", error);
        }
    };

    return (
        <div>
            <h2>Target Word: {targetWord}</h2>
            {guesses.map((wordArray, index) => (
                <LetterRow key={index} wordArray={wordArray} colorArray={results[index]} />
            ))}
            <input
                type="text"
                maxLength={5}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleGuess(e.target.value.toUpperCase());
                        e.target.value = "";
                    }
                }}
            />
            <button onClick={getTargetWord} style={{ marginTop: "20px", padding: "10px" }}>
                New Word
            </button>
        </div>
    );
};

export default WordArea;
