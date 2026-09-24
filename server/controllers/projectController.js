const Application = require("../models/Application");
const Project = require("../models/Project");

const calculateMatchScore = (userSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return 0;

  const userSkillsLower = userSkills.map(s => s.toLowerCase());
  const matched = requiredSkills.filter(skill =>
    userSkillsLower.includes(skill.toLowerCase())
  );

  return Math.round((matched.length / requiredSkills.length) * 100);
};

const createProject = async (req, res) => {
  try {
    const { title, description, requiredSkills, techStack, status , teamSize} = req.body;

    const project = await Project.create({
      title,
      description,
      requiredSkills,
      techStack,
      status,
      teamSize,
      createdBy: req.userId,
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Project creation failed", error: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const { skill, status, search } = req.query;
    const filter = {};

    if (skill) {
      filter.requiredSkills = { $regex: skill, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

const projects = await Project.find(filter).populate("createdBy", "name email");

const projectsWithCounts = await Promise.all(
  projects.map(async (project) => {
    const acceptedCount = await Application.countDocuments({
      project: project._id,
      status: "accepted",
    });
    return { ...project.toObject(), acceptedCount };
  })
);

res.status(200).json(projectsWithCounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
};

const getRecommendedProjects = async (req, res) => {
  try {
    const User = require("../models/User");
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({ status: "open" }).populate("createdBy", "name email");

    const projectsWithScores = projects.map(project => {
      const score = calculateMatchScore(currentUser.skills, project.requiredSkills);
      return {
        ...project.toObject(),
        matchScore: score,
      };
    });

    projectsWithScores.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json(projectsWithScores);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recommendations", error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("createdBy", "name email");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project", error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to edit this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Project update failed", error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Project deletion failed", error: error.message });
  }
};

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject, getRecommendedProjects };