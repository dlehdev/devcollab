import api from "./axios";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getApplicationsForProject = (projectId) => {
  return api.get(`/applications/${projectId}/applications`, authHeader());
};

export const updateApplicationStatus = (applicationId, status) => {
  return api.put(`/applications/status/${applicationId}`, { status }, authHeader());
};
export const applyToProject = (projectId, message) => {
  return api.post(`/applications/${projectId}/apply`, { message }, authHeader());
};
export const getMyApplications = () => {
  return api.get("/applications/my-applications", authHeader());
};