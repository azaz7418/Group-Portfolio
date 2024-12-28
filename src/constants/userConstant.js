import axios from "axios";

export const userRole = {
  ADMIN: "admin",
  USER: "user",
};

export const deleteUser =  (id) => {
  return  axios.delete(`/teams/${id}`);
};