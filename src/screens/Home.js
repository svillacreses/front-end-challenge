import React, { useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { COLORS } from "../utils/Constants";
import { getToken, getLocalUserData } from "../utils/LocalStorageGetters";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MisDatos } from "./MisDatos";
import { ListadoEmpleados } from "./ListadoEmpleados";

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pages, setPages] = React.useState([]);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    //Al cerrar sesión, limpiamos el token y los datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCambioDeRuta = (e) => {
    navigate("/home" + e.target.value);
  };

  useEffect(() => {
    if (getToken() === null) {
      //Si no hay token redirigimos a Inicio
      navigate("/");
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    let allowed_pages = [];
    //Todos tienen acceso a modificar y visualizar sus datos
    allowed_pages.push({ nombre: "Mis Datos", ruta: "/" });
    if (getLocalUserData()?.rol === "ADMIN") {
      //Solo los administradores tendrán acceso a este menú
      allowed_pages.push({
        nombre: "Listado de Empleados",
        ruta: "/empleados/",
      });
    }
    setPages(allowed_pages);
  }, []);

  return getToken() === null ? (
    "" //Para que no renderize nada cuando no haya iniciado sesión
  ) : (
    <>
      <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <AppBar>
          <Toolbar>
            {pages.map((page) => (
              <Button
                fullWidth={false}
                key={page.ruta}
                onClick={handleCambioDeRuta}
                style={{ marginRight: "10px" }}
                value={page.ruta}
              >
                {page.nombre}
              </Button>
            ))}
            <Box sx={{ marginLeft: "auto" }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: COLORS.gray }}>
                  {getLocalUserData()?.nombres[0]}
                  {getLocalUserData()?.apellidos[0]}
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" className="full-size centrar" sx={{ p: 3 }}>
          <Switch>
            {getLocalUserData()?.rol === "ADMIN" ? (
              <Route path="/empleados" element={<ListadoEmpleados />} />
            ) : (
              <></>
            )}
            <Route path="*" element={<MisDatos />} />
          </Switch>
        </Box>
      </Box>
    </>
  );
};
