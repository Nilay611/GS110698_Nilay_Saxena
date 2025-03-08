import { MdOutlineDeleteForever } from "react-icons/md";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { removeStore } from "../../../redux/store/storeSlice";

export const GridDeleteButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const handleDeleteStore = (id: string) => dispatch(removeStore(id));

  return (
    <button
      className={
        "w-full h-full flex justify-center items-center text-3xl hover:text-red-500 cursor-pointer"
      }
      onClick={() => handleDeleteStore(id)}
    >
      <MdOutlineDeleteForever />
    </button>
  );
};
