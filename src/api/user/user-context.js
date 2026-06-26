"use client"

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const UserProviderContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const updateUser = (user) => {
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProviderContext };

export function useUser() {
  const { user, updateUser } = useContext(UserContext);

  return { user, updateUser };
}
