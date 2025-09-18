import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
