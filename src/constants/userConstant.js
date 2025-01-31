import axios from "axios";
import { baseURL } from "../main";

export const userRole = {
  ADMIN: "admin",
  USER: "user",
};


//-----User Api-----//
export const deleteUser = (id) => {
  return axios.delete(`/teams/${id}`);
};
export const updateUser = async ({ id, body }) => {
  
  const { data } = await axios.put(`${baseURL}/teams/${id}`, body);
  return data;
};
export const getAllUser = async () => {
  const { data } = await axios.get(`${baseURL}/teams`);
  return data;
};


// -----Project Api----//

export const addWork = async (body) => {
  const { data } = await axios.post(`${baseURL}/works`, body);
  return data;
};
export const getAllProjects = async () => {
  const { data } = await axios.get(`${baseURL}/works`);
  return data;
};
export const deleteProject = async (id) => {
  const { data } = await axios.delete(`${baseURL}/works/${id}`);
  return data;
};
export const updateProject = async ({id, body}) => {
  console.log({id,body});
  
  const { data } = await axios.put(`${baseURL}/works/${id}`,body);
  return data;
};
