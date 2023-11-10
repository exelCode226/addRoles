import axios from "./axios";

export const getEmpleadosRequest = async () => axios.get("/empleados");

export const createEmpleadoRequest = async (empleado) => axios.post("/empleados", empleado);

export const updateEmpleadoRequest = async (id,empleado) =>
  axios.put(`/empleados/${id}`, empleado);

export const deleteEmpleadoRequest = async (id) => axios.delete(`/empleados/${id}`);

export const getEmpleadoRequest = async (id) => axios.get(`/empleados/${id}`);
