import axios from "./axios";


export const getProgramacionesRequest = async () => axios.get("/programaciones");
export const createProgramacionRequest = async (programacion) => axios.post("/programaciones", programacion);
export const updateProgramacionRequest = async (id, programacion) => axios.put(`/programaciones/${id}`, programacion);
export const deleteProgramacionRequest = async (id) => axios.delete(`/programaciones/${id}`);
export const getProgramacionIdRequest = async (id) => axios.get(`/programaciones/${id}`);
