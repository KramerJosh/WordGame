import { useState } from "react";
import LetterRow from "./LetterRow";

const LetterSelector = ({ onSubmit }) => {
    const [guess, setGuess] = useState([]);
    const maxWordLength = 5; // Adjust as needed

    const keyboardLetters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

    const addLetter = (letter) => {
        if (guess.length < maxWordLength) {
            setGuess([...guess, letter]);
        }
    };

    const removeLetter = () => {
        setGuess(guess.slice(0, -1));
    };

    const handleSubmit = () => {
        if (guess.length === maxWordLength) {
            onSubmit(guess);
            setGuess([]); // Reset after submitting
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            {/* Display current guess */}
            <LetterRow wordArray={guess} colorArray={Array(guess.length).fill("lightgray")} />

            {/* Keyboard Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "5px", marginTop: "10px" }}>
                {keyboardLetters.map((letter) => (
                    <button key={letter} onClick={() => addLetter(letter)} style={buttonStyle}>
                        {letter}
                    </button>
                ))}
            </div>

            {/* Control Buttons */}
            <div style={{ marginTop: "10px" }}>
                <button onClick={removeLetter} style={{ ...buttonStyle, backgroundColor: "orange" }}>Delete</button>
                <button onClick={handleSubmit} style={{ ...buttonStyle, backgroundColor: "green", color: "white" }}>
                    Submit
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#ddd",
    border: "1px solid #aaa",
    borderRadius: "5px",
};

export default LetterSelector;
