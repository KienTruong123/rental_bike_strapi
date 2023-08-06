import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import "./i18n";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient} contextSharing>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);
