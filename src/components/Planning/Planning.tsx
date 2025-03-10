import { FC, useCallback, useMemo } from "react";
import {
  AllCommunityModule,
  CellClassParams,
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { ICalendar } from "../../shared/models/Calendar";
import { IPlanning } from "../../shared/models/Planning";
import { IStore } from "../../shared/models/Store";
import { ISku } from "../../shared/models/Sku";
import { updateSalesUnits } from "../../redux/planning/planningSlice";

ModuleRegistry.registerModules([AllCommunityModule]);

const Planning: FC = () => {
  const dispatch = useAppDispatch();
  const storeVal: IStore[] = useAppSelector((state) => state.store.stores);
  const skuVal: ISku[] = useAppSelector((state) => state.sku.skus);
  const calendarVal: ICalendar[] = useAppSelector(
    (state) => state.calendar.calendar
  );
  const planningVal: IPlanning[] = useAppSelector(
    (state) => state.planning.planning
  );
  const rowData = useMemo(
    () =>
      planningVal
        .map((plan) => {
          const storeName = storeVal.filter((item) => item.id === plan.store)[0]
            ?.label;
          const sku = skuVal.filter((item) => item.id === plan.sku)[0];

          if (!storeName || !sku) return null;

          return {
            ...plan,
            store: storeName,
            sku: sku.label,
            price: sku.price,
            cost: sku.cost,
          };
        })
        .filter((plan) => plan !== null),
    [planningVal, storeVal, skuVal]
  );

  const onCellValueChanged = useCallback(
    (params: CellValueChangedEvent<IPlanning>) => {
      if (params.colDef.field?.includes("-salesUnits")) {
        dispatch(
          updateSalesUnits({
            rowIndex: params.node?.rowIndex ?? 0,
            value: params.newValue as number,
            week: params.colDef.field.split("-")[0],
          })
        );
      }
    },
    [dispatch]
  );

  const transformCalendarData = useCallback(() => {
    const groupedData: Record<
      string,
      {
        headerName: string;
        children: {
          headerName: string;
          children: {
            headerName: string;
            field: string;
            editable?: boolean;
            type?: string;
            sort?: string;
            valueGetter?: (params: CellClassParams) => void;
            cellStyle?: (params: CellClassParams) => void;
          }[];
        }[];
      }
    > = {};

    const columns: (ColDef<IPlanning> | ColGroupDef<IPlanning>)[] = [
      { field: "store", headerName: "Store", pinned: "left", width: 300 },
      { field: "sku", headerName: "SKU", pinned: "left", width: 300 },
    ];

    calendarVal.forEach(({ monthLabel, week, weekLabel }) => {
      if (!groupedData[monthLabel]) {
        groupedData[monthLabel] = {
          headerName: monthLabel,
          children: [],
        };
      }
      groupedData[monthLabel].children.push({
        headerName: weekLabel,
        children: [
          {
            headerName: "Sales Units",
            field: `${week.toLowerCase()}-salesUnits`,
            editable: true,
            type: "numericColumn",
            sort: "desc",
            valueGetter: (params) => {
              return params.data[`${week.toLowerCase()}-salesUnits`] || 0;
            },
          },
          {
            headerName: "Sales Dollars",
            field: `${week.toLowerCase()}-salesDollars`,
            type: "numericColumn",
            valueGetter: (params) => {
              const salesUnits =
                (params.data?.[`${week.toLowerCase()}-salesUnits`] as number) ||
                0;
              const price = params.data?.price || 0;
              return `$ ${(salesUnits * price).toFixed(2)}`;
            },
          },
          {
            headerName: "GM Dollars",
            field: `${week.toLowerCase()}-gmDollars`,
            type: "numericColumn",
            valueGetter: (params) => {
              const salesUnits =
                (params.data?.[`${week.toLowerCase()}-salesUnits`] as number) ||
                0;
              const price = params.data?.price || 0;
              const cost = params.data?.cost || 0;
              return `$ ${(salesUnits * price - salesUnits * cost).toFixed(2)}`;
            },
          },
          {
            headerName: "GM Percent",
            field: `${week.toLowerCase()}-gmPercent`,
            type: "numericColumn",
            valueGetter: (params) => {
              const salesUnits =
                (params.data?.[`${week.toLowerCase()}-salesUnits`] as number) ||
                0;
              const price = params.data?.price || 0;
              const cost = params.data?.cost || 0;
              const salesDollars = salesUnits * price;
              const gmDollars = salesDollars - salesUnits * cost;
              return salesDollars
                ? `${((gmDollars / salesDollars) * 100).toFixed(2)} %`
                : "0%";
            },
            cellStyle: (params: CellClassParams) => {
              const value = parseFloat(params.value);
              if (value >= 40) return { backgroundColor: "#44a248" };
              if (value >= 10) return { backgroundColor: "#facc14" };
              if (value > 5) return { backgroundColor: "#fb923c" };
              return { backgroundColor: "#fda5a5" };
            },
          },
        ],
      });
    });

    columns.push(...Object.values(groupedData));

    return columns;
  }, [calendarVal]);

  const columnDefs: (ColDef<IPlanning> | ColGroupDef<IPlanning>)[] =
    useMemo(() => {
      if (!calendarVal.length) {
        return [
          { field: "store", headerName: "Store", pinned: "left", width: 300 },
          { field: "sku", headerName: "SKU", pinned: "left", width: 300 },
        ]; // Return basic columns while loading
      }
      return transformCalendarData();
    }, [calendarVal, transformCalendarData]);

  return (
    <section
      data-testid="planning-section"
      className="bg-gray-200 w-full h-full p-2 flex flex-col gap-2"
    >
      <AgGridReact
        theme={themeQuartz}
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={onCellValueChanged}
        animateRows={true}
      />
    </section>
  );
};

export default Planning;
