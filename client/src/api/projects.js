import api from "./axios";

export const getRecommendedProjects = () => {
  const token = localStorage.getItem("token");
  return api.get("/projects/recommended", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllProjects = () => {
  return api.get("/projects");
};

export const getMyProjects = () => {
  const token = localStorage.getItem("token");
  return api.get("/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });
};