import React, { createContext, useContext, useState } from "react";

// Creating a context for managing user emails
const UserEmailContext = createContext();

// Custom hook for accessing the user email context
export const useUserEmailContext = () => useContext(UserEmailContext);

// Provider component for managing user emails
export const UserEmailProvider = ({ children }) => {
  // State for storing the current user email
  const [userEmail, setUserEmail] = useState("");

  // Providing the current user email and a function to set it as context value
  return (
    <UserEmailContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserEmailContext.Provider>
  );
};
