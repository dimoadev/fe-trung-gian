import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // hoặc lấy từ Redux/AuthContext
  const u = localStorage.getItem("axu");
  const user = JSON.parse(u || "{}");


  if (!token || user?.id !== 1 || user?.email !== "hoanghoai12sh@gmail.com") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default AdminRoute;
