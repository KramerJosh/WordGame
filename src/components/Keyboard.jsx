const Keyboard = ({
  onLetterClick,
  onDelete,
  onSubmit,
  usedLetters,
  otherButtons,
  gameover,
}) => {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  return (
    <div className="keyboard-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.split("").map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              className="keyboard-button"
              style={{
                cursor: usedLetters.has(letter) || gameover ? "not-allowed" : "pointer",
                backgroundColor: usedLetters.has(letter) || gameover ? "lightgray" : "",
              }}
              disabled={usedLetters.has(letter) || gameover}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-controls">
        <button
          onClick={onDelete}
          disabled={otherButtons === "disable"}
        >
          Delete
        </button>
        <button
          onClick={onSubmit}
          disabled={otherButtons === "disable"}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
