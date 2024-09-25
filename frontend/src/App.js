import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import { ModeChange } from "./context/ModeContext";
import { Route, Routes } from "react-router-dom";
import WebSite from "./Website/WebSite";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import RequierBack from "./Pages/RequierBack";
import CartPage from "./Pages/CartPage";

function App() {
  const mode = React.useContext(ModeChange);
  const darkTheme = createTheme({
    palette: {
      mode: mode.mode,
      ...(mode.mode === "light"
        ? {
            myColor: {
              main: "#F6F9FC",
            },
            mainBackground: {
              main: "#F6F6F6",
            },
          }
        : {
            myColor: {
              main: "#252b32",
            },
            mainBackground: {
              main: "#1D2021",
            },
          }),
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Routes>
          <Route element={<WebSite />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<RequierBack />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
