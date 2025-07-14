import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  console.log(isAdmin);

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
