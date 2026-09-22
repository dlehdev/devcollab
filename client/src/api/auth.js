import api from "./axios";

export const loginUser = (email, password) => {
  return api.post("/users/login", { email, password });
};

export const registerUser = (name, email, password) => {
  return api.post("/users/register", { name, email, password });
};