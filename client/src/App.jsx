import ProjectDetails from "./pages/ProjectDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProject from "./pages/CreateProject";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import MyProjects from "./pages/MyProjects";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<h1 className="text-white p-10">Home Page</h1>} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/browse" element={<Browse />} />

  <Route
    path="/my-projects"
    element={
      <ProtectedRoute>
        <MyProjects />
      </ProtectedRoute>
    }
  />
  <Route
    path="/applications"
    element={
      <ProtectedRoute>
        <Applications />
      </ProtectedRoute>
    }
  />
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/create-project"
    element={
      <ProtectedRoute>
        <CreateProject />
      </ProtectedRoute>
    }
  />
  <Route
  path="/create-project"
  element={
    <ProtectedRoute>
      <CreateProject />
    </ProtectedRoute>
  }
/>
   <Route
  path="/edit-project/:id"
  element={
    <ProtectedRoute>
      <CreateProject />
    </ProtectedRoute>
  }
/>
<Route
 path="/project/:id" 
 element={<ProjectDetails />
 } 
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;