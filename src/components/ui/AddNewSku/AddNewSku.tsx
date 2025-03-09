import { useState } from "react";
import { InputText } from "../InputText/InputText";
import { Button } from "../Button/Button";
import { MdClose } from "react-icons/md";
import { ISku } from "../../../shared/models/Sku";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { addSku } from "../../../redux/sku/skuSlice";

export const AddNewSku = ({
  addNewSku,
  setAddNewSku,
}: {
  addNewSku: boolean;
  setAddNewSku: (state: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const skus = useAppSelector((state) => state.sku.skus); // Get skus
  const [id, setId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [classVal, setClassVal] = useState<string>("");
  const [dept, setDept] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const handleAddNewSku = () => {
    if (
      id === "" ||
      label === "" ||
      classVal === "" ||
      dept === "" ||
      price === "" ||
      cost === ""
    ) {
      setError("All fields are mandatory");
      setShowError(true);
      return;
    }

    const duplicate = skus.filter((sku) => sku.id === id.trim());

    if (duplicate.length) {
      setError("ID already exists");
      setShowError(true);
      return;
    }

    const skuObj: ISku = {
      id: id.trim(),
      label: label.trim(),
      class: classVal.trim(),
      department: dept.trim(),
      price: parseFloat(price.trim()),
      cost: parseFloat(cost.trim()),
    };

    dispatch(addSku(skuObj));

    // Resetting the form fields and the error message
    setId("");
    setLabel("");
    setClassVal("");
    setDept("");
    setPrice("");
    setCost("");
    setError("");
    setShowError(false);
    setAddNewSku(false);
  };

  return (
    <div
      className={`add-dialog-overlay absolute flex justify-center items-center w-screen h-screen top-0 left-0 p-10 bg-gray-500/75 z-10
        ${addNewSku ? "visible" : "invisible"}`}
    >
      <div
        className={"add-dialog w-2/3 pb-2 bg-white rounded-lg flex flex-col"}
      >
        <div
          className={
            "relative add-dialog-header w-full border-b-1 border-gray-300 text-2xl py-4 text-center"
          }
        >
          <h1 data-testid={"add-dialog-header"}>Add New SKU</h1>
          <button
            data-testid={"close-dialog-button"}
            className={
              "absolute top-1/2 -translate-y-1/2 right-4 text-xl rounded-full bg-red-400 text-white p-1 cursor-pointer transition ease-in-out hover:scale-110"
            }
            onClick={() => {
              setError("");
              setShowError(false);
              setAddNewSku(false);
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
            * {error}
          </p>
          <div className={"grid grid-cols-2 gap-4 pt-2 pb-6 w-full"}>
            <InputText inputId="id" inputLabel="ID" value={id} setter={setId} />
            <InputText
              inputId="label"
              inputLabel="SKU"
              value={label}
              setter={setLabel}
            />
            <InputText
              inputId="class"
              inputLabel="Class"
              value={classVal}
              setter={setClassVal}
            />
            <InputText
              inputId="dept"
              inputLabel="Department"
              value={dept}
              setter={setDept}
            />
            <InputText
              inputId="price"
              inputLabel="Price"
              value={price}
              setter={setPrice}
            />
            <InputText
              inputId="cost"
              inputLabel="Cost"
              value={cost}
              setter={setCost}
            />
          </div>
          <Button
            testId={"add-dialog-button"}
            text={"Add New SKU"}
            onClickHandle={handleAddNewSku}
          />
        </div>
      </div>
    </div>
  );
};
