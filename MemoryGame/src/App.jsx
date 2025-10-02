import { useReducer, useState } from "react";
import { initialState, reducer } from "./Reducer/reducer";
import Game from "./Game";
import StartMenu from "./StartMenu";

function App() {
  const [name, setName] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(name);
  return (
    <div>
      {/* Do ternary operation here to switch between <StartMenu> and game view */}
      {name === "" ? (
        <StartMenu setName={setName} />
      ) : (
        <Game state={state} dispatch={dispatch} name={name} />
      )}
    </div>
  );
}

export default App;
