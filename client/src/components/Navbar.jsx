import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="border-b border-text-secondary/10 bg-bg">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/browse" className="flex items-center gap-2">
            <span className="text-accent-green font-mono">&gt;_</span>
            <span className="text-text-primary font-heading font-bold">
              DevCollab
            </span>
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/browse" className="text-text-secondary hover:text-text-primary">
              Browse
            </Link>
            <Link to="/my-projects" className="text-text-secondary hover:text-text-primary">
              My projects
            </Link>
            <Link to="/applications" className="text-text-secondary hover:text-text-primary">
              Applications
            </Link>
            <Link to="/profile" className="text-text-secondary hover:text-text-primary">
              Profile
            </Link>
          </div>
        </div>

        {token ? (
          <button
            onClick={handleLogout}
            className="border border-text-secondary/30 rounded px-4 py-1.5 text-sm text-text-primary hover:bg-surface transition"
          >
            Sign out
          </button>
        ) : (
          <Link
            to="/login"
            className="border border-text-secondary/30 rounded px-4 py-1.5 text-sm text-text-primary hover:bg-surface transition"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;