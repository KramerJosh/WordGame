import LetterBox from "./LetterBox";

const LetterRow = ({ wordArray, colorArray }) => {
    const rowStyle = {
        display: "flex",
        gap: "8px",
        padding: "16px",
    };

    return (
        <div style={rowStyle}>
            {wordArray.map((letter, index) => (
                <LetterBox key={index} letter={letter} bgCol={colorArray[index]} />
            ))}
        </div>
    );
};

export default LetterRow;
