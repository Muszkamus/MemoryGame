import { useEffect } from "react";
import Dashboard from "./DashBoard";
import GameBoard from "./GameBoard";
import Square from "./Square";

function MainGame({ state, dispatch }) {
  const { correct, matchingPairs } = state;
  useEffect(() => {
    if (correct === matchingPairs) dispatch({ type: "FINISHEDGAME" });
  }, [correct, matchingPairs, dispatch]);

  function handleClick(id) {
    // Prevent clicking same card twice
    if (state.selected.some((sel) => sel.id === id)) return;

    // Find the card object from state by its id
    const card = state.cards.find((c) => c.id === id);

    // Skip if card not found or already face-up
    if (!card || card.isFlipped) return;

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
      <Dashboard state={state} />
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
    </div>
  );
}

export default MainGame;
