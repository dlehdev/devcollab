import api from "./axios";

export const loginUser = (email, password) => {
  return api.post("/users/login", { email, password });
};

export const registerUser = (name, email, password) => {
  return api.post("/users/register", { name, email, password });
};

export const getProfile = () => {
  const token = localStorage.getItem("token");
  return api.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = (data) => {
  const token = localStorage.getItem("token");
  return api.put("/users/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};