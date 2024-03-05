import React, { createContext, useContext, useState } from "react";

const UserIdContext = createContext();

export const useUserIdContext = () => useContext(UserIdContext);

export const UserIdProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ currentUserId, setCurrentUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
