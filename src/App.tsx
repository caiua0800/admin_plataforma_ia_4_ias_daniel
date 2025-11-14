import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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

// --- 1. IMPORTAR useEffect e a biblioteca 'io' ---
import { useEffect } from "react";
import { io } from "socket.io-client";
// --- 2. IMPORTAR A STORE ATUALIZADA ---
import { useSocketStore } from "./stores/socketStore";

// AppContainer (sem alteração)
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

// MainContent (sem alteração)
const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  height: 100vh;
  box-sizing: border-box;
`;

// AppLayout (sem alteração)
function AppLayout() {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
}

function App() {
  
  // --- 3. PEGAR A AÇÃO ATUALIZADA DA STORE ---
  const setLatestEvent = useSocketStore((state) => state.setLatestEvent);

  // --- 4. LÓGICA DO SOCKET.IO ---
  useEffect(() => {
    // Para o socket.io, usamos a URL HTTP normal
    const socketUrl = "http://192.168.3.24:3000";
    
    console.log("Tentando conectar ao Socket.IO em", socketUrl);
    
    // Criar a instância do Socket.IO
    const socket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 3000,
    });

    // Ouvir os eventos do Socket.IO
    socket.on('connect', () => {
      console.log("Socket.IO conectado!", "ID:", socket.id);
    });

    socket.on('disconnect', () => {
      console.log("Socket.IO desconectado. Tentando reconectar...");
    });

    socket.on('connect_error', (error) => {
      console.error("Erro na conexão Socket.IO:", error.message);
    });

    // 5. OUVIR 'new_message' (como antes)
    socket.on('new_message', (data) => {
      console.log("Socket.IO 'new_message' recebido:", data);
      
      // 6. PASSAR O EVENTO COMPLETO PARA A STORE
      // (Verifica se é o evento que esperamos)
      if (data && (data.event === 'chat_updated' || data.event === 'new_message')) {
        setLatestEvent(data); 
      }
    });

    // 7. Função de limpeza
    return () => {
      console.log("Desconectando Socket.IO...");
      socket.disconnect();
    };
  }, [setLatestEvent]); // Adicionado 'setLatestEvent' à dependência

  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota para o login, fora do layout principal */}
          <Route path="/login" element={<Login />} />

          {/* Suas rotas existentes, que usam o layout com sidebar */}
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