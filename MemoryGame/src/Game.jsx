import { useEffect, useState } from "react";

import EndGame from "./EndGame";

function Game({ state, dispatch, name, setName }) {
  const [scoreAdded, setScoreAdded] = useState(false);

  // Prevents too-many render issues
  useEffect(() => {
    if (state.correct === state.matchingPairs) {
      dispatch({ type: "FINISHEDGAME" });
    }
  }, [dispatch, state.correct, state.matchingPairs]);

  function handleClick(id) {
    /*
## Game logic coupling
Right now, Game mixes UI rendering with match-check logic (handleClick has both concerns).
A senior might push you to move match detection into the reducer, so the reducer owns all game logic.
Example: instead of setTimeout in the component, dispatch an action like CHECK_MATCH and let reducer handle outcomes.
*/

    // Prevent clicking same card twice
    if (state.selected.some((sel) => sel.id === id)) return;

    // Find the card object from state by its id
    const card = state.cards.find((c) => c.id === id);

    // Skip if card not found or already face-up
    if (!card || card.isFlipped) return;

    // Flip the card and add it to selected
    dispatch({ type: "FLIPCARD", payload: card });

    // If two cards are selected, check for a match
    const newSelection = [...state.selected, card];

    if (newSelection.length === 2) {
      // If first card’s id matches second card’s partner (pairID)
      if (newSelection[0].id === newSelection[1].pairID) {
        setTimeout(() => {
          dispatch({ type: "MATCHINGCHOICE" });
        }, 100);
      } else {
        setTimeout(() => {
          dispatch({ type: "WRONGCHOICE" });
        }, 500);
      }
    }
  }

  return (
    <div>
      <Dashboard state={state} name={name} />

      {state.finishedStatus === true ? (
        <>
          <EndGame
            setScoreAdded={setScoreAdded}
            state={state}
            name={name}
            dispatch={dispatch}
            setName={setName}
            scoreAdded={scoreAdded}
          />
        </>
      ) : (
        <GameBoard>
          {state.cards.map((el) => (
            <Square
              key={el.id}
              id={el.id}
              handleClick={handleClick}
              symbol={el.isFlipped || el.solved ? el.symbol : <p>?</p>}
            />
          ))}
        </GameBoard>
      )}
    </div>
  );
}

function Dashboard({ state, name }) {
  return (
    <div className="flex justify-between mx-50 mt-2 font-bold ">
      <p className="">Player: {name}</p>
      <p className=" flex flex-col">
        count: {state.count} | Matches: {state.correct}
      </p>
    </div>
  );
}

function GameBoard({ children }) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 grid-row-4 mt-20 w-100 h-70">
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

export default Game;
