import { useReducer } from "react";
import { items } from "././Reducer/items";

function App() {
  const initialState = {
    cards: items,
    selected: [],
    count: 0,
    correct: 0,
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
          // count: state.count + 1,
          selected: [...state.selected, action.payload],
        };
      case "WRONGCHOICE":
        return {
          ...state,

          cards: state.cards.map((card) =>
            card ? { ...card, isFlipped: false } : card
          ),
          selected: [],
          // count: state.count + 1,
        };
      case "MATCHINGCHOICE":
        return {
          ...state,

          cards: state.cards.map((card) =>
            card.id === action.payload ? { ...card, solved: true } : card
          ),
          selected: [],
          //count: state.count + 1
        };
      // Either

      default:
        throw new Error("ERROR");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleClick(id, match) {
    if (id === state.selected[0]) return; // Prevent clicking duplicate
    console.log(state.cards);
    dispatch({ type: "FLIPCARD", payload: id });
    if (match === state.selected[0]) {
      dispatch({ type: "MATCHINGCHOICE", payload: id });
    }
    if (state.selected.length >= 2) {
      console.log("Wrong Choice");
      dispatch({ type: "WRONGCHOICE", payload: id });
      dispatch({ type: "FLIPCARD", payload: id });
    }
  }

  return (
    <div>
      <Dashboard state={state} />
      <GameBoard>
        {state.cards.map((el) => (
          <Square
            key={el.id}
            id={el.id}
            match={el.isMatching}
            handleClick={handleClick}
            symbol={el.isFlipped ? el.symbol : <p>?</p>}
          />
        ))}
      </GameBoard>
    </div>
  );
}

function Dashboard({ state }) {
  return (
    <div className="flex justify-center mt-5 text-2xl">
      <p>Moves: {state.count}</p>
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

function Square({ handleClick, id, symbol, match }) {
  return (
    <button
      onClick={() => handleClick(id, match)}
      className="border text-2xl font-black"
    >
      {symbol}
    </button>
  );
}

export default App;
