// src/pages/ClientesPlataformaApp/ClientesPlataformaApp.tsx
import { useState, useMemo } from "react";
import styled from "styled-components";
import {
  mockedClientsPlataformaApp,
  mockedChamados,
} from "../../api/mockedData";
import type {
  ClientPlataformaApp as ClientType,
  Chamado,
} from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";
import { ChatList } from "../../components/ChatList/ChatList";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";
import { ChamadosList } from "../../components/ChamadosList/ChamadosList";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UsersIcon, 
} from "@heroicons/react/24/outline";

// --- ESTILOS ---

const CompactHeaderContainer = styled.div`
  padding: 24px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: rgba(0, 12, 51, 0.4);
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledPageIcon = styled(UsersIcon)`
  width: 40px;
  height: 40px;
  color: #06b6d4; 
  filter: drop-shadow(0 0 10px #06b6d4);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const MiniCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(
    160deg,
    rgba(79, 70, 229, 0.2) 0%,
    rgba(6, 182, 212, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const MetricTitle = styled.p`
  font-size: 0.75rem;
  color: #a0aec0;
  margin-bottom: 4px;
`;

const MetricValue = styled.p`
  font-size: 1.75rem;
  font-weight: bold;
  color: #e0e7ff;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
`;

const FilterHeaderWrapper = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(15, 23, 42, 0.5);
  display: flex;
  gap: 12px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #64748b;
`;

const InputBase = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 0.875rem;
  color: #e2e8f0;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 10px #4f46e5;
  }
`;

const SearchInput = styled(InputBase)`
  padding-left: 44px;
`;

const DateButton = styled.button`
  padding: 0 12px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4f46e5;
    color: #fff;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

// --- COMPONENTE ---

export function ClientesPlataformaApp() {
  const [selectedChat, setSelectedChat] = useState<ClientType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra clientes por nome ou CPF
  const filteredClients = useMemo(() => {
    return mockedClientsPlataformaApp.filter((client) => {
      const searchLower = searchTerm.toLowerCase();
      // CORREÇÃO 1: Garantir que client.name não seja undefined
      return (
        (client.name || "").toLowerCase().includes(searchLower) ||
        client.cpf.includes(searchLower)
      );
    });
  }, [searchTerm]);

  // Filtra chamados que são DESTE TIPO (client-)
  const clientChamados = useMemo(() => {
    return mockedChamados.filter((chamado) =>
      chamado.leadId.startsWith("client-")
    );
  }, []);

  const totalClients = mockedClientsPlataformaApp.length;
  const totalChamados = clientChamados.length;

  const handleChamadoClick = (chamado: Chamado) => {
    const chatCorrespondente = mockedClientsPlataformaApp.find(
      (client) => client.id === chamado.leadId
    );
    if (chatCorrespondente) {
      setSelectedChat(chatCorrespondente);
    }
  };

  const listHeader = (
    <>
      <CompactHeaderContainer>
        <TitleRow>
          <StyledPageIcon />
          <SectionTitle>Clientes da Plataforma</SectionTitle>
        </TitleRow>
        <StatsRow>
          <MiniCard>
            <MetricTitle>Total de Clientes</MetricTitle>
            <MetricValue>{totalClients}</MetricValue>
          </MiniCard>
          <MiniCard>
            <MetricTitle>Chamados Abertos</MetricTitle>
            <MetricValue>{totalChamados}</MetricValue>
          </MiniCard>
        </StatsRow>
      </CompactHeaderContainer>

      <FilterHeaderWrapper>
        <SearchInputWrapper>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Pesquisar por Nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputWrapper>
        <DateButton onClick={() => alert("Filtro de data clicado!")}>
          <CalendarDaysIcon />
        </DateButton>
      </FilterHeaderWrapper>
    </>
  );

  return (
    <ChatLayout>
      <ChatList
        chats={filteredClients}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={(chat) => setSelectedChat(chat)}
        headerComponent={listHeader}
      />
      {/* CORREÇÃO 2: Adicionadas todas as props obrigatórias */}
      <ChatWindow 
        chat={selectedChat} 
        showInput={true}
        onSendMessage={(msg) => console.log("Enviar mensagem:", msg)}
        onLoadMore={() => console.log("Carregar mais")}
        isLoadingMore={false}
        hasMoreMessages={false}
      />
      <ChamadosList
        chamados={clientChamados}
        onChamadoClick={handleChamadoClick}
      />
    </ChatLayout>
  );
}