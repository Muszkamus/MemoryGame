import { useLocalStorageState } from "../useLocalStorage";
import ScoreBoard from "./ScoreBoard";

function EndGame({ dispatch, state, setScoreAdded, scoreAdded }) {
  const { count, playerName } = state;
  const scoreboardHistory = [];
  const [scoreboard, setScoreboard] = useLocalStorageState(
    scoreboardHistory,
    "scoreboard"
  );

  function addUserScore(e) {
    if (scoreAdded) return;
    const uniqueID = new Date().getTime();
    e.preventDefault();

    const newUserScore = {
      id: uniqueID,
      playerName,
      count,
    };

    setScoreboard([...scoreboard, newUserScore]);
    setScoreAdded(true);
  }

  function handleRestartGame() {
    dispatch({ type: "RESTARTGAME" });
    setScoreAdded(false);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col text-3xl mt-20">
          <p>
            Congratulations {state.playerName}, You have finished the game in{" "}
            {state.count} moves
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
        scoreboard={scoreboard}
        setScoreboard={setScoreboard}
      />
    </>
  );
}

export default EndGame;
