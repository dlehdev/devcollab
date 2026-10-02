const express = require("express");
const {
  applyToProject,
  getApplicationsForProject,
  updateApplicationStatus,
  getMyApplications,
  withdrawApplication,
} = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:projectId/apply", protect, applyToProject);
router.get("/:projectId/applications", protect, getApplicationsForProject);
router.put("/status/:id", protect, updateApplicationStatus);
router.get("/my-applications", protect, getMyApplications);
router.delete("/:id", protect, withdrawApplication);

module.exports = router;