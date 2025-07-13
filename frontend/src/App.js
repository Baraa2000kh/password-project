import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import PasswordPage from "./PasswordPage";
import About from "./About";
import Home from "./Home";
import AdminDashboard from "./Admin";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/Admin" element={<AdminDashboard />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/password" element={<PasswordPage />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/About" element={<About />}></Route>
      </Routes>
    </div>
  );
}
