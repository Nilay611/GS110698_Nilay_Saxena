import { FC, useMemo, useState } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { IPlanning } from "../../shared/models/Planning";
import { IStore } from "../../shared/models/Store";
import { ISku } from "../../shared/models/Sku";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Line,
} from "recharts";

const Charts: FC = () => {
  const storeVal: IStore[] = useAppSelector((state) => state.store.stores);
  const skuVal: ISku[] = useAppSelector((state) => state.sku.skus);
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

  const [selectedStore, setSelectedStore] = useState("");

  // Get unique stores for dropdown
  const storeOptions = useMemo(() => {
    return [...new Set(rowData.map((item) => item.store))];
  }, [rowData]);

  // Aggregate data
  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    const storeData = rowData.filter((item) => item.store === selectedStore);
    const weeklyTotals: Record<
      string,
      { salesDollars: number; gmDollars: number }
    > = {};

    storeData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        const regex = /^w(\d+)-salesUnits$/;
        const match = regex.exec(key);
        if (match) {
          const week = match[1];
          const salesUnits = (item[key] as number) || 0;
          const salesDollars = Number(
            (salesUnits * (item.price as number)).toFixed(2)
          );
          const gmDollars = Number(
            (salesDollars - salesUnits * (item.cost as number)).toFixed(2)
          );

          if (!weeklyTotals[week]) {
            weeklyTotals[week] = { salesDollars: 0, gmDollars: 0 };
          }

          weeklyTotals[week].salesDollars += salesDollars;
          weeklyTotals[week].gmDollars += gmDollars;
        }
      });
    });

    const sortedWeeklyTotals = Object.entries(weeklyTotals)
      .map(([week, { salesDollars, gmDollars }]) => ({
        week: `W${week}`,
        gmDollars,
        gmPercent: salesDollars
          ? Number(((gmDollars / salesDollars) * 100).toFixed(2))
          : 0,
      }))
      .sort((a, b) => {
        const weekA = parseInt(a.week.slice(1)); // Extract week number and convert to integer
        const weekB = parseInt(b.week.slice(1)); // Extract week number and convert to integer
        return weekA - weekB; // Sort in ascending order
      });

    return sortedWeeklyTotals;
  }, [selectedStore, rowData]);

  return (
    <section className="flex flex-col gap-4 p-4 h-full justify-center items-center">
      <select
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
        className={
          "border border-gray-300 p-4 rounded-lg text-lg cursor-pointer m-4 w-full"
        }
      >
        <option value="">Select a Store</option>
        {storeOptions.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>

      <h1 className="text-2xl font-bold">Gross Margin</h1>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="week" />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(value) =>
              `$${value / 1000}${value === 0 ? "" : "k"}`
            }
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#00ccfe"
            name="GM Dollars ($)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercent"
            stroke="#ff7300"
            name="GM%"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Charts;
