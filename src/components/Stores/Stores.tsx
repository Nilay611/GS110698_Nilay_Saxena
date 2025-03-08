import { FC, useMemo } from "react";
// Theme
import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { useAppSelector } from "../../redux/hooks/hooks";
import { Store } from "../../shared/models/Store";
import { Button } from "../ui/Button/Button";
import { GridDeleteButton } from "../ui/GridDeleteButton/GridDeleteButton";

ModuleRegistry.registerModules([AllCommunityModule]);

const Stores: FC = () => {
  const storesVal: Store[] = useAppSelector((state) => state.store.stores);

  const columnDefs: (ColDef<Store> | ColGroupDef<Store>)[] | null | undefined =
    useMemo(
      () => [
        {
          headerName: "",
          field: "id",
          width: 100,
          cellRenderer: ({ value }: { value: string }) => (
            <GridDeleteButton id={value} />
          ),
        },
        { headerName: "S.No", field: "sqNo", rowDrag: true },
        { headerName: "Store", field: "label", flex: 1 },
        { headerName: "City", field: "city", flex: 1 },
        { headerName: "State", field: "state", flex: 1 },
      ],
      []
    );

  return (
    <section
      data-testid={"stores-section"}
      className={"bg-gray-200 w-full h-full p-2 flex flex-col gap-2"}
    >
      <AgGridReact
        theme={themeQuartz}
        rowData={storesVal}
        columnDefs={columnDefs}
        rowDragManaged={true}
        animateRows={true}
      />
      <Button text="New Store" />
    </section>
  );
};

export default Stores;
