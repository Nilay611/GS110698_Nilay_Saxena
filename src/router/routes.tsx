import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Stores from "../components/Stores/Stores";
import Sku from "../components/Skus/Skus";
import Planning from "../components/Planning/Planning";
import Charts from "../components/Charts/Charts";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../utils/ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: "/login", // Login component
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
