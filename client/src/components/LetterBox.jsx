// LetterBox takes letter and bgCol as props
// LetterRow is going to pass both

const LetterBox = ({ letter, bgCol }) => {
    let newBgCol = "lightblue"
    if (bgCol === "b") {
        newBgCol = "black"
    } else if (bgCol === "g") {
        newBgCol = "green"
    } else if (bgCol === "y") {
        newBgCol = "yellow"
    } else {
        newBgCol = "lightblue"
    }
    

    return (
      <div
        style={{
            color: "white",
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
  