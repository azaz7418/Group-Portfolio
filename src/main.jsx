import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import {  ConfigProvider, theme } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./pages/redux/store.js";
import App from "./App.jsx";

const queryClient = new QueryClient();
export const baseURL = "http://localhost:5000/api/v1"
axios.defaults.baseURL = baseURL;



const themeConfig = {
  token: {
    colorPrimary: "#00ff99", // Green primary color
    colorText: "#1DA57A",
    colorIcon: "#1DA57A",
    colorTextButtonHover: "#52c41a",
    hoverColor: "#fffff",
  },

  // 1. Use dark algorithm
  algorithm: theme.darkAlgorithm,

  // 2. Combine dark algorithm and compact algorithm
  // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
};



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={themeConfig}>
          <App />
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
