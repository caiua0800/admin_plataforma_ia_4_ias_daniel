// src/contexts/AdminContext.tsx
import { 
  createContext, 
  useState, 
  useContext, 
  ReactNode, 
  useEffect // 1. Importar useEffect
} from "react";
// import { mockedUsers } from "../api/mockedData"; // 2. Remover dados mocados
import { User } from "../types";
import { registerUser, RegisterResult } from "../servers/authApi";
import apiFetch from "../servers/apiClient"; // 3. Importar o apiFetch

export type NewAdminData = Omit<User, "id"> & { password: string };

// 4. Atualizar a interface do Contexto
interface AdminContextType {
  admins: User[];
  addAdmin: (admin: NewAdminData) => Promise<RegisterResult>;
  isLoading: boolean;
  error: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // 5. Atualizar os estados
  const [admins, setAdmins] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 6. Adicionar o useEffect para buscar os usuários da API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Chamar a API de usuários usando o wrapper que já tem o token
        const response: any[] = await apiFetch('api/users');
        
        // Mapear a resposta da API para o formato User[]
        const loadedUsers: User[] = response.map((item: any) => ({
          id: item.json.id.toString(), // Converter ID para string
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
    };

    fetchAdmins();
  }, []); // O array vazio garante que isso rode apenas uma vez

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
    // 7. Expor os novos estados no Provider
    <AdminContext.Provider value={{ admins, addAdmin, isLoading, error }}>
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