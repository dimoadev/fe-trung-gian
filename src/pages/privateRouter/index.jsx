import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // hoặc lấy từ Redux/AuthContext

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
