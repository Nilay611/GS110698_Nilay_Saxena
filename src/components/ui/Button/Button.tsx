export const Button = ({
  text,
  onClickHandle,
}: {
  text: string;
  onClickHandle?: () => void;
}) => {
  return (
    <button
      className={
        "cursor-pointer w-fit h-fit px-6 py-3 bg-red-300 uppercase text-roboto rounded-lg drop-shadow-2xl text-2xl hover:bg-red-400"
      }
      onClick={onClickHandle}
    >
      {text}
    </button>
  );
};
