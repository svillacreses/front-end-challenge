import { Alert, Divider, Portal, Snackbar, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../utils/Constants";
import { getAllUsers, getToken } from "../utils/LocalStorageGetters";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [capsLock, setCapsLock] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const isValidForm = () => {
    return loginData.userName !== "" && loginData.passWord !== "";
  };

  return (
    <div
      className="full-size centrar"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom right, #273943, #526B79, #273943)",
      }}
    >
      <div
        style={{
          height: "80vh",
          maxHeight: "450px",
          width: "40%",
          minWidth: "600px",
          borderRadius: "40px",
        }}
        className="shadow-lg bg-white p-3 centrar"
      >
        <div
          className="full-size centrar"
          style={{
            flexDirection: "column",
          }}
        >
          <Divider flexItem style={{ margin: "0px 0px 15px 0px" }}></Divider>
          <h1>Control de Vacunación</h1>
          <Divider flexItem style={{ margin: "15px 0px 30px 0px" }}></Divider>
          <div
            style={{
              flexDirection: "column",
              maxWidth: "500px",
              width: "75%",
            }}
          >
            <form>
              <TextField
                error={loginData.userName === ""}
                label="Usuario"
                onKeyDown={(event) => {
                  var key = event.keyCode || event.key;
                  if (key === 13) {
                    event.preventDefault();
                    document.getElementById("pass").focus();
                  }
                }}
                onChange={(e) => {
                  setLoginData({ ...loginData, userName: e.target.value });
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
                      marginTop: "20px",
                      left: "-23px",
                      fontSize: "17px",
                      transform: "rotate(-90deg)",
                    }}
                  />
                )}
                <TextField
                  id="pass"
                  error={loginData.passWord === ""}
                  label="Contraseña"
                  type="password"
                  onChange={(e) => {
                    setLoginData({ ...loginData, passWord: e.target.value });
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
              <LoadingButton
                fullWidth
                variant="contained"
                loading={isLoading}
                id="iniciar_sesion"
                disabled={!isValidForm()}
                style={{ marginTop: "25px" }}
                onClick={() => {
                  setIsLoading(true);
                  //Simulamos una pequeña carga
                  setTimeout(() => {
                    const { data, token } = performLogin(
                      loginData.userName,
                      loginData.passWord
                    ) ?? {
                      data: undefined,
                      token: undefined,
                    };
                    if (data && token) {
                      localStorage.setItem("token", token);
                      localStorage.setItem("user", JSON.stringify(data));
                      navigate("/home");
                    } else {
                      setOpenFailure(true);
                      setIsLoading(false);
                    }
                  }, 1000);
                }}
              >
                Iniciar Sesión
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
      <Portal>
        <Snackbar
          open={openSuccess}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setOpenSuccess(false)}
        >
          <Alert
            color="secondary"
            style={{ background: COLORS.primary, color: "white" }}
            onClose={() => setOpenSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Inicio Exitoso!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openFailure}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={() => setOpenFailure(false)}
        >
          <Alert
            color="info"
            style={{ background: COLORS.error, color: "white" }}
            onClose={() => setOpenFailure(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Usuario / Contraseña Incorrectos!
          </Alert>
        </Snackbar>
      </Portal>
    </div>
  );
};
