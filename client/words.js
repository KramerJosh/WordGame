const words = [
    "apple", "beach", "chess", "daisy", "eagle",
    "flame", "grape", "horse", "index", "joker"
  ];
  
  export const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  };
  