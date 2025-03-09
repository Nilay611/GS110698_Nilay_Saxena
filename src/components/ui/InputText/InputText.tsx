export const InputText = ({
  inputLabel,
  inputId,
  value,
  setter,
}: {
  inputLabel: string;
  inputId: string;
  value: string;
  setter: (state: string) => void;
}) => {
  return (
    <div className={"flex flex-col gap-2"}>
      <label htmlFor="id">{inputLabel}:</label>
      <input
        id={inputId}
        className={"border-1 border-gray-300 rounded-md text-lg p-2"}
        type="text"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  );
};
