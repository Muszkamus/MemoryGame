import { useReducer } from "react";

const card = {
  id: "",
  symbol: "",
  islipped: false,
  isMatched: false,
};

const initialState = {
  cards: [],
  selected: [],
  moves: 0,
  finished: false,
};
