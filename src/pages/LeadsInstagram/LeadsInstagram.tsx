// src/pages/LeadsInstagram/LeadsInstagram.tsx
import { useState, useMemo } from "react";
import styled from "styled-components";
import { mockedLeadsInstagram, mockedChamados } from "../../api/mockedData";
import {
  LeadInstagram as LeadInstagramType,
  Chamado,
} from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";
import { ChatList } from "../../components/ChatList/ChatList";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";
import { ChamadosList } from "../../components/ChamadosList/ChamadosList"; // Importa a 3ª coluna
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { InstagramIcon } from "./InstagramIcon";

// --- NOVOS ESTILOS PARA O CABEÇALHO COMPACTO ---
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

// --- Estilos para o Filtro (COM BOTÃO) ---
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
  flex: 1; /* Ocupa a maior parte do espaço */
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

// Botão de Data
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

// --- Fim dos Estilos ---

export function LeadsInstagram() {
  const [selectedChat, setSelectedChat] = useState<LeadInstagramType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  // const [dateFilter, setDateFilter] = useState(""); // Desativado

  const filteredChats = useMemo(() => {
    return mockedLeadsInstagram.filter((chat) => {
      return chat.username.toLowerCase().includes(searchTerm.toLowerCase());
      // Lógica de data removida por enquanto
    });
  }, [searchTerm]);

  const totalLeads = mockedLeadsInstagram.length;
  const totalChamados = mockedChamados.length; // Nova métrica

  // Lógica para lidar com o clique no chamado
  const handleChamadoClick = (chamado: Chamado) => {
    const chatCorrespondente = mockedLeadsInstagram.find(
      (lead) => lead.id === chamado.leadId
    );
    if (chatCorrespondente) {
      setSelectedChat(chatCorrespondente);
    }
  };

  const listHeader = (
    <>
      <CompactHeaderContainer>
        <TitleRow>
          <InstagramIcon />
          <SectionTitle>Leads Instagram</SectionTitle>
        </TitleRow>
        <StatsRow>
          <MiniCard>
            <MetricTitle>Total de Leads</MetricTitle>
            <MetricValue>{totalLeads}</MetricValue>
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
            placeholder="Pesquisar por @username..."
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
        chats={filteredChats}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={(chat) => setSelectedChat(chat)}
        headerComponent={listHeader}
      />
      <ChatWindow chat={selectedChat} showInput={true} />
      <ChamadosList
        chamados={mockedChamados}
        onChamadoClick={handleChamadoClick}
      />
    </ChatLayout>
  );
}