import { useState } from "react";

function StartMenu({ dispatch }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    e.preventDefault();
    dispatch({ type: "STARTGAME", payload: value });
  }

  return (
    <div>
      <p className="flex justify-center text-6xl text-stone-600  mt-20">
        MEMORIZE GAME
      </p>
      <div className="flex flex-col items-center justify-center mt-30 gap-2">
        <form onSubmit={(e) => handleChange(e)} className="grid grid-rows-2">
          <p className="">Please type your name and hit Enter to play!</p>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border -2 border-black p-2 rounded-lg bg-gray-200 "
            type="text"
            placeholder="Enter your name"
          />
        </form>
      </div>
    </div>
  );
}

export default StartMenu;
