"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  username: string;
  setUsername: (newUsername: string) => void;
}

const GuestUserContext = createContext<UserContextProps | undefined>(undefined);

export const GuestUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  return (
    <GuestUserContext.Provider value={{ username, setUsername }}>
      {children}
    </GuestUserContext.Provider>
  );
};

export function useGuestUser(): UserContextProps {
  const context = useContext(GuestUserContext);
  if (!context) {
    throw new Error("useGuestUser must be used within a GuestUserProvider");
  }
  return context;
}

export default { useGuestUser, GuestUserProvider };