// src/contexts/AdminContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import { mockedUsers } from "../api/mockedData";
import { User } from "../types";
import { registerUser, RegisterResult } from "../servers/authApi";

export type NewAdminData = Omit<User, "id"> & { password: string };

interface AdminContextType {
  admins: User[];
  addAdmin: (admin: NewAdminData) => Promise<RegisterResult>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admins, setAdmins] = useState<User[]>(mockedUsers);

  const addAdmin = async (adminData: NewAdminData): Promise<RegisterResult> => {
    try {
      // 1. Chama a API de registro
      const result = await registerUser(
        adminData.name,
        adminData.email,
        adminData.password
      );

      // 2. Se o registro na API funcionar...
      if (result.success) {
        
        // --- INÍCIO DA CORREÇÃO ---
        
        // Tenta pegar o ID da resposta da API.
        // Se a API não retornar um ID, gera um ID local temporário.
        const newUserId = (result.data && result.data.id) 
                            ? result.data.id.toString() 
                            : `local-user-${Date.now()}`;

        // CRIA O NOVO USUÁRIO USANDO OS DADOS DO FORMULÁRIO (adminData),
        // E NÃO OS DADOS DA RESPOSTA DA API (result.data).
        const newUser: User = {
          id: newUserId,
          name: adminData.name,   // <-- CORRIGIDO: Usa o 'name' do formulário
          email: adminData.email, // <-- CORRIGIDO: Usa o 'email' do formulário
        };
        // --- FIM DA CORREÇÃO ---
        
        // 3. Adiciona o usuário (agora completo) ao estado local
        setAdmins((prevAdmins) => [...prevAdmins, newUser]);
      }
      
      // 4. Retorna o resultado (sucesso ou falha) para o modal
      return result;

    } catch (error: any) {
      console.error("Erro em addAdmin:", error);
      return {
        success: false,
        message: error.message || "Erro de conexão ao tentar registrar.",
      };
    }
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