import { applyToProject } from "../api/applications";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getRecommendedProjects, getAllProjects } from "../api/projects";

function Browse() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyingTo, setApplyingTo] = useState(null);
  const [message, setMessage] = useState("");
  const [applySuccess, setApplySuccess] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = token
          ? await getRecommendedProjects()
          : await getAllProjects();
        setProjects(response.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleApply = async (projectId) => {
  try {
    await applyToProject(projectId, message);
    setApplySuccess(projectId);
    setApplyingTo(null);
    setMessage("");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to apply");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-text-secondary font-mono">Loading projects...</p>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-bg">
    <Navbar />
    <div className="px-6 py-12 max-w-4xl mx-auto">  
    <p className="text-accent-green font-mono text-xs mb-2">
        // OPEN_PROJECTS
      </p>
      <h1 className="font-heading text-5xl text-text-primary mb-4">
        Find your next build.
      </h1>
      <p className="text-text-secondary mb-10">
        Side projects looking for thoughtful collaborators.
      </p>

      {error && <p className="text-accent-coral">{error}</p>}

      {projects.length === 0 && !error && (
        <p className="text-text-secondary">No projects found yet.</p>
      )}

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="border-b border-text-secondary/10 pb-6"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-green"></span>
                <span className="text-text-secondary text-xs font-mono uppercase">
                  {project.status}
                </span>
              </div>

              {project.matchScore !== undefined && (
                <div className="text-right">
                  <p className="text-text-secondary text-xs font-mono">
                    skill_match
                  </p>
                  <p className="text-accent-green font-heading text-lg">
                    {project.matchScore}%
                  </p>
                </div>
              )}
            </div>

            <h2 className="font-heading text-2xl text-text-primary mb-2">
              {project.title}
            </h2>
            <p className="text-text-secondary mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {project.requiredSkills?.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs bg-surface border border-text-secondary/20 rounded px-2 py-1 text-text-secondary"
                >
                  # {skill}
                </span>
              ))}
            </div>

            <p className="text-text-secondary text-sm">
              by {project.createdBy?.name || "Unknown"}
            </p>
            {applySuccess === project._id ? (
  <p className="text-accent-green text-sm mt-3">
    ✓ Application submitted
  </p>
) : applyingTo === project._id ? (
  <div className="mt-4">
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Why do you want to join this project?"
      className="w-full bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary text-sm placeholder-text-secondary/50 focus:outline-none focus:border-accent-green"
      rows={3}
    />
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => handleApply(project._id)}
        className="bg-accent-green text-bg text-sm px-4 py-1.5 rounded"
      >
        Submit
      </button>
      <button
        onClick={() => setApplyingTo(null)}
        className="border border-text-secondary/30 text-text-primary text-sm px-4 py-1.5 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <button
    onClick={() => setApplyingTo(project._id)}
    className="mt-3 text-accent-green text-sm hover:underline"
  >
    Apply to this project →
  </button>
)}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Browse;