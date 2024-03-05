import React, { createContext, useContext, useState } from "react";

const UserEmailContext = createContext();

export const useUserEmailContext = () => useContext(UserEmailContext);

export const UserEmailProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <UserEmailContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserEmailContext.Provider>
  );
};
