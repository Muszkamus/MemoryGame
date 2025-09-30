import { useReducer } from "react";
import { items } from "././Reducer/items";

function App() {
  const initialState = {
    cards: items,
    selected: [],
    moves: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "FLIPCARD":
        return {
          ...state,

          cards: state.cards.map((card) =>
            card.id === action.payload
              ? { ...card, isFlipped: !card.isFlipped }
              : card
          ),
          moves: state.moves + 1,
        };

      default:
        throw new Error("ERROR");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  function handleClick(id) {
    dispatch({ type: "FLIPCARD", payload: id });
  }

  return (
    <div>
      <GameBoard>
        {state.cards.map((el) => (
          <Square
            key={el.id}
            id={el.id}
            handleClick={handleClick}
            symbol={el.isFlipped ? el.symbol : <p>?</p>}
          />
        ))}
      </GameBoard>
    </div>
  );
}

function GameBoard({ children }) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 grid-row-3 mt-20 w-100 h-70">
        {children}
      </div>
    </div>
  );
}

function Square({ handleClick, id, symbol }) {
  return (
    <button
      onClick={() => handleClick(id)}
      className="border text-2xl font-black"
    >
      {symbol}
    </button>
  );
}

export default App;
