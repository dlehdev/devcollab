import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(name, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(139,147,161,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,147,161,0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="mb-8 flex items-center gap-2">
        <span className="text-accent-green font-mono text-xl">&gt;_</span>
        <span className="text-text-primary font-heading text-xl font-bold">
          DevCollab
        </span>
      </div>

      <div className="w-full max-w-md bg-surface rounded-lg border border-text-secondary/10 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-text-secondary/10">
          <span className="w-3 h-3 rounded-full bg-accent-coral"></span>
          <span className="w-3 h-3 rounded-full bg-accent-amber"></span>
          <span className="w-3 h-3 rounded-full bg-accent-green"></span>
          <span className="ml-2 text-text-secondary text-xs font-mono">
            ~/devcollab/register
          </span>
        </div>

        <div className="p-8">
          <p className="text-accent-green font-mono text-xs mb-2">
            // JOIN_DEVCOLLAB
          </p>
          <h1 className="font-heading text-3xl text-text-primary mb-2">
            Create your
            <br />
            account.
          </h1>
          <p className="text-text-secondary text-sm mb-6">
            Start building with other developers.
          </p>

          {error && (
            <p className="text-accent-coral text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-text-secondary uppercase">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 bg-bg border border-text-secondary/30 rounded px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-green"
                required
              />
            </div>

            <div>
              <label className="text-xs text-text-secondary uppercase">
                Email
              </label>
              <input
                type="email"
                placeholder="dev@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 bg-bg border border-text-secondary/30 rounded px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-green"
                required
              />
            </div>

            <div>
              <label className="text-xs text-text-secondary uppercase">
                Password
              </label>
              <input
                type="password"
                placeholder="8+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 bg-bg border border-text-secondary/30 rounded px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-green"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent-green text-bg font-medium py-2 rounded hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Create account →
            </button>
          </form>

          <p className="text-center text-text-secondary text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-accent-green">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;