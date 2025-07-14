import { Routes, Route } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import PasswordPage from "./roles/user/PasswordPage";
import About from "./roles/user/About";
import Home from "./roles/user/Home";
import AdminDashboard from "./roles/admin/Admin";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/Admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />}></Route>
        <Route path="/password" element={<PasswordPage />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/About" element={<About />}></Route>
      </Routes>
    </div>
  );
}
