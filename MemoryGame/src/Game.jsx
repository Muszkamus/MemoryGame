function Game({ state, dispatch, name }) {
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
      // If first card’s id matches second card’s partner (isMatching)
      if (newSelection[0].id === newSelection[1].isMatching) {
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
      <Scoreboard />
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

function Scoreboard() {
  // TODO
  // This will show up when the game is won, fetch data from local storage, with the button to submit score with name to localStorage.
  // There will be button to remove the scores to clean up.
  return <div></div>;
}

function Dashboard({ state, name }) {
  return (
    <div className="flex justify-between mx-50 mt-2 font-bold ">
      <p className="">Player: {name}</p>
      <p className=" flex flex-col">
        Moves: {state.count} | Matches: {state.correct}
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
