import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllProjects } from "../api/projects";
import { getApplicationsForProject, updateApplicationStatus } from "../api/applications";
import { jwtDecode } from "jwt-decode";

function MyProjects() {
  const [myProjects, setMyProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const currentUserId = token ? jwtDecode(token).userId : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await getAllProjects();
        const mine = projectsRes.data.filter(
          (p) => p.createdBy._id === currentUserId
        );
        setMyProjects(mine);

        let allApps = [];
        for (const project of mine) {
          const appsRes = await getApplicationsForProject(project._id);
          allApps = [...allApps, ...appsRes.data];
        }
        setApplications(allApps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) fetchData();
  }, [currentUserId]);

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor = {
    pending: "text-accent-amber border-accent-amber",
    accepted: "text-accent-green border-accent-green",
    rejected: "text-accent-coral border-accent-coral",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <p className="text-text-secondary p-10 font-mono">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="px-6 py-12 max-w-5xl mx-auto">
        <p className="text-accent-green font-mono text-xs mb-2">
          // MAINTAINER_CONSOLE
        </p>
        <h1 className="font-heading text-4xl text-text-primary mb-2">
          My projects.
        </h1>
        <p className="text-text-secondary mb-10">
          Review interest, make decisions, and keep your open builds moving.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-heading text-lg text-text-primary mb-4">
              Created by you
            </h2>
            {myProjects.length === 0 && (
              <p className="text-text-secondary text-sm">
                You haven't created any projects yet.
              </p>
            )}
            {myProjects.map((project) => (
              <div
                key={project._id}
                className="border-b border-text-secondary/10 pb-4 mb-4"
              >
                <span className="text-accent-green text-xs font-mono">
                  ● {project.status.toUpperCase()}
                </span>
                <h3 className="font-heading text-xl text-text-primary mt-1">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
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
            ))}
          </div>

          <div>
            <h2 className="font-heading text-lg text-text-primary mb-4">
              Applicant queue
            </h2>
            {applications.length === 0 && (
              <p className="text-text-secondary text-sm">
                No applications yet.
              </p>
            )}
            {applications.map((app) => (
              <div
                key={app._id}
                className="border-b border-text-secondary/10 pb-4 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-text-primary font-medium">
                      {app.applicant?.name}
                    </p>
                    <p className="text-text-secondary text-sm mt-1">
                      {app.message}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-mono border rounded px-2 py-1 ${statusColor[app.status]}`}
                  >
                    {app.status.toUpperCase()}
                  </span>
                </div>

                {app.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusUpdate(app._id, "accepted")}
                      className="bg-accent-green text-bg text-xs px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, "rejected")}
                      className="bg-accent-coral text-bg text-xs px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjects;