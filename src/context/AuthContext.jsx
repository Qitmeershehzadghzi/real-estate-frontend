import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthCOntext = AuthContext;

const normalizeUser = (data) => data?.userWithoutPassword || data?.user || data;

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser ? normalizeUser(JSON.parse(storedUser)) : null;
    } catch (err) {
      return null;
    }
  });

  const updateUser = (data) => {
    setCurrentUser(normalizeUser(data));
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, currentuser: currentUser, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
