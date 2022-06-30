//Definición de Getters para parsear a objetos los datos del Local Storage
export const getToken = () => {
  return localStorage.getItem("token");
};
export const getLocalUserData = () => {
  return localStorage.getItem("user") === null
    ? undefined
    : JSON.parse(localStorage.getItem("user"));
};
export const getAllUsers = () => {
  return localStorage.getItem("userList") === null
    ? []
    : JSON.parse(localStorage.getItem("userList"));
};
