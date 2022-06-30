import { Button, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../utils/Constants";
import { getAllUsers, getToken } from "../utils/LocalStorageGetters";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [capsLock, setCapsLock] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");

  const performLogin = (user, pass) => {
    /*
        Aqui vendría la llamada a la api para hacer el login,
        retornaría los datos del usuario y el token temporal del mismo si sus credenciales son correctas.
    */
    //Simulamos la validación de usuario / contraseña
    const usuarioFiltrado = getAllUsers().filter(
      (u) => u.usuario === user && u.password === pass
    );
    if (usuarioFiltrado.length === 1)
      return { data: usuarioFiltrado[0], token: "_TOKEN_" };
  };

  useEffect(() => {
    if (getToken() !== null) {
      navigate("/home");
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <div
      className="full-size"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom right, #273943, #526B79, #273943)",
      }}
    >
      <div
        style={{
          height: "80vh",
          maxHeight: "500px",
          width: "50%",
          minWidth: "350px",
        }}
        className="shadow-lg bg-white rounded p-5"
      >
        <div
          className="full-size"
          style={{
            flexDirection: "column",
          }}
        >
          <h1>Vacunación de Empleados</h1>
          <Divider flexItem style={{ margin: "15px 0px 30px 0px" }}></Divider>
          <div
            style={{
              flexDirection: "column",
              maxWidth: "500px",
              width: "75%",
            }}
          >
            <TextField
              label="Usuario"
              onKeyDown={(event) => {
                var key = event.keyCode || event.key;
                if (key === 13) {
                  event.preventDefault();
                  document.getElementById("pass").focus();
                }
              }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />

            <div
              style={{
                width: "100%",
                marginTop: "20px",
                position: "relative",
              }}
            >
              {capsLock && (
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{
                    color: COLORS.primary,
                    position: "absolute",
                    marginTop: "5px",
                    left: "-23px",
                    fontSize: "17px",
                    transform: "rotate(-90deg)",
                  }}
                />
              )}
              <TextField
                id="pass"
                label="Contraseña"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(event) => {
                  var key = event.keyCode || event.key;
                  if (key === 13) {
                    event.preventDefault();
                    document.getElementById("iniciar_sesion").click();
                  }
                  if (event.getModifierState("CapsLock") !== capsLock) {
                    setCapsLock(event.getModifierState("CapsLock"));
                  }
                }}
                onMouseDown={(event) => {
                  if (event.getModifierState("CapsLock") !== capsLock) {
                    setCapsLock(event.getModifierState("CapsLock"));
                  }
                }}
              />
            </div>
            <Button
              id="iniciar_sesion"
              style={{ marginTop: "25px" }}
              onClick={() => {
                const { data, token } = performLogin(userName, passWord) ?? {
                  data: undefined,
                  token: undefined,
                };
                if (data && token) {
                  localStorage.setItem("token", token);
                  localStorage.setItem("user", JSON.stringify(data));
                  navigate("/home");
                } else {
                  console.log("Error, usuario no existente!");
                }
              }}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
