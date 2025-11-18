// src/pages/LeadsWebsite/LeadsWebsite.tsx
import { useState, useMemo } from "react";
import styled from "styled-components";
import { mockedLeadsWebsite } from "../../api/mockedData";
import type { LeadWebsite as LeadWebsiteType } from "../../types"; 
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";
import { ChatList as BaseChatList } from "../../components/ChatList/ChatList";
import { ChatWindow as BaseChatWindow } from "../../components/ChatWindow/ChatWindow";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  GlobeAltIcon, 
} from "@heroicons/react/24/outline";

// --- ESTILOS ---

const ChatList = styled(BaseChatList)`
  flex: 0 0 40%;
`;

const ChatWindow = styled(BaseChatWindow)`
  flex: 1; 
`;

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

const StyledPageIcon = styled(GlobeAltIcon)`
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

export function LeadsWebsite() {
  const [selectedChat, setSelectedChat] = useState<LeadWebsiteType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = useMemo(() => {
    return mockedLeadsWebsite.filter((chat) => {
      const searchLower = searchTerm.toLowerCase();
      return chat.name ? chat.name.toLowerCase().includes(searchLower) : false;
    });
  }, [searchTerm]);

  const totalLeads = mockedLeadsWebsite.length;
  const today = new Date().toISOString().slice(0, 10);
  const leadsToday = mockedLeadsWebsite.filter((chat) =>
    chat.dateCreated.toISOString().startsWith(today)
  ).length;

  const listHeader = (
    <>
      <CompactHeaderContainer>
        <TitleRow>
          <StyledPageIcon />
          <SectionTitle>Leads do Website</SectionTitle>
        </TitleRow>
        <StatsRow>
          <MiniCard>
            <MetricTitle>Total de Leads</MetricTitle>
            <MetricValue>{totalLeads}</MetricValue>
          </MiniCard>
          <MiniCard>
            <MetricTitle>Leads Hoje</MetricTitle>
            <MetricValue>{leadsToday}</MetricValue>
          </MiniCard>
        </StatsRow>
      </CompactHeaderContainer>

      <FilterHeaderWrapper>
        <SearchInputWrapper>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Pesquisar por Nome..."
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
      {/* CORREÇÃO: Adicionadas todas as props obrigatórias */}
      <ChatWindow 
        chat={selectedChat} 
        showInput={false} 
        onSendMessage={() => {}}
        onLoadMore={() => {}}
        isLoadingMore={false}
        hasMoreMessages={false}
      />
    </ChatLayout>
  );
}