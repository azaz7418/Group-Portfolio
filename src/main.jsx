import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import { NavHelper } from "./layout/NavHelper.jsx";
import ErrorPage from "./ErrorPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {Array.isArray(NavHelper) &&
        NavHelper?.map((nav) => <Route path={nav?.path || "/"} key={nav?.path} element={nav?.component || <></>} />)}

      <Route path="/*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
