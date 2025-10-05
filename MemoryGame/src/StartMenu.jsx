function StartMenu({ setName }) {
  /*
# Form handling (StartMenu)
e.target[0].value is brittle. A senior would suggest controlled input (local state) instead.
PR comment: “Use a controlled component to avoid hidden assumptions.”
  */
  function handleChange(e) {
    e.preventDefault();
    setName(e.target[0].value);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <form onSubmit={handleChange}>
        <input
          className="border -2 border-black p-2 rounded-lg bg-gray-200"
          type="text"
          placeholder="Enter your name"
        ></input>
      </form>
    </div>
  );
}

export default StartMenu;
