import { Toolbar } from "@mui/material";
import { useState } from "react";
import { Formulario } from "../components/Formulario";
import { getLocalUserData } from "../utils/LocalStorageGetters";

export const MisDatos = () => {
  return (
    <div
      className="full-size centrar"
      style={{ flexDirection: "column", justifyContent: "flex-start" }}
    >
      <Toolbar />
      <h2>Datos Personales:</h2>
      <Formulario data={getLocalUserData()} />
    </div>
  );
};
