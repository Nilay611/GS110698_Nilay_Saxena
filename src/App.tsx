import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { fetchStoresData } from "./redux/store/storeSlice";
import { fetchSkusData } from "./redux/sku/skuSlice";
import { fetchCalendarData } from "./redux/calendar/calendarSlice";
import { fetchPlanningData } from "./redux/planning/planningSlice";
import { Loading } from "./components/Loading/Loading";

function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) =>
      state.store.loading ||
      state.sku.loading ||
      state.calendar.loading ||
      state.planning.loading
  );

  useEffect(() => {
    const filePath = "/assets/data/SampleData.xlsx";
    dispatch(fetchStoresData(filePath));
    dispatch(fetchSkusData(filePath));
    dispatch(fetchCalendarData(filePath));
    dispatch(fetchPlanningData(filePath));
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return <RouterProvider router={router} />;
}

export default App;
