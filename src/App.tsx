import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { useDispatch } from "react-redux";
import { setStoreData } from "./redux/store/storeSlice";
import { readStoresData } from "./utils/importStoresData";
import { setSkuData } from "./redux/sku/skuSlice";
import { readSkusData } from "./utils/importSkusData";
import { setCalendarData } from "./redux/calendar/calendarSlice";
import { readCalendarData } from "./utils/importCalendarData";
import { setPlanningData } from "./redux/planning/planningSlice";
import { readPlanningData } from "./utils/importPlanningData";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const filePath = "/assets/data/SampleData.xlsx";
    const loadStoresData = async () => {
      const storesData = await readStoresData(filePath);
      dispatch(setStoreData(storesData));
    };
    const loadSkusData = async () => {
      const skusData = await readSkusData(filePath);
      dispatch(setSkuData(skusData));
    };
    const loadCalendarData = async () => {
      const calendarData = await readCalendarData(filePath);
      dispatch(setCalendarData(calendarData));
    };
    const loadPlanningData = async () => {
      const planningData = await readPlanningData(filePath);
      dispatch(setPlanningData(planningData));
    };

    loadStoresData();
    loadSkusData();
    loadCalendarData();
    loadPlanningData();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
