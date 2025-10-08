function ScoreBoard({ scoreboard, setScoreboard }) {
  return (
    <>
      {/* Header */}
      <div className="flex justify-center mt-5">
        <div className="flex flex-row gap-6 text-2xl font-semibold border-b-2 border-gray-400 pb-1">
          <div className="w-32 text-center">Name</div>
          <div className="w-24 text-center">Moves</div>
          <div className="w-40 text-center">Date</div>
          <div className="w-20 text-center">Delete</div>
        </div>
      </div>

      {/* Rows */}
      <ScoreHistory scoreboard={scoreboard} setScoreboard={setScoreboard} />
    </>
  );
}

function ScoreHistory({ scoreboard, setScoreboard }) {
  const date = new Date().toLocaleDateString();
  function deleteUserScore(id) {
    setScoreboard(scoreboard.filter((e) => e.id !== id));
  }

  return (
    <div className="flex flex-col items-center mt-2">
      {scoreboard.map((score) => (
        <div
          key={score.id}
          className="flex flex-row gap-6 text-lg py-1 border-b border-gray-200"
        >
          <div className="w-32 text-center">{score.playerName}</div>
          <div className="w-24 text-center">{score.count}</div>
          <div className="w-40 text-center">{date}</div>
          <div className="w-20 text-center">
            <button
              onClick={() => deleteUserScore(score.id)}
              className="text-red-500 hover:text-red-700"
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScoreBoard;
