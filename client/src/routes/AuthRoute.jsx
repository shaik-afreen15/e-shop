import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AuthRoute;
