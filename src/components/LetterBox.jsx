// LetterBox takes letter and bgCol as props
// LetterRow is going to pass both


const LetterBox = ({ letter, bgCol }) => {
  // takes the feedback bgCol and uses it to sest the color of the letter boxes
    let newBgCol = "lightblue"
    let newFontCol = "black"
    if (bgCol === "b") {
        newBgCol = "black"
        newFontCol = "white"
    } else if (bgCol === "g") {
        newBgCol = "green"
        newFontCol = "white"
    } else if (bgCol === "y") {
        newBgCol = "yellow"
        newFontCol = "black"
    } else {
        newBgCol = "lightblue"
    }
    

    return (
      <div
        style={{
            color: newFontCol,
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: newBgCol,
          border: "1px solid black",
          fontWeight: "bold",
        }}
      >
        {letter}
      </div>
    );
  };
  
  export default LetterBox;
  