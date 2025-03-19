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
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        position: "fixed", /* Anchor to the bottom */
        bottom: "0", /* Stick to the bottom of the screen */
        width: "100%", /* Full width */
        backgroundColor: "#333",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ margin: "5px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {row.split("").map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              style={{
                margin: "5px",
                padding: "10px",
                fontSize: "16px",
                cursor: usedLetters.has(letter) || gameover === true ? "not-allowed" : "pointer",
                backgroundColor: usedLetters.has(letter) || gameover === true ? "lightgray" : "",
                flex: "1 0 18%", /* Adjusts to 5 keys per row */
                minWidth: "50px", /* Prevent keys from getting too small */
                textAlign: "center",
                borderRadius: "5px",
              }}
              disabled={usedLetters.has(letter) || gameover === true}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={onDelete}
          style={{
            margin: "5px",
            padding: "10px",
            cursor: otherButtons === "disable" ? "not-allowed" : "pointer",
            minWidth: "80px", /* Ensure buttons are wide enough */
          }}
          disabled={otherButtons === "disable"}
        >
          Delete
        </button>
        <button
          onClick={onSubmit}
          style={{
            margin: "5px",
            padding: "10px",
            cursor: otherButtons === "disable" ? "not-allowed" : "pointer",
            minWidth: "80px", /* Ensure buttons are wide enough */
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
