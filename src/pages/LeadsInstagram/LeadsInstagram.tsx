// src/pages/LeadsInstagram/LeadsInstagram.tsx
import { useState, useMemo, useEffect, useCallback } from "react";
import styled from "styled-components";
import { 
  getInstagramChats, 
  getInstagramMessages, 
  sendInstagramMessage,
  getInstagramStats,
  toggleChatBlock
} from "../../servers/instagram"; 
import type {
  LeadInstagram as LeadInstagramType,
  Message,
  InstagramStats
} from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";

import { ChatList as BaseChatList } from "../../components/ChatList/ChatList";
import { ChatWindow as BaseChatWindow } from "../../components/ChatWindow/ChatWindow";

import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { InstagramIcon } from "./InstagramIcon";

// Imports dos Stores
import { useSocketStore } from "../../stores/socketStore";
import { useChatActivityStore } from "../../stores/useChatActivityStore";


// --- ESTILOS ---

const ChatList = styled(BaseChatList)`
  flex: 0 0 40%; /* 40% para a lista */
`;

const ChatWindow = styled(BaseChatWindow)`
  flex: 1; /* Ocupa o resto (60%) */
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

/**
 * Remove mensagens duplicadas de um array com base no 'id'.
 */
const getUniqueMessages = (messages: Message[]) => {
  const uniqueIds = new Set();
  return messages.filter(msg => {
    if (uniqueIds.has(msg.id)) {
      console.warn(`[getUniqueMessages] Mensagem duplicada removida: ID ${msg.id}`);
      return false;
    }
    uniqueIds.add(msg.id);
    return true;
  });
};


export function LeadsInstagram() {
  const [allChats, setAllChats] = useState<LeadInstagramType[]>([]);
  const [stats, setStats] = useState<InstagramStats | null>(null);
  const [selectedChat, setSelectedChat] = useState<LeadInstagramType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false); // Para o infinite scroll

  const latestEvent = useSocketStore((state) => state.latestEvent);
  const { setActiveChatId } = useChatActivityStore();

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
    } catch (err: any) {
      setError("Não foi possível carregar as conversas.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Informa ao store qual chat está ativo
  useEffect(() => {
    setActiveChatId(selectedChat?.id || null);
  }, [selectedChat, setActiveChatId]);

  // Limpa o chat ativo ao sair da página
  useEffect(() => {
    return () => {
      setActiveChatId(null);
    };
  }, [setActiveChatId]);


  // Efeito que reage ao WebSocket (para atualizar a UI em tempo real)
  useEffect(() => {
    if (!latestEvent || latestEvent.platform !== 'instagram') {
      return; 
    }

    console.log("[LeadsInstagram] 1. Processando evento:", latestEvent);
    
    const { chatData } = latestEvent;
    const chatIndex = allChats.findIndex(c => c.id === chatData.id);

    if (chatIndex === -1) { 
      console.warn("[LeadsInstagram] 2. Mensagem recebida para um chat novo/não carregado. Buscando chats...", chatData.id);
      fetchChats();
      // Não limpa o evento, deixa o AppLayout decidir sobre a notificação
      return;
    }
    
    console.log("[LeadsInstagram] 2. Chat encontrado na lista. Atualizando...");

    const existingChat = allChats[chatIndex];
    
    const updatedChatSummary: LeadInstagramType = {
        ...existingChat,
        lastMessageText: chatData.user_message || chatData.last_message_text,
        last_message_date: new Date(chatData.last_message_date),
        username: chatData.username,
        avatarUrl: getValidString(chatData.profile_picture),
        name: getValidString(chatData.name),
        followers_count: chatData.followers_count,
        follows_me: chatData.follows_me,
    };

    // Se o chat está aberto, atualiza as mensagens
    if (selectedChat && selectedChat.id === chatData.id) {
        console.log("[LeadsInstagram] 3. O chat está ABERTO. Atualizando mensagens...");
        updatedChatSummary.hasUnread = false;
        
        // Busca apenas a página 1 (as mais novas)
        getInstagramMessages(chatData.id, 1).then(({ messages: newMessages, lastClientMessageDate }) => {
            
            const updatedChat = {
                ...updatedChatSummary,
                // Combina as mensagens novas com as antigas, sem duplicatas
                messages: getUniqueMessages([
                  ...selectedChat.messages, 
                  ...newMessages
                ]),
                lastClientMessageDate: lastClientMessageDate,
                // Mantém a paginação existente
                currentPage: selectedChat.currentPage, 
                hasMoreMessages: selectedChat.hasMoreMessages,
            };
            setSelectedChat(updatedChat);
            setAllChats(prevChats => prevChats.map((chat, i) => 
                i === chatIndex ? updatedChat : chat
            ));
        });
        
    } else {
        // Se o chat está fechado, apenas marca como não lido
        console.log("[LeadsInstagram] 3. O chat está FECHADO. Marcando como não lido.");
        updatedChatSummary.hasUnread = true;
        setAllChats(prevChats => prevChats.map((chat, i) => 
            i === chatIndex ? updatedChatSummary : chat
        ));
    }
    
    // NÃO LIMPA O EVENTO: setLatestEvent(null);
    // Deixa o AppLayout.tsx ser o único responsável por limpar o evento.

  }, [latestEvent, allChats, selectedChat, fetchChats]);


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

  // Seleção de Chat (Carrega 2 páginas)
  const handleSelectChat = async (chat: LeadInstagramType) => {
    if (chat.hasUnread) {
      const updatedChat = { ...chat, hasUnread: false };
      setAllChats(prevChats => 
        prevChats.map(c => c.id === chat.id ? updatedChat : c)
      );
    }
    
    // Mostra o chat (vazio) enquanto carrega
    setSelectedChat({...chat, hasUnread: false, messages: []});
    
    try {
      console.log(`[handleSelectChat] Buscando páginas 1 e 2 para ${chat.id}`);
      const [page1Data, page2Data] = await Promise.all([
        getInstagramMessages(chat.id, 1),
        getInstagramMessages(chat.id, 2)
      ]);
      
      const mergedMessages = getUniqueMessages([
        ...page2Data.messages, 
        ...page1Data.messages
      ]);
      
      const chatWithMessages: LeadInstagramType = { 
        ...chat, 
        messages: mergedMessages, 
        lastClientMessageDate: page1Data.lastClientMessageDate,
        hasUnread: false,
        currentPage: 2, // Já carregamos até a página 2
        hasMoreMessages: page2Data.messages.length > 0, // Se a página 2 tinha msgs, deve haver mais
      };
      
      setAllChats(prevChats => 
        prevChats.map(c => c.id === chat.id ? chatWithMessages : c)
      );
      setSelectedChat(chatWithMessages);
      
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
      setSelectedChat({...chat, hasUnread: false, messages: []});
    }
  };

  // Carregar Mais Mensagens (Infinite Scroll)
  const handleLoadMore = async () => {
    if (!selectedChat || isLoadingMore || !selectedChat.hasMoreMessages) return;

    setIsLoadingMore(true);
    
    const nextPage = (selectedChat.currentPage || 0) + 1;
    console.log(`[handleLoadMore] Buscando página ${nextPage} para ${selectedChat.id}`);
    
    try {
      // A API agora retorna { messages: [] } se não houver mais
      const { messages: newMessages } = await getInstagramMessages(selectedChat.id, nextPage);

      // Filtra mensagens que já podem existir no estado (previne duplicatas)
      const uniqueNewMessages = newMessages.filter(
        nm => !selectedChat.messages.some(em => em.id === nm.id)
      );

      const updatedChat: LeadInstagramType = {
        ...selectedChat,
        messages: getUniqueMessages([ 
          ...uniqueNewMessages, 
          ...selectedChat.messages
        ]),
        currentPage: nextPage,
        hasMoreMessages: newMessages.length > 0, // Se não veio msgs, não há mais
      };

      setSelectedChat(updatedChat);
      setAllChats(prev => prev.map(c => c.id === updatedChat.id ? updatedChat : c));

    } catch (error) {
      console.error("Erro ao carregar mais mensagens:", error);
      // Se um erro ocorrer, para de tentar carregar mais
      const errorChat = {
        ...selectedChat,
        hasMoreMessages: false,
      };
      setSelectedChat(errorChat);
      setAllChats(prev => prev.map(c => c.id === errorChat.id ? errorChat : c));
    } finally {
      setIsLoadingMore(false);
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

  // Pausar/Reativar IA
  const handlePauseToggle = async (chatId: string) => {
    console.log(`[LeadsInstagram] Tentando pausar/reativar IA para o chat: ${chatId}`);
    await toggleChatBlock(chatId); 
    console.log(`[LeadsInstagram] Ação de pause/reativar IA enviada para: ${chatId}`);
  };

  // Cabeçalho da Lista
  const listHeader = (
    <>
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

  // Renderização
  return (
    <ChatLayout>
      <ChatList
        chats={filteredChats}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={handleSelectChat}
        headerComponent={listHeader}
      />
      <ChatWindow 
        chat={selectedChat} 
        onSendMessage={handleSendMessage}
        onPauseToggle={handlePauseToggle}
        
        // Props para o Infinite Scroll
        onLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
        hasMoreMessages={selectedChat?.hasMoreMessages ?? false}
      />
    </ChatLayout>
  );
}