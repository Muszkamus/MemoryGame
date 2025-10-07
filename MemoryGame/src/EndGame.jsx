import { useLocalStorageState } from "./useLocalStorage";
import ScoreBoard from "./ScoreBoard";

function EndGame({
  dispatch,
  state,
  name,
  setName,
  setScoreAdded,
  scoreAdded,
}) {
  const { count } = state;
  const scoreboardHistory = [];
  const [scoreboard, setScoreboard] = useLocalStorageState(
    [],
    scoreboardHistory
  );

  function addUserScore(e) {
    const uniqueID = new Date().getTime();
    e.preventDefault();

    const newUserScore = {
      id: uniqueID,
      name,
      count,
    };

    setScoreboard([...scoreboard, newUserScore]);
    // Logic to add UserScore from reducer
    setScoreAdded(true);
  }

  function handleRestartGame() {
    dispatch({ type: "RESTARTGAME" });
    setName("");
    setScoreAdded(false);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col text-3xl mt-20">
          <p>
            Congratulations {name}, You have finished the game in {state.count}{" "}
            moves
          </p>
          <button
            disabled={scoreAdded}
            onClick={addUserScore}
            className="flex border justify-center mt-5"
          >
            Submit your Score
          </button>

          <button
            onClick={handleRestartGame}
            className="flex border justify-center mt-5"
          >
            Restart the game
          </button>
        </div>
      </div>
      <ScoreBoard
        state={state}
        name={name}
        scoreboard={scoreboard}
        setScoreboard={setScoreboard}
      />
    </>
  );
}

export default EndGame;
