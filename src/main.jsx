import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";

const HomePage = lazy(() => import("@pages/HomePage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ModalProvider>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </ModalProvider>,
);
