import { FC, useMemo, useState, useCallback } from "react";
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  themeQuartz,
  CellValueChangedEvent,
  RowDragEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { removeStore, updateStore } from "../../redux/store/storeSlice";
import { IStore } from "../../shared/models/Store";
import { Button } from "../ui/Button/Button";
import { GridDeleteButton } from "../ui/GridDeleteButton/GridDeleteButton";
import { AddNewStore } from "../ui/AddNewStore/AddNewStore";

ModuleRegistry.registerModules([AllCommunityModule]);

const Stores: FC = () => {
  const dispatch = useAppDispatch();
  const storesVal: IStore[] = useAppSelector((state) => state.store.stores);
  const rowData = useMemo(
    () => storesVal.map((store) => ({ ...store })),
    [storesVal]
  );
  const [addNewStore, setAddNewStore] = useState(false);

  const removeValFromStoreMethod = useCallback(
    (id: string) => {
      dispatch(removeStore(id));
    },
    [dispatch]
  );

  const onCellValueChanged = useCallback(
    // Handle Cell Edits
    (event: CellValueChangedEvent<IStore>) => {
      const { data, colDef, newValue } = event;

      if (data[colDef.field as keyof IStore] === newValue) return;

      const updatedStore: IStore = {
        ...data,
        [colDef.field as keyof IStore]: newValue,
      };

      dispatch(updateStore(updatedStore));
    },
    [dispatch]
  );

  const onRowDragEnd = (event: RowDragEvent) => {
    const { node, overIndex } = event;

    const draggedData = node.data;
    const draggedIndex = draggedData.sqNo;
    const targetIndex = overIndex + 1;
    const targetData = rowData.filter(
      (rowItem) => rowItem.sqNo === targetIndex
    );

    dispatch(updateStore({ ...draggedData, sqNo: targetIndex }));
    dispatch(updateStore({ ...targetData[0], sqNo: draggedIndex }));
  };

  const columnDefs: (ColDef<IStore> | ColGroupDef<IStore>)[] = useMemo(
    () => [
      {
        headerName: "",
        field: "id",
        width: 100,
        cellRenderer: ({ value }: { value: string }) => (
          <GridDeleteButton
            id={value}
            removeValFromStoreMethod={removeValFromStoreMethod}
          />
        ),
      },
      { headerName: "S.No", field: "sqNo", rowDrag: true },
      { headerName: "Store", field: "label", flex: 1, editable: true },
      { headerName: "City", field: "city", flex: 1, editable: true },
      { headerName: "State", field: "state", flex: 1, editable: true },
    ],
    [removeValFromStoreMethod]
  );

  return (
    <section
      data-testid="stores-section"
      className="bg-gray-200 w-full h-full p-2 flex flex-col gap-2"
    >
      <AgGridReact
        theme={themeQuartz}
        rowData={rowData}
        columnDefs={columnDefs}
        rowDragManaged={true}
        animateRows={true}
        stopEditingWhenCellsLoseFocus={true}
        onCellValueChanged={onCellValueChanged} // Handle cell edits
        onRowDragEnd={onRowDragEnd} // Handles row reordering
      />
      <Button
        testId={"new-store-button"}
        text="New Store"
        onClickHandle={() => setAddNewStore(true)}
      />
      <AddNewStore addNewStore={addNewStore} setAddNewStore={setAddNewStore} />
    </section>
  );
};

export default Stores;
