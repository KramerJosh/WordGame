// in the return we pass key(because we're mapping), letter, and bgColor to LetterBox
// default color is lightgray, which is helpful when there isn't a color assigned (the guess field)
// we get wordArray and colorArray from WordArea.jsx

import LetterBox from './LetterBox';

const LetterRow = ({ wordArray, colorArray }) => {
  const rowStyle = {
    display: "flex",
    gap: "8px",
    padding: "16px",
  };

  return (
    <div style={rowStyle}>
      {wordArray.map((letter, index) => (
        <LetterBox key={index} letter={letter} bgCol={colorArray[index] || "lightgray"}/>
      ))}
    </div>
  );
};

export default LetterRow;
