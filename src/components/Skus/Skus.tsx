import { FC, useMemo, useState, useCallback } from "react";
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  themeQuartz,
  CellValueChangedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { removeSku, updateSku } from "../../redux/sku/skuSlice";
import { ISku } from "../../shared/models/Sku";
import { Button } from "../ui/Button/Button";
import { GridDeleteButton } from "../ui/GridDeleteButton/GridDeleteButton";
import { AddNewSku } from "../ui/AddNewSku/AddNewSku";

ModuleRegistry.registerModules([AllCommunityModule]);

const Skus: FC = () => {
  const dispatch = useAppDispatch();
  const skusVal: ISku[] = useAppSelector((state) => state.sku.skus);
  const rowData = useMemo(() => skusVal.map((sku) => ({ ...sku })), [skusVal]);
  const [addNewSku, setAddNewSku] = useState(false);

  const removeValFromStoreMethod = useCallback(
    (id: string) => {
      dispatch(removeSku(id));
    },
    [dispatch]
  );

  const onCellValueChanged = useCallback(
    // Handle Cell Edits
    (event: CellValueChangedEvent<ISku>) => {
      const { data, colDef, newValue } = event;

      if (data[colDef.field as keyof ISku] === newValue) return;

      const updatedSku: ISku = {
        ...data,
        [colDef.field as keyof ISku]: newValue,
      };

      dispatch(updateSku(updatedSku));
    },
    [dispatch]
  );

  const columnDefs: (ColDef<ISku> | ColGroupDef<ISku>)[] = useMemo(
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
      { headerName: "SKU", field: "label", flex: 1, editable: true },
      {
        headerName: "Price",
        field: "price",
        flex: 1,
        editable: true,
        type: "numericColumn",
        valueGetter: (params) => `$ ${params.data?.price}`,
      },
      {
        headerName: "Cost",
        field: "cost",
        flex: 1,
        editable: true,
        type: "numericColumn",
        valueGetter: (params) => `$ ${params.data?.cost}`,
      },
    ],
    [removeValFromStoreMethod]
  );

  return (
    <section
      data-testid="skus-section"
      className="bg-gray-200 w-full h-full p-2 flex flex-col gap-2"
    >
      <AgGridReact
        theme={themeQuartz}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        stopEditingWhenCellsLoseFocus={true}
        onCellValueChanged={onCellValueChanged} // Handle cell edits
      />
      <Button
        testId={"new-sku-button"}
        text="New SKU"
        onClickHandle={() => setAddNewSku(true)}
      />
      <AddNewSku addNewSku={addNewSku} setAddNewSku={setAddNewSku} />
    </section>
  );
};

export default Skus;
