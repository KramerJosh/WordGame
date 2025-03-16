const Keyboard = ({ onLetterClick, onDelete, onSubmit }) => {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ margin: "5px" }}>
          {row.split("").map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter.toLowerCase())} // Convert letter to lowercase
              style={{
                margin: "5px",
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {letter} {/* Display letter in uppercase */}
            </button>
          ))}
        </div>
      ))}
      <div style={{ marginTop: "10px" }}>
        <button onClick={onDelete} style={{ margin: "5px", padding: "10px" }}>
          Delete
        </button>
        <button onClick={onSubmit} style={{ margin: "5px", padding: "10px" }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
