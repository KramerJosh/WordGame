import LetterBox from "./LetterBox";

const LetterRow = ( {wordarray} ) => {
    const rowStyle = {
        display: "flex",
        gap: "8px",
        padding: "16px",
    };

   const letters = wordarray

    // maybe put the logic here?  
    // I can run the checkWord() and see assign each returned value?
    // maybe send an array in, {["W", "G"], ["O", "G"]} etc

    return (
        <div style={rowStyle}>
            <LetterBox letter={"L"} bgCol={"green"} />
            <LetterBox letter={"L"} bgCol={"green"} />
            <LetterBox letter={"L"} bgCol={"green"} />
            <LetterBox letter={"L"} bgCol={"green"} />
            <LetterBox letter={"L"} bgCol={"green"} />
        </div>
    );
};

export default LetterRow;
