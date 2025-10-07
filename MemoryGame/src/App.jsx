import { useReducer, useState } from "react";
import { initialState, reducer } from "./Reducer/reducer";
import Game from "./Game";
import StartMenu from "./StartMenu";

function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {name === "" ? (
        <StartMenu setName={setName} />
      ) : (
        <Game
          state={state}
          dispatch={dispatch}
          name={name}
          setName={setName}
        ></Game>
      )}
    </div>
  );
}

export default App;
