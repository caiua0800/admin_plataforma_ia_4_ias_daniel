// src/contexts/AdminContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import { mockedUsers } from "../api/mockedData";
import { User } from "../types";

interface AdminContextType {
  admins: User[];
  addAdmin: (admin: Omit<User, "id">) => { success: boolean; message?: string };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admins, setAdmins] = useState<User[]>(mockedUsers);

  const addAdmin = (admin: Omit<User, "id">) => {
    if (admins.length >= 5) {
      return {
        success: false,
        message: "Limite de 5 administradores atingido.",
      };
    }
    const newAdmin = { ...admin, id: `user-${Date.now()}` };
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
    return { success: true };
  };

  return (
    <AdminContext.Provider value={{ admins, addAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
