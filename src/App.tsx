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
import { Relatorios } from "./pages/Relatorios/Relatorios"; // <-- PASSO 1: Importar a nova página

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
            
            {/* PASSO 2: Adicionar a nova rota para relatórios */}
            <Route path="/relatorios" element={<Relatorios />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;