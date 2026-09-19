const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getRecommendedProjects,

} = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProject);
router.get("/recommended", protect, getRecommendedProjects);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;