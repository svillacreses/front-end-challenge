import { Add, Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Toolbar,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Formulario } from "../components/Formulario";
import { TIPOS_DE_VACUNAS } from "../data/bd";
import { columns } from "../utils/Constants";
import { getAllUsers, getLocalUserData } from "../utils/LocalStorageGetters";

export const ListadoEmpleados = () => {
  const [rows, setRows] = useState([]);
  const [updateRows, setUpdateRows] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [actionType, setActionType] = useState("Actualizar");
  const [rowData, setRowData] = useState(undefined);
  const [filtroTipo, setFiltroTipo] = useState([
    ...TIPOS_DE_VACUNAS.map((v) => v.id),
    "N/A",
  ]);

  const handleFiltroTipoVacuna = (event) => {
    const {
      target: { value },
    } = event;
    setFiltroTipo(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const formatedUsers = getAllUsers().map((u, i) => {
      return { ...u, id: i + 1 }; //MUI Obliga a que cada row tenga una columna id
    });
    setRows(formatedUsers);
  }, [updateRows]);

  return (
    <>
      <div
        className="full-size centrar"
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Toolbar />
        <div className="centrar mb-3" style={{ width: "100%" }}>
          <h2>Empleados Registrados:</h2>
          <FormControl sx={{ width: 290, marginLeft: "auto" }} size="small">
            <InputLabel id="filtro-tipo-vacuna">Filtros Por Vacuna</InputLabel>
            <Select
              labelId="filtro-tipo-vacuna"
              multiple
              value={filtroTipo}
              onChange={handleFiltroTipoVacuna}
              input={<OutlinedInput label="Filtros Por Vacuna" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {[...TIPOS_DE_VACUNAS, { id: "N/A", nombre: "N/A" }].map((v) => (
                <MenuItem key={v.id} value={v.id}>
                  {v.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth={false}
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setRowData(undefined);
              setActionType("Registrar");
              setOpenModal(true);
            }}
          >
            Agregar Empleado <Add />
          </Button>
        </div>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            disableDensitySelector
            disableExtendRowFullWidth
            disableVirtualization
            hideFooterSelectedRowCount
            rows={rows.filter(
              (r) =>
                filtroTipo.includes(r.tipoVacuna) ||
                (filtroTipo.includes("N/A") &&
                  (r.tipoVacuna === "" || r?.tipoVacuna === undefined))
            )}
            columns={[
              ...columns,
              {
                field: "actions",
                type: "actions",
                headerName: "Acciones",
                minWidth: 120,
                getActions: (params) => [
                  <GridActionsCellItem
                    icon={<RemoveRedEyeIcon />}
                    onClick={() => {
                      setRowData(params.row);
                      setActionType("Visualizar");
                      setOpenModal(true);
                    }}
                    label="Visualizar Registro"
                  />,
                  <GridActionsCellItem
                    icon={<Edit />}
                    onClick={() => {
                      setRowData(params.row);
                      setActionType("Actualizar");
                      setOpenModal(true);
                    }}
                    label="Editar Registro"
                  />,
                  <GridActionsCellItem
                    //No puedes eliminarte tu mismo del sistema
                    disabled={getLocalUserData()?.cedula === params.row.cedula}
                    icon={<DeleteIcon />}
                    onClick={() => {
                      console.log("Borrar este registro:");
                      console.log(params.row);
                      localStorage.setItem(
                        "userList",
                        JSON.stringify(
                          getAllUsers().filter(
                            (u) => u.cedula !== params?.row?.cedula
                          )
                        )
                      );
                      setUpdateRows(!updateRows);
                    }}
                    label="Eliminar Registro"
                  />,
                ],
              },
            ].map((c) => {
              return {
                ...c,
                align: "center",
                headerAlign: "center",
                headerClassName: "table-header",
              };
            })}
          />
        </Box>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85%",
            maxWidth: 800,
            maxHeight: 600,
            bgcolor: "background.paper",
            boxShadow: 10,
            pt: 4,
            pb: 1,
            borderRadius: "15px",
          }}
        >
          <div style={{ margin: "0px 40px 0px 40px" }}>
            <h3>{actionType} Información</h3>
            <Divider />
          </div>
          <div
            className="centrar"
            style={{
              overflowY: "auto",
              height: "90%",
              maxHeight: "500px",
              width: "100%",
              padding: "10px 30px 0px 30px",
              alignItems: "flex-start",
            }}
          >
            <Formulario
              //El admin puede ingresar o actualizar sin necesidad de que los campos personales estén llenos
              validateAllFields={false}
              tipo={actionType}
              data={rowData}
              actionCallback={() => {
                setUpdateRows(!updateRows);
                setOpenModal(false);
              }}
              readOnlyForm={actionType.toUpperCase() === "VISUALIZAR"}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};
