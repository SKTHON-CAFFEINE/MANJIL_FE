import { Navigate, Outlet, useOutletContext } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("accessToken");
  const context = useOutletContext();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={context} />;
}
