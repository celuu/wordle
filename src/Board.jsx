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


  // console.log(randomNumber)
  // console.log(board)
  const [chosenWord, setChosenWord] = useState()

  useEffect(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      const chosenWord = words[randomNumber];
      setChosenWord(chosenWord);
      document.cookie = `chosen_word=${chosenWord}`;

  }, [])



 useEffect(() => {
   const onKeyDown = (event) => {
     const isLetter = /^[a-zA-Z]$/.test(event.key);

     if (!isLetter || activeCol >= COLS) return;

     setBoard((prevBoard) => {
       const copy = prevBoard.map((row) => [...row]);
       copy[activeRow][activeCol] = event.key.toUpperCase();
       return copy;
     });
     setActiveCol((col) => col + 1);
   };

   const backspace = (event) => {

 

   }


   window.addEventListener("keydown", onKeyDown);

   return () => {
     window.removeEventListener("keydown", onKeyDown);
   };
 }, [activeRow, activeCol]);

  const checkAnswer = () => {
    let submittedWord = board[activeRow].map((letter) => letter.toLowerCase())
    let copy = submittedBoard.map(row => [...row])
    let actualWord = chosenWord.split("");
    for(let i = 0; i < COLS; i++) {
      let current = submittedWord[i];
      let actual = actualWord[i];
      if (current === actual) {
        copy[activeRow][i] = "green"
      } else if(actualWord.includes(current)) {
        copy[activeRow][i] = "yellow"
      } else {
        copy[activeRow][i] = "gray"
      }
    }
    setSubmittedBoard(copy)
    setActiveRow((row) => row + 1)
    setActiveCol(0)
  }
    return (
      <div>
        <h1>Board</h1>
        <p>Word: {chosenWord}</p>
        <div>
          {board.map((row, r) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                border: "1px solid black",
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
                    height: "100px",
                    width: "100px",
                    backgroundColor: submittedBoard[r][c],
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