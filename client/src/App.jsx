import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/student/Dashboard";
import CreateComplaint from "./pages/student/CreateComplaint";
import ComplaintDetails from "./pages/student/ComplaintDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaints/new" element={<CreateComplaint />} />
        <Route path="/complaints/:id" element={<ComplaintDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


