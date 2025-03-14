const LetterBox = ({ letter, bgCol }) => {
    const boxStyle = {
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #ccc',
      backgroundColor: bgCol,  // Apply the color passed as a prop
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    };
  
    return <div style={boxStyle}>{letter}</div>;
  };
  
  export default LetterBox;
  