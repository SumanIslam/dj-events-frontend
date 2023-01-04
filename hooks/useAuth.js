import { useContext } from "react";
// auth context
import { AuthContext } from '@/context/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
}