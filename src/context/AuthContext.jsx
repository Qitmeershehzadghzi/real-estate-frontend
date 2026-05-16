import { createContext, useEffect, useState } from "react";

export const AuthCOntext = createContext();

const normalizeUser = (data) => data?.userWithoutPassword || data?.user || data;

export const AuthContextProvider = ({ children }) => {

  const [currentuser, setCurrentuser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser ? normalizeUser(JSON.parse(storedUser)) : null;
    } catch (err) {
      return null;
    }
  });

  const updateUser = (data) => {
    setCurrentuser(normalizeUser(data));
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentuser));
  }, [currentuser]);

  return (
    <AuthCOntext.Provider value={{ currentuser, updateUser }}>
      {children}
    </AuthCOntext.Provider>
  );
};
