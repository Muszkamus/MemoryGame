function GameBoard({ children }) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 grid-row-4 mt-20 w-100 h-70">
        {children}
      </div>
    </div>
  );
}
export default GameBoard;
