// src/pages/LeadsInstagram/LeadsInstagram.tsx
import { useState, useMemo, useEffect, useCallback } from "react";
import styled from "styled-components"; // 1. Importar o 'styled'
import { 
  getInstagramChats, 
  getInstagramMessages, 
  sendInstagramMessage,
  getInstagramStats
} from "../../servers/instagram"; 
import type {
  LeadInstagram as LeadInstagramType,
  Message,
  InstagramStats
} from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";

// 2. Importar os componentes base com 'as'
import { ChatList as BaseChatList } from "../../components/ChatList/ChatList";
import { ChatWindow as BaseChatWindow } from "../../components/ChatWindow/ChatWindow";

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon, // 3. Importar o ícone de pesquisa
} from "@heroicons/react/24/outline";
import { InstagramIcon } from "./InstagramIcon";
import { useSocketStore } from "../../stores/socketStore";


// --- ESTILOS ---
// (Definidos localmente, assim como em LeadsWebsite.tsx)

// 4. Definir as "travas" de layout 40/60
const ChatList = styled(BaseChatList)`
  flex: 0 0 40%; /* 40% para a lista */
`;

const ChatWindow = styled(BaseChatWindow)`
  flex: 1; /* Ocupa o resto (60%) */
`;

// 5. Definir TODOS os outros estilos localmente
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

// --- FIM DOS ESTILOS ---


// Helper
const getValidString = (value: any): string | undefined => {
  if (typeof value === 'string' && value !== "undefined" && value !== "false") {
    return value;
  }
  return undefined;
};

export function LeadsInstagram() {
  const [allChats, setAllChats] = useState<LeadInstagramType[]>([]);
  const [stats, setStats] = useState<InstagramStats | null>(null);
  const [selectedChat, setSelectedChat] = useState<LeadInstagramType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latestEvent = useSocketStore((state) => state.latestEvent);
  const setLatestEvent = useSocketStore((state) => state.setLatestEvent);

  const fetchChats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [instagramChats, instagramStats] = await Promise.all([
        getInstagramChats(),
        getInstagramStats()
      ]);
      setAllChats(instagramChats);
      setStats(instagramStats);
    } catch (err) {
      setError("Não foi possível carregar as conversas.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Efeito que reage ao WebSocket
  useEffect(() => {
    if (!latestEvent || latestEvent.platform !== 'instagram' || latestEvent.event !== 'chat_updated') {
      return; 
    }

    const { chatData } = latestEvent;
    const chatIndex = allChats.findIndex(c => c.id === chatData.id);

    if (chatIndex === -1) { 
      console.warn("Mensagem recebida para um chat novo/não carregado:", chatData.id);
      fetchChats(); 
      setLatestEvent(null);
      return;
    }

    const existingChat = allChats[chatIndex];
    
    const updatedChatSummary: LeadInstagramType = {
        ...existingChat,
        lastMessageText: chatData.last_message_text,
        last_message_date: new Date(chatData.last_message_date),
        username: chatData.username,
        avatarUrl: getValidString(chatData.profile_picture),
        name: getValidString(chatData.name),
        followers_count: chatData.followers_count,
        follows_me: chatData.follows_me,
    };

    if (selectedChat && selectedChat.id === chatData.id) {
        updatedChatSummary.hasUnread = false;
        
        getInstagramMessages(chatData.id).then(({ messages, lastClientMessageDate }) => {
            const fullyUpdatedChat = {
                ...updatedChatSummary,
                messages: messages,
                lastClientMessageDate: lastClientMessageDate,
            };
            setSelectedChat(fullyUpdatedChat);
            
            setAllChats(prevChats => prevChats.map((chat, i) => 
                i === chatIndex ? fullyUpdatedChat : chat
            ));
        });
        
    } else {
        updatedChatSummary.hasUnread = true;
        setAllChats(prevChats => prevChats.map((chat, i) => 
            i === chatIndex ? updatedChatSummary : chat
        ));
    }

    setLatestEvent(null);

  }, [latestEvent, allChats, selectedChat, setLatestEvent, fetchChats]);


  // Ordenação
  const filteredChats = useMemo(() => {
    const sortedChats = [...allChats].sort((a, b) => {
      const dateA = new Date(a.last_message_date || a.dateCreated).getTime();
      const dateB = new Date(b.last_message_date || b.dateCreated).getTime();
      
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      
      return dateB - dateA;
    });
    
    return sortedChats.filter((chat) =>
      (chat.username || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allChats, searchTerm]);

  // Recarrega o chat ao clicar
  const handleSelectChat = async (chat: LeadInstagramType) => {
    if (chat.hasUnread) {
      const updatedChat = { ...chat, hasUnread: false };
      setAllChats(prevChats => 
        prevChats.map(c => c.id === chat.id ? updatedChat : c)
      );
    }
    
    try {
      setSelectedChat({...chat, hasUnread: false});

      const { messages, lastClientMessageDate } = await getInstagramMessages(chat.id);
      
      const chatWithMessages = { 
        ...chat, 
        messages, 
        lastClientMessageDate,
        hasUnread: false,
      };
      
      setAllChats(prevChats => 
        prevChats.map(c => c.id === chat.id ? chatWithMessages : c)
      );
      
      setSelectedChat(chatWithMessages);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    }
  };

  // Envio de mensagem
  const handleSendMessage = async (messageText: string) => {
    if (!selectedChat) return;

    const adminMessage: Message = {
      id: `local-admin-${Date.now()}`,
      message: messageText,
      isReply: true,
      senderName: "Atendente",
      dateCreated: new Date(),
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, adminMessage],
      lastMessageText: adminMessage.message,
      last_message_date: adminMessage.dateCreated,
    };
    
    setSelectedChat(updatedChat);
    setAllChats(prev => prev.map(c => c.id === updatedChat.id ? updatedChat : c));

    try {
      await sendInstagramMessage(selectedChat.id, messageText);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const listHeader = (
    <>
      {/* 6. Usar os componentes locais, SEM 'S.' */}
      <CompactHeaderContainer>
        <TitleRow>
          <InstagramIcon />
          <SectionTitle>Leads Instagram</SectionTitle>
        </TitleRow>
        <StatsRow>
          <MiniCard>
            <MetricTitle>Total de Chats</MetricTitle>
            <MetricValue>{isLoading ? "..." : (stats?.total_chats || 0)}</MetricValue>
          </MiniCard>
          <MiniCard>
            <MetricTitle>Chats Ativos Hoje</MetricTitle>
            <MetricValue>{isLoading ? "..." : (stats?.active_today_chats || 0)}</MetricValue>
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

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <ChatLayout>
      {/* 7. Usar os componentes locais <ChatList> e <ChatWindow> */}
      <ChatList
        chats={filteredChats}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={handleSelectChat}
        headerComponent={listHeader}
      />
      <ChatWindow 
        chat={selectedChat} 
        onSendMessage={handleSendMessage}
      />
    </ChatLayout>
  );
}