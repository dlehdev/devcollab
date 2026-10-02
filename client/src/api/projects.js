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

export const createProject = (data) => {
  const token = localStorage.getItem("token");
  return api.post("/projects", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProject = (id, data) => {
  const token = localStorage.getItem("token");
  return api.put(`/projects/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteProject = (id) => {
  const token = localStorage.getItem("token");
  return api.delete(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getProjectById = (id) => {
  return api.get(`/projects/${id}`);
};