const items = [
  // Change is Matching to PairID

  // ## Data shape assumptions
  // if (newSelection[0].id === newSelection[1].isMatching) assumes a specific data model (isMatching).
  // Senior would want either validation of items or a clearer definition of items schema (symbol, pairId, etc.).

  {
    id: 0,
    symbol: "🍕",
    isFlipped: false,
    isMatching: 1,
    solved: false,
  },
  {
    id: 1,
    symbol: "🍕",
    isFlipped: false,
    isMatching: 0,
    solved: false,
  },
  {
    id: 2,
    symbol: "⭐",
    isFlipped: false,
    isMatching: 3,
    solved: false,
  },
  {
    id: 3,
    symbol: "⭐",
    isFlipped: false,
    isMatching: 2,
    solved: false,
  },
  {
    id: 4,
    symbol: "🌴",
    isFlipped: false,
    isMatching: 5,
    solved: false,
  },
  {
    id: 5,
    symbol: "🌴",
    isFlipped: false,
    isMatching: 4,
    solved: false,
  },
  {
    id: 6,
    symbol: "🐻",
    isFlipped: false,
    isMatching: 7,
    solved: false,
  },
  {
    id: 7,
    symbol: "🐻",
    isFlipped: false,
    isMatching: 6,
    solved: false,
  },
];

export { items };
