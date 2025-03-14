import { useState } from "react";
import LetterRow from "./LetterRow";

const testWord = "STINK"; // This should eventually come from the backend.

const WordArea = () => {
    const [guesses, setGuesses] = useState([]);
    const [results, setResults] = useState([]);

    const handleGuess = async (guess) => {
        try {
            // Call backend to check the guess
            const response = await fetch("http://localhost:5000/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guess }),
            });

            const data = await response.json();
            setGuesses([...guesses, guess.split("")]);
            setResults([...results, data]); // Assuming data returns an array like [G, B, Y, G, B]
        } catch (error) {
            console.error("Error checking word:", error);
        }
    };

    return (
        <div>
            {guesses.map((wordArray, index) => (
                <LetterRow key={index} wordArray={wordArray} colorArray={results[index]} />
            ))}
            {/* Add an input field for testing */}
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
        </div>
    );
};

export default WordArea;
