import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null)
  
  // register user
  const register = async (user) => {
    console.log({ userName, email, password });
  }

  // Login user
  const login = async({ email: identifier, password }) => {
    console.log(identifier, password);
  }

  // Logout user
  const logout = async () => {
    console.log('logout');
  }

  // Check if user is logged in
  const isAuthenticated = async (user) => {
    console.log('check');
  }

  return(
    <AuthContext.Provider value={{user, error, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;