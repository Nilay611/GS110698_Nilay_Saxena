import { useState } from "react";
import { InputText } from "../InputText/InputText";
import { Button } from "../Button/Button";
import { MdClose } from "react-icons/md";
import { IStore } from "../../../shared/models/Store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { addStore } from "../../../redux/store/storeSlice";

export const AddNewStore = ({
  addNewStore,
  setAddNewStore,
}: {
  addNewStore: boolean;
  setAddNewStore: (state: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state) => state.store.stores); // Get stores
  const [id, setId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const handleAddNewStore = () => {
    if (id === "" || label === "" || city === "" || state === "") {
      setShowError(true);
      return;
    }

    const storeObj: IStore = {
      sqNo: stores.length + 1, // Auto-increment serial number
      id: id.trim(),
      label: label.trim(),
      city: city.trim(),
      state: state.trim(),
    };

    dispatch(addStore(storeObj));

    // Resetting the form fields and the error message
    setId("");
    setLabel("");
    setCity("");
    setState("");
    setShowError(false);
    setAddNewStore(false);
  };

  return (
    <div
      className={`add-dialog-overlay absolute flex justify-center items-center w-screen h-screen top-0 left-0 p-10 bg-gray-500/75 z-10
        ${addNewStore ? "visible" : "invisible"}`}
    >
      <div
        className={"add-dialog w-2/3 pb-2 bg-white rounded-lg flex flex-col"}
      >
        <div
          className={
            "relative add-dialog-header w-full border-b-1 border-gray-300 text-2xl py-4 text-center"
          }
        >
          <h1 data-testid={"add-dialog-header"}>Add New Store</h1>
          <button
            data-testid={"close-dialog-button"}
            className={
              "absolute top-1/2 -translate-y-1/2 right-4 text-xl rounded-full bg-red-400 text-white p-1 cursor-pointer transition ease-in-out hover:scale-110"
            }
            onClick={() => {
              setShowError(false);
              setAddNewStore(false);
            }}
          >
            <MdClose />
          </button>
        </div>
        <div
          className={
            "relative add-dialog-content flex-grow flex flex-col items-center px-10 py-6"
          }
        >
          <p
            className={`absolute text-red-500 top-0 ${showError ? "visible" : "invisible"}`}
          >
            * All fields are mandatory
          </p>
          <div className={"grid grid-cols-2 gap-4 pt-2 pb-6 w-full"}>
            <InputText inputId="id" inputLabel="ID" value={id} setter={setId} />
            <InputText
              inputId="label"
              inputLabel="Store"
              value={label}
              setter={setLabel}
            />
            <InputText
              inputId="city"
              inputLabel="City"
              value={city}
              setter={setCity}
            />
            <InputText
              inputId="state"
              inputLabel="State"
              value={state}
              setter={setState}
            />
          </div>
          <Button
            testId={"add-dialog-button"}
            text={"Add New Store"}
            onClickHandle={handleAddNewStore}
          />
        </div>
      </div>
    </div>
  );
};
