import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TagInput from "../components/TagInput";
import { createProject } from "../api/projects";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [teamSize, setTeamSize] = useState(3);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await createProject({
        title,
        description,
        requiredSkills,
        techStack,
        teamSize: Number(teamSize),
        status: "open",
      });
      navigate("/my-projects");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="px-6 py-12 max-w-2xl mx-auto">
        <p className="text-accent-green font-mono text-xs mb-2">// NEW_PROJECT</p>
        <h1 className="font-heading text-4xl text-text-primary mb-2">
          Start a build.
        </h1>
        <p className="text-text-secondary mb-10">
          Describe what you're making and who you need on the team.
        </p>

        {error && <p className="text-accent-coral text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs text-text-secondary uppercase">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-green"
              required
            />
          </div>

          <div>
            <label className="text-xs text-text-secondary uppercase">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-green"
              required
            />
          </div>

          <TagInput
            label="Skills you need"
            tags={requiredSkills}
            setTags={setRequiredSkills}
            placeholder="Add a skill and press Enter"
          />

          <TagInput
            label="Tech stack"
            tags={techStack}
            setTags={setTechStack}
            placeholder="Add a technology and press Enter"
          />

          <div>
            <label className="text-xs text-text-secondary uppercase">
              Collaborators needed
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full mt-1 bg-surface border border-text-secondary/30 rounded px-3 py-2 text-text-primary focus:outline-none focus:border-accent-green"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-accent-green text-bg font-medium px-6 py-2 rounded hover:opacity-90 transition"
          >
            {submitting ? "Creating..." : "Create project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;