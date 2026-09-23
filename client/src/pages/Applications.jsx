import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyApplications } from "../api/applications";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications();
        setApplications(response.data);
      } catch (err) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

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
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <p className="text-accent-green font-mono text-xs mb-2">
          // APPLICATION_LOG
        </p>
        <h1 className="font-heading text-4xl text-text-primary mb-2">
          Your applications.
        </h1>
        <p className="text-text-secondary mb-10">
          Track every collaboration request from first message to final
          decision.
        </p>

        {error && <p className="text-accent-coral">{error}</p>}

        {applications.length === 0 && !error && (
          <p className="text-text-secondary">
            You haven't applied to any projects yet.
          </p>
        )}

        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="border-b border-text-secondary/10 pb-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-heading text-lg text-text-primary">
                  {app.project?.title || "Unknown project"}
                </h3>
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Applications;