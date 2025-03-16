// this component is our keyboard

// it takes 5 props so far, all come in from app.jsx
const Keyboard = ({
  onLetterClick,
  onDelete,
  onSubmit,
  usedLetters,
  otherButtons,
}) => {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ margin: "5px" }}>
          {row.split("").map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              style={{
                margin: "5px",
                padding: "10px",
                fontSize: "16px",
                // if a letter has been used, once the submit button is pressed we disable that button until a new game starts
                cursor: usedLetters.has(letter) ? "not-allowed" : "pointer", 
                backgroundColor: usedLetters.has(letter) ? "lightgray" : "",
              }}
              disabled={usedLetters.has(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={onDelete}
          style={{
            margin: "5px",
            padding: "10px",
            cursor: otherButtons === "disable" ? "not-allowed" : "pointer",
          }}
          disabled={otherButtons === "disable"}
        >
          Delete
        </button>
        <button
          onClick={onSubmit}
          style={{ margin: "5px", padding: "10px", cursor: otherButtons === "disable" ? "not-allowed" : "pointer",
          }}
          disabled={otherButtons === "disable"}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
