import LetterBox from "./LetterBox";

const LetterRow = () => {
    const rowStyle = {
        display: "flex",
        gap: "8px",
        padding: "16px",
    };

    // maybe put the logic here?  
    // I can run the checkWord() and see assign each returned value?

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
