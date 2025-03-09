import { MdOutlineDeleteForever } from "react-icons/md";

export const GridDeleteButton = ({
  id,
  removeValFromStoreMethod,
}: {
  id: string;
  removeValFromStoreMethod: (id: string) => void;
}) => {
  return (
    <button
      className={
        "w-full h-full flex justify-center items-center text-3xl hover:text-red-500 cursor-pointer"
      }
      onClick={() => removeValFromStoreMethod(id)}
    >
      <MdOutlineDeleteForever />
    </button>
  );
};
