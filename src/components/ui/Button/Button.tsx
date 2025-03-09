export const Button = ({
  testId,
  text,
  onClickHandle,
}: {
  testId?: string;
  text: string;
  onClickHandle: () => void;
}) => {
  return (
    <button
      data-testid={testId}
      className={
        "cursor-pointer w-fit h-fit px-6 py-3 bg-red-300 uppercase text-roboto rounded-lg text-2xl hover:bg-red-400 hover:text-white"
      }
      onClick={onClickHandle}
    >
      {text}
    </button>
  );
};
