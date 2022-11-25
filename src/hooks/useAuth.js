import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  /* 
  This function handle log in and log out while providing (AuthContext.provider) 
  access to the user info and log-in/log-out functions trough value prop.

  Log in: send the data(user name and password) to the server for 
  authentication, if is succesfull the custom hook useLocalStorage to save 
  the response in the local storage under the key-name "user" and re-direct
  the user to the protected route.

  Log out: sets the value store in local storage to null and re-direct the
  user to the home page for Login.


  */

  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    const loginResp = await loginService.login(data);
    setUser(loginResp);
    navigate("/user/boards", { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
