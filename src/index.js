import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { themeOptions } from "./utils/Theme.ts";
import { ThemeProvider } from "@mui/material";
import { USERS } from "./data/usuarios";

//Seteamos la lista de usuarios en el Local Storage solo si no existe
if (localStorage.getItem("userList") === null) {
  localStorage.setItem("userList", JSON.stringify(USERS));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
