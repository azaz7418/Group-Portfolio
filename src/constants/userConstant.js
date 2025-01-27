import axios from "axios";
import { baseURL } from "../main";

export const userRole = {
  ADMIN: "admin",
  USER: "user",
};

export const deleteUser = (id) => {
  return axios.delete(`/teams/${id}`);
};
export const updateUser = async ({ id, body }) => {
  const { data } = await axios.put(`${baseURL}/teams/${id}`, body);
  return data;
};
export const createUser = async (body) => {
  const { data } = await axios.get(`${baseURL}/teams`, body);
  return data;
};

export const addWork = async (body) => {
  const { data } = await axios.post(`${baseURL}/works`, body);
  return data;
};
