import {
  Alert,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Portal,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useEffect } from "react";
import { YEAR_IN_MS, COLORS, genUser } from "../utils/Constants";
import { TIPOS_DE_VACUNAS } from "../data/bd";
import { getAllUsers, getLocalUserData } from "../utils/LocalStorageGetters";

export const Formulario = ({
  data = {
    cedula: "",
    nombres: "",
    apellidos: "",
    correo: "",
    fnac: "",
    direccion: "",
    telefono: "",
    estadoVacunacion: false,
    tipoVacuna: "",
    fvacuna: "",
    dosis: 0,
  },
  tipo = "Actualizar",
  validateAllFields = true,
  readOnlyForm = false,
  actionCallback = () => {},
}) => {
  const [formData, setFormData] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successText, setSuccessText] = useState("Éxito!");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      ...data,
      fnac: data?.fnac ?? "",
      direccion: data?.direccion ?? "",
      telefono: data?.telefono ?? "",
      estadoVacunacion: data?.estadoVacunacion ?? false,
      tipoVacuna: data?.tipoVacuna ?? "",
      fvacuna: data?.fvacuna ?? "",
      dosis: data?.dosis ?? 0,
    });
  }, []);

  const isValidField = (field) => {
    const notEmpty = /\S+/; //También valida cuando hay solo espacios
    const onlyLetters = /^[A-zÀ-ú\s]+$/;
    const onlyNumbers = /^\d+$/;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (field === "cedula" || (field === "telefono" && validateAllFields)) {
      let validacion =
        formData[field]?.length === 10 && onlyNumbers.test(formData[field]);
      if (field === "cedula" && tipo.toUpperCase() === "REGISTRAR") {
        //Si registramos un nuevo empleado validamos que no exista otro con la misma cédula
        const cedulas_iguales = getAllUsers().filter(
          (u) => u.cedula === formData[field]
        );
        return validacion && cedulas_iguales.length === 0;
      } else {
        return validacion;
      }
    } else if (field === "nombres" || field === "apellidos") {
      return (
        notEmpty.test(formData[field]) && onlyLetters.test(formData[field])
      );
    } else if (field === "correo") {
      return validEmail.test(formData[field]);
    } else if (
      validateAllFields &&
      (field === "fnac" ||
        (field === "fvacuna" && formData.estadoVacunacion) ||
        (field === "tipoVacuna" && formData.estadoVacunacion) ||
        field === "direccion")
    ) {
      return notEmpty.test(formData[field]);
    } else if (
      validateAllFields &&
      field === "dosis" &&
      formData.estadoVacunacion
    ) {
      return (
        onlyNumbers.test(formData[field]) &&
        parseInt(formData[field]) >= 1 &&
        parseInt(formData[field]) <= 10 //Límite exagerado de dosis
      );
    }
    return true;
  };

  const isValidForm = () => {
    const fields = Object.keys(formData);
    const validatedFields = fields.map((field) => {
      return isValidField(field);
    });
    //Validamos si todos los campos son válidos
    return validatedFields.length > 0
      ? validatedFields.reduce((prev, curr) => prev && curr)
      : false;
  };

  return (
    <div
      className="container"
      style={{
        flexDirection: "column",
        width: "100%",
        paddingBottom: "30px",
      }}
    >
      <div className="row justify-content-md-center">
        <div className="col col-12 col-lg-6">
          <TextField
            disabled={tipo.toUpperCase() === "ACTUALIZAR"}
            error={!isValidField("cedula")}
            inputProps={{
              maxLength: 10,
              readOnly: readOnlyForm,
            }}
            helperText={
              isValidField("cedula")
                ? ""
                : `Solo se aceptan números | Recuerda que la cédula es única por empleado`
            }
            label="Cédula"
            style={{ marginTop: "15px" }}
            defaultValue={data.cedula}
            onChange={(e) => {
              setFormData({ ...formData, cedula: e.target.value });
            }}
          />
          <TextField
            error={!isValidField("nombres")}
            helperText={isValidField("nombres") ? "" : `Solo se aceptan letras`}
            label="Nombres"
            style={{ marginTop: "15px" }}
            inputProps={{ readOnly: readOnlyForm }}
            defaultValue={data.nombres}
            onChange={(e) => {
              setFormData({ ...formData, nombres: e.target.value });
            }}
          />
          <TextField
            error={!isValidField("apellidos")}
            helperText={
              isValidField("apellidos") ? "" : `Solo se aceptan letras`
            }
            label="Apellidos"
            style={{ marginTop: "15px" }}
            inputProps={{ readOnly: readOnlyForm }}
            defaultValue={data.apellidos}
            onChange={(e) => {
              setFormData({ ...formData, apellidos: e.target.value });
            }}
          />
          <TextField
            error={!isValidField("correo")}
            helperText={
              isValidField("correo") ? "" : `Correo electrónico no válido`
            }
            label="Correo Electrónico"
            type="email"
            style={{ marginTop: "15px" }}
            inputProps={{ readOnly: readOnlyForm }}
            defaultValue={data.correo}
            onChange={(e) => {
              setFormData({ ...formData, correo: e.target.value });
            }}
          />
          <TextField
            error={!isValidField("fnac")}
            label="Fecha de Nacimiento"
            helperText={
              isValidField("fnac") && formData?.fnac?.length === 10
                ? `${parseInt(
                    (new Date().getTime() - new Date(formData.fnac).getTime()) /
                      YEAR_IN_MS
                  )} años de edad`
                : ""
            }
            InputLabelProps={{ shrink: true }}
            inputProps={{
              readOnly: readOnlyForm,
              min: "1900-01-01", //Fecha mínima de nacimiento exagerada
              max: new Date(
                new Date().getTime() -
                  YEAR_IN_MS *
                    18 /*Si es empleado debería tener mínimo 18 años*/
              )
                .toISOString()
                .split("T")[0],
            }}
            type="date"
            style={{ marginTop: "15px" }}
            defaultValue={data.fnac}
            onChange={(e) => {
              setFormData({ ...formData, fnac: e.target.value });
            }}
          />
        </div>
        <div className="col col-sm-12 col-lg-6">
          <TextField
            error={!isValidField("direccion")}
            label="Dirección de Domicilio"
            inputProps={{ readOnly: readOnlyForm }}
            style={{ marginTop: "15px" }}
            defaultValue={data.direccion}
            onChange={(e) => {
              setFormData({ ...formData, direccion: e.target.value });
            }}
          />
          {/* Forzamos el campo a tener las mismas validaciones de cédula por falta de tiempo */}
          <TextField
            error={!isValidField("telefono")}
            label="Teléfono Móvil (+593)"
            inputProps={{ maxLength: 10, readOnly: readOnlyForm }}
            helperText={
              isValidField("telefono")
                ? ""
                : `Solo se aceptan números | Longitud: ${formData.telefono?.length}/10`
            }
            style={{ marginTop: "15px" }}
            defaultValue={data.telefono}
            onChange={(e) => {
              setFormData({ ...formData, telefono: e.target.value });
            }}
          />
          <FormControlLabel
            style={{ height: "85px" }}
            control={
              <Checkbox
                disabled={readOnlyForm}
                defaultChecked={data.estadoVacunacion}
                onChange={(e) => {
                  let tempFormData = { ...formData };
                  if (!e.target.checked) {
                    //Si no se ha vacunado limpiamos los inputs
                    tempFormData.tipoVacuna = "";
                    tempFormData.fvacuna = "";
                    tempFormData.dosis = 0;
                  } else {
                    tempFormData.dosis = 1;
                  }
                  setFormData({
                    ...tempFormData,
                    estadoVacunacion: e.target.checked,
                  });
                }}
              />
            }
            label="¿Ha sido vacunado?"
            labelPlacement="start"
          />
          <Fade in={formData.estadoVacunacion} unmountOnExit>
            <div style={{ flexDirection: "column" }}>
              <FormControl fullWidth error={!isValidField("tipoVacuna")}>
                <InputLabel id="select-tipo-vacuna">Tipo de Vacuna</InputLabel>
                <Select
                  inputProps={{ readOnly: readOnlyForm }}
                  labelId="select-tipo-vacuna"
                  fullWidth
                  value={formData.tipoVacuna ?? "SP"}
                  label="Tipo de Vacuna"
                  onChange={(e) =>
                    setFormData({ ...formData, tipoVacuna: e.target.value })
                  }
                >
                  {TIPOS_DE_VACUNAS.map((v) => (
                    <MenuItem key={v.id} value={v.id}>
                      {v.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="row">
                <div className="col col-lg-6">
                  <TextField
                    error={!isValidField("fvacuna")}
                    label="Fecha de Vacunación"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      readOnly: readOnlyForm,
                      min: "2019-01-01", //Fecha mínima de vacunación
                      max: new Date().toISOString().split("T")[0],
                    }}
                    type="date"
                    style={{ marginTop: "15px" }}
                    defaultValue={formData.fvacuna}
                    onChange={(e) =>
                      setFormData({ ...formData, fvacuna: e.target.value })
                    }
                  />
                </div>
                <div className="col col-lg-6">
                  <TextField
                    error={!isValidField("dosis")}
                    label="Dosis Aplicadas"
                    helperText={
                      isValidField("dosis")
                        ? ""
                        : "Solo se aceptan valores numéricos [1 - 10]"
                    }
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      readOnly: readOnlyForm,
                      min: 1,
                      max: 10, //Límite exagerado de dosis
                    }}
                    type="number"
                    style={{ marginTop: "15px" }}
                    defaultValue={formData.dosis}
                    onClick={(e) => e.target.select?.()}
                    onChange={(e) => {
                      setFormData({ ...formData, dosis: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
      {readOnlyForm ? (
        ""
      ) : (
        <LoadingButton
          fullWidth={false}
          variant="contained"
          loading={isLoading}
          disabled={!isValidForm()}
          style={{ marginTop: "25px", width: "200px" }}
          onClick={() => {
            setIsLoading(true);
            console.log(formData);
            switch (tipo.toUpperCase()) {
              case "ACTUALIZAR":
                //Actualizamos los datos del usuario si es que está actualizando sus propios datos
                if (formData?.cedula === getLocalUserData()?.cedula) {
                  localStorage.setItem(
                    "user",
                    JSON.stringify({ ...data, ...formData })
                  );
                }
                //Actualizamos el listado de usuarios
                localStorage.setItem(
                  "userList",
                  JSON.stringify([
                    ...getAllUsers().filter(
                      (u) => u.cedula !== formData.cedula
                    ),
                    formData,
                  ])
                );
                setSuccessText("Todos los datos han sido actualizados!");
                //Simulamos una pequeña carga
                setTimeout(() => {
                  setIsLoading(false);
                  setOpenSuccess(true);
                  actionCallback();
                }, 1000);
                break;
              case "REGISTRAR":
                localStorage.setItem(
                  "userList",
                  JSON.stringify([
                    ...getAllUsers(),
                    {
                      ...formData,
                      usuario: genUser(formData),
                      password: formData.cedula, //La Cédula es la contraseña por defecto
                      rol: "EMPLEADO", //Rol por defecto
                    },
                  ])
                );
                //Simulamos una pequeña carga
                setTimeout(() => {
                  setIsLoading(false);
                  setOpenSuccess(true);
                  actionCallback();
                }, 250);
                break;
            }
          }}
        >
          {tipo}
        </LoadingButton>
      )}
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
            {successText}
          </Alert>
        </Snackbar>
      </Portal>
    </div>
  );
};
