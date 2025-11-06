import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AdminProvider } from "./contexts/AdminContext";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { LeadsInstagram } from "./pages/LeadsInstagram/LeadsInstagram";
import { LeadsWebsite } from "./pages/LeadsWebsite/LeadsWebsite";
import { ClientesPlataformaApp } from "./pages/ClientesPlataformaApp/ClientesPlataformaApp";
import { Usuarios } from "./pages/Usuarios/Usuarios";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
`;
const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

function AppLayout() {
  return (
    <AppContainer>
      {" "}
      <Sidebar />{" "}
      <MainContent>
        {" "}
        <Outlet />{" "}
      </MainContent>{" "}
    </AppContainer>
  );
}

function App() {
  return (
    <AdminProvider>
      {" "}
      {/* O Provider envolve todas as rotas */}
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads-instagram" element={<LeadsInstagram />} />
            <Route path="/leads-website" element={<LeadsWebsite />} />
            <Route path="/clientes" element={<ClientesPlataformaApp />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
export default App;
