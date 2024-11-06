import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import { NavHelper } from "./layout/NavHelper.jsx";
import ErrorPage from "./ErrorPage.jsx";
import axios from "axios";
import { ConfigProvider, theme } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
axios.defaults.baseURL = "http://localhost:5000/api/v1";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {Array.isArray(NavHelper) &&
        NavHelper?.map((nav) => <Route path={nav?.path || "/"} key={nav?.path} element={nav?.component || <></>} />)}

      <Route path="/*" element={<ErrorPage />} />
    </Route>
  )
);

const themeConfig = {
  token: {
    colorPrimary: "#00ff99", // Green primary color
    colorLink: "#ffff",
    colorText: "#1DA57A",
    colorIcon: "#1DA57A",
  },

  // 1. Use dark algorithm
  algorithm: theme.darkAlgorithm,

  // 2. Combine dark algorithm and compact algorithm
  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
