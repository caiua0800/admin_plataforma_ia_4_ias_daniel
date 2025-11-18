// src/App.tsx
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Outlet, 
  Navigate,
  useLocation
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

import { useEffect, useState } from "react"; 
import { io } from "socket.io-client";
import { useSocketStore } from "./stores/socketStore";
import { logout } from "./servers/authApi";

import { NotificationHost } from "./components/Notification/NotificationHost";
import { useNotificationStore } from "./stores/useNotificationStore";
import { useChatActivityStore } from "./stores/useChatActivityStore";


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

// --- Lógica de Rota Protegida ---

function AppLayout() {
  
  const [token, setToken] = useState(() => localStorage.getItem("refreshToken"));
  
  const { addNotification } = useNotificationStore();
  const { activeChatId } = useChatActivityStore();
  const latestEvent = useSocketStore((state) => state.latestEvent);
  const setLatestEvent = useSocketStore((state) => state.setLatestEvent);
  const location = useLocation();

  useEffect(() => {
    const handleAuthChange = () => {
      console.log("AppLayout: Evento 'auth-change' recebido. Atualizando estado.");
      setToken(localStorage.getItem("refreshToken"));
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []); 

  // --- LÓGICA DO SOCKET.IO (conexão) ---
  useEffect(() => {
    if (token) {
      const socketUrl = "https://iadanielwebso.demelloagent.app";
      console.log("AppLayout: Token existe. Tentando conectar ao Socket.IO em", socketUrl);
      
      const socket = io(socketUrl, {
        reconnection: true,
        reconnectionDelay: 3000,
        timeout: 10000, 
      });

      socket.on('connect', () => console.log("AppLayout: Socket.IO conectado!", "ID:", socket.id));
      socket.on('disconnect', () => console.log("AppLayout: Socket.IO desconectado."));
      socket.on('connect_error', (error) => {
        console.warn("AppLayout: Erro na conexão Socket.IO:", error.message);
      });
      
      const handleSocketEvent = (data: any) => {
        console.log(`[Socket.IO] Evento '${data.event || 'desconhecido'}' recebido:`, data);
        if (data && (data.event === 'chat_updated' || data.event === 'new_message')) {
          setLatestEvent(data); 
        } else {
          console.warn("[Socket.IO] Evento recebido, mas não corresponde ao formato esperado:", data);
        }
      };

      socket.on('new_message', handleSocketEvent);
      socket.on('chat_updated', handleSocketEvent);

      const catchAllListener = (eventName: string, ...args: any[]) => {
        console.log(
          `%c[Socket.IO - ESPIÃO] Evento recebido! Nome: "${eventName}"`, 
          'color: #00ff00; font-weight: bold;', 
          "Dados:", args
        );
      };

      socket.onAny(catchAllListener);
      
      return () => {
        console.log("AppLayout: Limpando. Desconectando Socket.IO...");
        socket.off('new_message', handleSocketEvent);
        socket.off('chat_updated', handleSocketEvent);
        socket.offAny(catchAllListener);
        socket.disconnect();
      };
    }
  }, [token, setLatestEvent]); 
  // --- FIM DA LÓGICA DE CONEXÃO ---


  // --- LÓGICA: Disparo de Notificação (Com Logs) ---
  useEffect(() => {
    if (!latestEvent) return; 

    console.log("[NotificationLogic] 1. Processando evento:", latestEvent);
    const { chatData, platform } = latestEvent;
    
    const isChatActive = activeChatId === chatData.id;
    console.log(`[NotificationLogic] 2. Chat ID do evento: ${chatData.id}. Chat ID ativo: ${activeChatId}. Coincidem? ${isChatActive}`);

    let isPageActive = false;
    if (platform === 'instagram' && location.pathname.includes('/leads-instagram')) {
      isPageActive = true;
    } else if (platform === 'website' && location.pathname.includes('/leads-website')) {
      isPageActive = true;
    } else if (platform === 'platform' && location.pathname.includes('/clientes')) {
      isPageActive = true;
    }
    console.log(`[NotificationLogic] 3. Página atual: ${location.pathname}. A página está ativa? ${isPageActive}`);

    const shouldNotify = !(isPageActive && isChatActive);
    console.log(`[NotificationLogic] 4. Deve disparar notificação? ${shouldNotify}`);

    if (shouldNotify) {
      
      const notificationMessage = chatData.user_message || chatData.last_message_text;
      console.log(`[NotificationLogic] 5. Texto da notificação: "${notificationMessage}"`);

      addNotification({
        chatId: chatData.id,
        platform: platform,
        title: chatData.username || chatData.name || "Nova Mensagem",
        message: notificationMessage,
        profilePicture: chatData.profile_picture, // <-- ADICIONADO AQUI
      });
    } else {
      console.log("[NotificationLogic] 5. NÃO. Notificação suprimida (chat ou página já está ativo).");
    }

    setLatestEvent(null);
    console.log("[NotificationLogic] 6. Evento limpo do store.");

  }, [latestEvent, activeChatId, location.pathname, addNotification, setLatestEvent]);
  // --- FIM DA LÓGICA DE NOTIFICAÇÃO ---


  if (!token) {
    console.log("AppLayout: Estado do token está nulo. Redirecionando para /login");
    return <Navigate to="/login" replace />;
  }

  return (
    <AppContainer>
      <Sidebar onLogoutClick={logout} />
      <MainContent>
        <Outlet /> 
      </MainContent>
    </AppContainer>
  );
}
// --- Fim da Lógica de Rota Protegida ---


function App() {
  
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
        
        <NotificationHost />
        
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;