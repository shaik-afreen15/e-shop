import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const reduxUser = useSelector((state) => state.auth.user);

    // fallback to localStorage
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  const user = reduxUser || localUser;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role?.toUpperCase() !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
