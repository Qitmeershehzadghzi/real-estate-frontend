import { createContext, useEffect, useState } from "react";

export const AuthCOntext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentuser, setCurrentuser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      return null;
    }
  });

  const updateUser = (data) => {
    setCurrentuser(data);
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