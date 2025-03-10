export const Loading = () => {
  return (
    <div className="flex w-full h-full space-x-2 justify-center items-center z-20 absolute bg-black/60 top-0 left-0">
      <span className="dot bg-rose-400 w-3 h-3 border-0 rounded-full animate-bounce"></span>
      <span className="dot bg-rose-400 w-3 h-3 rounded-full animate-bounce delay-150"></span>
      <span className="dot bg-rose-400 w-3 h-3 rounded-full animate-bounce delay-300"></span>
    </div>
  );
};
