import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppRoutes from "../src/routas";
import { ChakraProviderNew } from "./providers/layout";
import SubmitContextProvider from "./provider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProviderNew>
      <DndProvider backend={HTML5Backend}>
        <SubmitContextProvider>
          <AppRoutes />
        </SubmitContextProvider>
      </DndProvider>
    </ChakraProviderNew>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
