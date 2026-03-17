import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);


const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const querClient = useQueryClient();
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });
  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const { data } = useQuery({
    queryKey: ['userprofile'],
    queryFn: () => axios.get(`${apiUrl}/users/profile`, { headers: { Authorization: authHeaders().Authorization } }),
    enabled: !!token,
  })
  function handleLogout() {
    querClient.removeQueries({ queryKey: ['usercart'] }); // ✅ clears immediately
    setToken(null);
    localStorage.removeItem("token");
    navigate('/');
  }
  function requireAuth() {
    if (!token) {
      navigate('/login');
      return false;
    }
    return true;
  }
  return (
    <AuthContext.Provider value={{ requireAuth, token, setToken, userData: data?.data, handleLogout }}>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthContextProvider;