const Application = require("../models/Application");
const Project = require("../models/Project");

const applyToProject = async (req, res) => {
  try {
    const { message } = req.body;
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() === req.userId) {
      return res.status(400).json({ message: "You cannot apply to your own project" });
    }

    const existingApplication = await Application.findOne({
      project: projectId,
      applicant: req.userId,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "You already applied to this project" });
    }

    const application = await Application.create({
      project: projectId,
      applicant: req.userId,
      message,
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Application failed", error: error.message });
  }
};

const getApplicationsForProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to view these applications" });
    }

    const applications = await Application.find({ project: req.params.projectId })
      .populate("applicant", "name email skills experienceLevel");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'accepted' or 'rejected'" });
    }

    const application = await Application.findById(req.params.id).populate("project");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.project.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: `Application ${status}`, application });
  } catch (error) {
    res.status(500).json({ message: "Failed to update application", error: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.userId })
      .populate("project", "title status");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};

module.exports = {
  applyToProject,
  getApplicationsForProject,
  updateApplicationStatus,
  getMyApplications,
};