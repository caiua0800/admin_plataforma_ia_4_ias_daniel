// src/App.tsx
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Outlet, 
  Navigate 
} from "react-router-dom";
import styled from "styled-components";
import { AdminProvider } from "./contexts/AdminContext";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { LeadsInstagram } from "./pages/LeadsInstagram/LeadsInstagram";
import { LeadsWebsite } from "./pages/LeadsWebsite/LeadsWebsite";
import { ClientesPlataformaApp } from "./pages/ClientesPlataformaApp/ClientesPlataformaApp";
import { Usuarios } from "./pages/Usuarios/Usuarios";
import { Login } from "./pages/Login/Login";
import { Relatorios } from "./pages/Relatorios/Relatorios";

// 1. NÃO precisamos mais de 'useState' ou da lógica de 'authApi' aqui
import { useEffect } from "react"; 
import { io } from "socket.io-client";
import { useSocketStore } from "./stores/socketStore";

// --- Estilos dos Componentes (Sem alteração) ---
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  height: 100vh;
  box-sizing: border-box;
`;

// --- Lógica de Rota Protegida SIMPLIFICADA ---

/**
 * Este componente atua como um "Guarda".
 * Ele NÃO faz chamadas de API. Ele apenas verifica
 * se a "prova" da sessão (o refreshToken) existe.
 */
function AppLayout() {
  
  // 1. A verificação agora é síncrona e simples.
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    // 2. Se não há 'refreshToken', não há sessão. Redireciona para o login.
    console.log("AppLayout: Nenhum refreshToken. Redirecionando para /login");
    return <Navigate to="/login" replace />;
  }

  // 3. Se existe, renderiza o App.
  // O 'apiClient' (que é usado pelas páginas) vai se preocupar
  // em renovar o 'accessToken' quando ele expirar.
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Outlet /> {/* Renderiza a página (ex: Dashboard) */}
      </MainContent>
    </AppContainer>
  );
}
// --- Fim da Lógica de Rota Protegida ---


function App() {
  
  // --- Lógica do Socket.IO ---
  const setLatestEvent = useSocketStore((state) => state.setLatestEvent);
  
  // 4. Adicionamos uma verificação simples aqui
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    // Só conecta o socket se o usuário estiver logado
    if (refreshToken) {
      const socketUrl = "http://192.168.3.24:3000";
      console.log("App: Tentando conectar ao Socket.IO em", socketUrl);
      
      const socket = io(socketUrl, {
        reconnection: true,
        reconnectionDelay: 3000,
      });

      socket.on('connect', () => console.log("App: Socket.IO conectado!", "ID:", socket.id));
      socket.on('disconnect', () => console.log("App: Socket.IO desconectado. Tentando reconectar..."));
      socket.on('connect_error', (error) => console.error("App: Erro na conexão Socket.IO:", error.message));
      socket.on('new_message', (data) => {
        console.log("App: Socket.IO 'new_message' recebido:", data);
        if (data && (data.event === 'chat_updated' || data.event === 'new_message')) {
          setLatestEvent(data); 
        }
      });
      
      // Função de limpeza
      return () => {
        console.log("App: Desconectando Socket.IO...");
        socket.disconnect();
      };
    }
    // O 'refreshToken' garante que o socket tente reconectar se o usuário deslogar e logar de novo
  }, [setLatestEvent, refreshToken]); 
  // --- Fim da Lógica do Socket.IO ---

  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota PÚBLICA */}
          <Route path="/login" element={<Login />} />

          {/* Rotas PROTEGIDAS (envolvidas pelo AppLayout) */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads-instagram" element={<LeadsInstagram />} />
            <Route path="/leads-website" element={<LeadsWebsite />} />
            <Route path="/clientes" element={<ClientesPlataformaApp />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;