function Dashboard({ state }) {
  return (
    <div className="flex justify-between mx-50 mt-2 font-bold ">
      <p className="">Player: {state.playerName}</p>
      <p className=" flex flex-col">
        count: {state.count} | Matches: {state.correct}
      </p>
    </div>
  );
}

export default Dashboard;
