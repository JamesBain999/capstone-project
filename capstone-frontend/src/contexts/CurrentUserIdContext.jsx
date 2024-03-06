import React, { createContext, useContext, useState } from "react";

// Creating a context for managing user IDs
const UserIdContext = createContext();

// Custom hook for accessing the user ID context
export const useUserIdContext = () => useContext(UserIdContext);

// Provider component for managing user IDs
export const UserIdProvider = ({ children }) => {
  // State for storing the current user ID
  const [currentUserId, setCurrentUserId] = useState(null);

  // Providing the current user ID and a function to set it as context value
  return (
    <UserIdContext.Provider value={{ currentUserId, setCurrentUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};
