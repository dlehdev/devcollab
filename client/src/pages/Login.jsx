import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/browse");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            ~/devcollab/auth
          </span>
        </div>

        <div className="p-8">
          <p className="text-accent-green font-mono text-xs mb-2">
            // WELCOME_BACK
          </p>
          <h1 className="font-heading text-3xl text-text-primary mb-2">
            Sign in to build
            <br />
            together.
          </h1>
          <p className="text-text-secondary text-sm mb-6">
            Your next side project is waiting.
          </p>

          <button
            type="button"
            onClick={() => alert("Google sign-in coming soon")}
            className="w-full border border-text-secondary/30 rounded py-2 text-text-primary text-sm mb-4 hover:bg-bg transition"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-text-secondary/20"></div>
            <span className="text-text-secondary text-xs">OR USE EMAIL</span>
            <div className="flex-1 h-px bg-text-secondary/20"></div>
          </div>

          {error && (
            <p className="text-accent-coral text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              Sign in →
            </button>
          </form>

          <p className="text-center text-text-secondary text-sm mt-4">
            New here?{" "}
            <Link to="/register" className="text-accent-green">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <Link
        to="/browse"
        className="text-text-secondary text-sm mt-6 hover:text-text-primary transition"
      >
        Browse projects without signing in
      </Link>
    </div>
  );
}

export default Login;