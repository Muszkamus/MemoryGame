function Square({ handleClick, id, symbol }) {
  return (
    <button
      onClick={() => handleClick(id)}
      className="border text-2xl font-black"
    >
      {symbol}
    </button>
  );
}
export default Square;
