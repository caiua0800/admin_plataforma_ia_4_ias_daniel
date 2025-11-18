// src/contexts/AdminContext.tsx
import { 
  createContext, 
  useState, 
  useContext, 
  type ReactNode, // type
  useCallback
} from "react";
import type { User } from "../types"; // type
import { registerUser, type RegisterResult } from "../servers/authApi";
import apiFetch from "../servers/apiClient";
import { editUser, deleteUser, changeUserPassword } from "../servers/userApi";

export type NewAdminData = Omit<User, "id"> & { password: string };

interface AdminContextType {
  admins: User[];
  addAdmin: (admin: NewAdminData) => Promise<RegisterResult>;
  updateAdmin: (id: string, name: string, email: string) => Promise<RegisterResult>;
  removeAdmin: (id: string) => Promise<RegisterResult>;
  changePassword: (email: string, password: string, newPassword: string) => Promise<RegisterResult>;
  // --- NOVA FUNÇÃO EXPOSTA ---
  refreshAdmins: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admins, setAdmins] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Começa falso, a página vai disparar
  const [error, setError] = useState<string | null>(null);

  // --- Função de buscar usuários (agora exposta) ---
  const refreshAdmins = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response: any[] = await apiFetch('api/users');
      
      const loadedUsers: User[] = response.map((item: any) => ({
        id: item.json.id.toString(),
        name: item.json.name,
        email: item.json.email,
      }));
      
      setAdmins(loadedUsers);
    } catch (err: any) {
      console.error("Erro ao buscar usuários:", err);
      setError(err.message || "Não foi possível carregar os usuários.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // REMOVIDO: useEffect(() => { fetchAdmins() }, []) 
  // A chamada automática foi removida para evitar problemas de cache/montagem

  const addAdmin = async (adminData: NewAdminData): Promise<RegisterResult> => {
    try {
      const result = await registerUser(
        adminData.name,
        adminData.email,
        adminData.password
      );

      if (result.success) {
        // Recarrega a lista completa para garantir sincronia
        await refreshAdmins();
      }
      
      return result;
    } catch (error: any) {
      console.error("Erro em addAdmin:", error);
      return {
        success: false,
        message: error.message || "Erro de conexão ao tentar registrar.",
      };
    }
  };

  const updateAdmin = async (id: string, name: string, email: string): Promise<RegisterResult> => {
    const result = await editUser({ id, name, email });
    if (result.success) {
      await refreshAdmins(); // Recarrega lista
    }
    return result;
  };

  const removeAdmin = async (id: string): Promise<RegisterResult> => {
    const result = await deleteUser(id);
    if (result.success) {
      await refreshAdmins(); // Recarrega lista
    }
    return result;
  };

  const changePassword = async (email: string, password: string, newPassword: string): Promise<RegisterResult> => {
    return await changeUserPassword({ email, password, new_password: newPassword });
  };

  return (
    <AdminContext.Provider value={{ 
      admins, 
      addAdmin, 
      updateAdmin,
      removeAdmin,
      changePassword,
      refreshAdmins, // <-- Exportando a função
      isLoading, 
      error 
    }}>
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