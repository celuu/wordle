import { useState, useEffect } from "react"
import { words } from "./words"

const ROWS = 5
const COLS = 5

export const Board = () => {

  const createStartingBoard = () => {
    let result = [];
    for(let i = 0; i < ROWS; i++) {
      result.push([])
      for(let j = 0; j < COLS; j++) {
        result[i].push("_")
      }
    }
    return result

  }
  const [board, setBoard] = useState(() => createStartingBoard());
  const [submittedBoard, setSubmittedBoard] = useState(() => createStartingBoard())
  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);
  const [chosenWord, setChosenWord] = useState()

  useEffect(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      const chosenWord = words[randomNumber];
      setChosenWord(chosenWord);
      document.cookie = `chosen_word=${chosenWord}`;

  }, [])

      console.log(chosenWord, "chosen");

 useEffect(() => {
   const onKeyDown = (event) => {

        if (event.key === "Backspace") {
        if (activeCol === 0) return;
          const newCol = activeCol - 1;

          setBoard((prev) => {
            const copy = prev.map((row) => [...row]);
            copy[activeRow][newCol] = "_";
            return copy;
          });

          setActiveCol(newCol);
          return;
        }

     const isLetter = /^[a-zA-Z]$/.test(event.key);

     if (!isLetter || activeCol >= COLS) return;

     setBoard((prevBoard) => {
       const copy = prevBoard.map((row) => [...row]);
       copy[activeRow][activeCol] = event.key.toUpperCase();
       return copy;
     });
     setActiveCol((col) => col + 1);
   };


   window.addEventListener("keydown", onKeyDown);

   return () => {
     window.removeEventListener("keydown", onKeyDown);
   };
 }, [activeRow, activeCol]);

 const showColor = (letter, index) => {
  if (!chosenWord) return "white";
  letter = letter.toLowerCase();
  if(letter === chosenWord[index]) {
    return "green";
   }
   if (chosenWord.includes(letter)) {
     return "yellow";
   }
    return "gray";
 }

  const checkAnswer = () => {
    let copy = submittedBoard.map(row => [...row])

    setSubmittedBoard(copy)
    setActiveRow((row) => row + 1)
    setActiveCol(0)
  }
    return (
      <div>
        <h1>Wordle</h1>
        <p>Word: {chosenWord}</p>
        <div>
          {board.map((row, r) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
                height: "100px",
                width: "500px",
              }}
              key={r}
            >
              {row.map((col, c) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    border: "1px solid black",
                    borderRadius: "10px",
                    height: "100px",
                    width: "100px",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0",
                    backgroundColor: activeRow > r ? showColor(board[r][c], c) : "white" ,
                  }}
                  key={c}
                >
                  {board[r][c]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button style={{ marginTop: "10px" }} onClick={() => checkAnswer()}>
          Enter
        </button>
      </div>
    );
}