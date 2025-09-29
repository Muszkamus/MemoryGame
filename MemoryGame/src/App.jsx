import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(6).fill(false));
  console.log(board);

  // To do: Time to now show the condition when the box is clicked, it changes to colour, and it reverts back when clicked again

  function handleClick(id) {
    setBoard((prev) => {
      const copy = [...prev];
      if (copy[id] === false) {
        copy[id] = true;
        return copy;
      }
      copy[id] = false;
      return copy;
    });
  }
  return (
    <div>
      <GameBoard>
        {board.map((el, index) => (
          <Square
            key={index}
            value={board[index]}
            handleClick={handleClick}
            id={index}
            board={board}
          />
        ))}
      </GameBoard>
    </div>
  );
}

function GameBoard({ children }) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 grid-row-3 mt-20 w-100 h-65">
        {children}
      </div>
    </div>
  );
}

function Square({ handleClick, board, id }) {
  return (
    <button
      onClick={() => handleClick(id)}
      className="border text-2xl font-black"
    >
      {board[id]}
    </button>
  );
}

export default App;
