import { TIPOS_DE_VACUNAS } from "../data/bd";

/**
 * Algoritmo básico para generar el usuario a partir del nombre y apellido
 * @param {Object} form Datos del usuario
 */
export const genUser = (form) => {
  return (form.nombres[0] + form.apellidos.split(" ")[0]).toLowerCase();
};

export const COLORS = {
  primary: "#273943",
  secondary: "#438AAF",
  error: "#F25A3D",
  warning: "#9B8C43",
  info: "#DDF1F0",
  success: "#468e48",
  gray: "#A0A0A0",
};

export const YEAR_IN_MS = 31556952000;

export const columns = [
  {
    field: "cedula",
    headerName: "Cédula",
    minWidth: 120,
    flex: 0.5,
  },
  {
    field: "nombres",
    headerName: "Nombres",
    minWidth: 150,
    flex: 0.75,
  },
  {
    field: "apellidos",
    headerName: "Apellidos",
    minWidth: 150,
    flex: 0.75,
  },
  {
    field: "usuario",
    headerName: "Usuario",
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    flex: 0.5,
  },
  {
    field: "password",
    headerName: "Contraseña",
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    flex: 0.5,
  },
  {
    field: "correo",
    headerName: "Correo",
    minWidth: 200,
    filterable: false,
    disableColumnMenu: true,
    hide: true,
    flex: 1,
  },
  {
    field: "fnac",
    headerName: "F. Nacimiento",
    type: "date",
    minWidth: 110,
    hide: true,
    flex: 1,
  },
  {
    field: "direccion",
    headerName: "Dirección",
    minWidth: 200,
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    hide: true,
    flex: 1,
  },
  {
    field: "telefono",
    headerName: "Teléfono",
    minWidth: 120,
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    hide: true,
    flex: 1,
  },
  {
    field: "estadoVacunacion",
    headerName: "Vacunado",
    type: "boolean",
    flex: 0.5,
  },
  {
    field: "tipoVacuna",
    headerName: "Tipo de Vacuna",
    minWidth: 120,
    flex: 0.8,
    renderCell: (params) => {
      const nombre_vacuna = TIPOS_DE_VACUNAS.filter(
        (v) => v.id === params.value
      );
      return params?.row?.estadoVacunacion === true
        ? nombre_vacuna[0].nombre
        : "N/A";
    },
  },
  {
    field: "fvacuna",
    headerName: "F. Vacunación",
    minWidth: 110,
    type: "date",
    flex: 0.7,
    renderCell: (params) => {
      return params?.row?.estadoVacunacion === true ? params.value : "N/A";
    },
  },
  {
    field: "dosis",
    headerName: "# Dosis",
    minWidth: 90,
    hide: true,
    flex: 0.5,
    renderCell: (params) => {
      return params?.row?.estadoVacunacion === true ? params.value : "N/A";
    },
  },
];
