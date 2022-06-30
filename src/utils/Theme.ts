import { createTheme, ThemeOptions } from "@mui/material";
import { COLORS } from "./Constants";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
    background: {
      default: "#fafaf5",
      paper: "#fff",
    },
    error: {
      main: COLORS.error,
    },
    divider: "rgba(43,21,28,0.5)",
    warning: {
      main: COLORS.warning,
    },
    info: {
      main: COLORS.info,
    },
    success: {
      main: COLORS.success,
    },
  },
  shape: {
    borderRadius: 15,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        required: true,
      },
    },
    MuiButton: {
      defaultProps: {
        color: "secondary",
        fullWidth: true,
        variant: "contained",
        disableElevation: true,
      },
    },
    MuiAvatar: {
      defaultProps: {
        style: { fontFamily: "Consolas", fontSize: "17px" },
      },
    },
  },
});
