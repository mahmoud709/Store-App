import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const PublicRoute = ({ children }) => {
   const { token } = useContext(AuthContext);
   if (token) {
      return <Navigate to="/profile" replace />;
   } return children;
}

export default PublicRoute;