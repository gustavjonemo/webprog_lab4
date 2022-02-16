import { StrictMode } from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComposeSalad from "./ComposeSalad"; //Ny import
import ViewOrder from "./ViewOrder";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
