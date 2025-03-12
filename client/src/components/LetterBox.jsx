

const LetterBox = ({ letter, bgCol }) => {
    const boxStyle = {
        width: "64px",  // Gotta make width and height equal so it's a square
        height: "64px",
        display: "flex", // flex and center
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgCol, // Background Color should inherit from the same place we're getting the letter.  Green, Yellow, Black.
        color: "white", // white font will work against all three bg colors
        fontSize: "24px",
        fontWeight: "bold",
        borderRadius: "4px", // rounded corners 
    };

    return <div style={boxStyle}>{letter}</div>;
};

export default LetterBox;
