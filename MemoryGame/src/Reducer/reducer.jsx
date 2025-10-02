import { items } from "./items";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

const initialState = {
  cards: shuffle(items),
  selected: [],
  count: 0, // number of moves (pairs attempted)
  correct: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "FLIPCARD":
      return {
        ...state,
        // Flip the clicked card face-up
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? { ...card, isFlipped: true } : card
        ),
        // Add this card to the selected array for comparison
        selected: [...state.selected, action.payload],
      };

    case "WRONGCHOICE":
      return {
        ...state,
        // Flip back the two selected cards (leave others unchanged)
        cards: state.cards.map((card) =>
          state.selected.some((sel) => sel.id === card.id)
            ? { ...card, isFlipped: false }
            : card
        ),
        // Clear selection so the player can try again
        selected: [],
        count: state.count + 1,
      };

    case "MATCHINGCHOICE":
      return {
        ...state,
        // Mark the two selected cards as solved (they stay face-up)
        cards: state.cards.map((card) =>
          state.selected.some((sel) => sel.id === card.id) // "some" is used to check in any of the selected is within the array === “At least one matches.”
            ? // .some() = “At least one matches.”
              // .every() = “All must match.”
              // .find() = “Give me the first that matches.”
              { ...card, solved: true }
            : card
        ),
        correct: state.correct + 1,
        selected: [],
        count: state.count + 1,
      };

    default:
      throw new Error("Unknown action type");
  }
}

export { reducer, initialState };
