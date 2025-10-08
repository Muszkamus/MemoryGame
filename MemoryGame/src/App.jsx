import { useReducer, useState } from "react";
import { initialState, reducer } from "./reducer/reducer";
import MainGame from "./game/MainGame";
import StartMenu from "./game/StartMenu";
import EndGame from "./game/EndGame";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status } = state;

  const [scoreAdded, setScoreAdded] = useState(false);
  return (
    <div>
      {status === "init" && <StartMenu dispatch={dispatch} />}

      {status === "started" && <MainGame state={state} dispatch={dispatch} />}
      {status === "finished" && (
        <EndGame
          setScoreAdded={setScoreAdded}
          state={state}
          dispatch={dispatch}
          scoreAdded={scoreAdded}
        />
      )}
    </div>
  );
}
