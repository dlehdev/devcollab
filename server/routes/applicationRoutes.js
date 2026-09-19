const express = require("express");
const {
  applyToProject,
  getApplicationsForProject,
  updateApplicationStatus,
  getMyApplications,
} = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:projectId/apply", protect, applyToProject);
router.get("/:projectId/applications", protect, getApplicationsForProject);
router.put("/status/:id", protect, updateApplicationStatus);
router.get("/my-applications", protect, getMyApplications);

module.exports = router;