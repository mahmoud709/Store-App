import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
   const { token } = useContext(AuthContext);
   if (!token) {
      return <Navigate to="/login" replace />;
   }
   return children;
}

export default PrivateRoute