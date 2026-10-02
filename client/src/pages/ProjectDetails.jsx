import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProjectById } from "../api/projects";
import { applyToProject } from "../api/applications";
import { jwtDecode } from "jwt-decode";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    getProjectById(id)
      .then((res) => setProject(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async () => {
    try {
      await applyToProject(id, message);
      setApplySuccess(true);
      setApplying(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <p className="text-text-secondary p-10 font-mono">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <p className="text-text-secondary p-10">Project not found.</p>
      </div>
    );
  }

  const isOwner = project.createdBy?._id === currentUserId;
  const isFull = project.acceptedCount >= project.teamSize;

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="px-6 py-12 max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-text-secondary text-sm mb-6 hover:text-text-primary"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-accent-green"></span>
          <span className="text-text-secondary text-xs font-mono uppercase">
            {project.status}
          </span>
        </div>

        <h1 className="font-heading text-4xl text-text-primary mb-4">
          {project.title}
        </h1>
        <p className="text-text-secondary mb-6">{project.description}</p>

        <div className="mb-6">
          <p className="text-xs text-text-secondary uppercase mb-2">
            Skills needed
          </p>
          <div className="flex flex-wrap gap-2">
            {project.requiredSkills?.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs bg-surface border border-text-secondary/20 rounded px-2 py-1 text-text-secondary"
              >
                # {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-text-secondary uppercase mb-2">
            Tech stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs bg-surface border border-accent-green/30 rounded px-2 py-1 text-accent-green"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 border-t border-text-secondary/10 pt-6">
          <p className="text-xs text-text-secondary uppercase mb-2">
            Project owner
          </p>
          <p className="text-text-primary">{project.createdBy?.name}</p>
          <p className="text-text-secondary text-sm">
            {project.createdBy?.email}
          </p>
          <p className="text-text-secondary text-sm mt-2 font-mono">
            {project.acceptedCount ?? 0}/{project.teamSize} spots filled
          </p>
        </div>

        {isOwner ? (
          <p className="text-text-secondary text-sm">This is your project.</p>
        ) : isFull ? (
          <p className="text-text-secondary text-sm">Team full.</p>
        ) : applySuccess ? (
          <p className="text-accent-green text-sm">✓ Application submitted</p>
        ) : applying ? (
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Why do you want to join this project?"
              rows={3}
              className="w-full bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary text-sm placeholder-text-secondary/50 focus:outline-none focus:border-accent-green"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleApply}
                className="bg-accent-green text-bg text-sm px-4 py-1.5 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setApplying(false)}
                className="border border-text-secondary/30 text-text-primary text-sm px-4 py-1.5 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setApplying(true)}
            className="bg-accent-green text-bg text-sm font-medium px-6 py-2 rounded hover:opacity-90 transition"
          >
            Apply to this project
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;