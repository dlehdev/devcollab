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
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;