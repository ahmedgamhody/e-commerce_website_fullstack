import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ModeContext from "./context/ModeContext";
import { Provider } from "react-redux";
import { store } from "./RTK/store";
import CurrentUserContext from "./context/CurrentUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CurrentUserContext>
    <ModeContext>
      <BrowserRouter>
        <Provider store={store}>
          <App></App>
        </Provider>
      </BrowserRouter>
    </ModeContext>
  </CurrentUserContext>
);
