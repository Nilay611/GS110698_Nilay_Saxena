import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Stores from "../components/Stores/Stores";
import Sku from "../components/Sku/Sku";
import Planning from "../components/Planning/Planning";
import Charts from "../components/Charts/Charts";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // Default page when visiting "/"
        element: <Stores />,
      },
      {
        path: "sku", // Route for sku component
        element: <Sku />,
      },
      {
        path: "planning", // Route for planning component
        element: <Planning />,
      },
      {
        path: "charts", // Route for charts component
        element: <Charts />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes); // exporting router for use in App component
