// src/pages/LeadsInstagram/LeadsInstagram.tsx
import { useState, useMemo, useEffect, useCallback } from "react";
import * as S from "./LeadsInstagram.styles";
import { 
  getInstagramChats, 
  getInstagramMessages, 
  sendInstagramMessage,
  getInstagramStats // <-- 1. Importar a nova função
} from "../../servers/instagram"; 
// import { mockedChamados } from "../../api/mockedData"; // <-- 2. Remover
import type {
  LeadInstagram as LeadInstagramType,
  // Chamado, // <-- 3. Remover
  Message,
  InstagramStats // <-- 4. Importar o novo tipo
} from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";
import { ChatList } from "../../components/ChatList/ChatList";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";
// import { ChamadosList } from "../../components/ChamadosList/ChamadosList"; // <-- 5. Remover
import {
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { InstagramIcon } from "./InstagramIcon";
import { useSocketStore } from "../../stores/socketStore";

// Helper
const getValidString = (value: any): string | undefined => {
  if (typeof value === 'string' && value !== "undefined" && value !== "false") {
    return value;
  }
  return undefined;
};

export function LeadsInstagram() {
  const [allChats, setAllChats] = useState<LeadInstagramType[]>([]);
  // const [chamados, setChamados] = useState<Chamado[]>(mockedChamados); // <-- 6. Remover
  const [stats, setStats] = useState<InstagramStats | null>(null); // <-- 7. Adicionar estado de stats
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
      // 8. Chamar as duas APIs em paralelo
      const [instagramChats, instagramStats] = await Promise.all([
        getInstagramChats(),
        getInstagramStats()
      ]);
      setAllChats(instagramChats);
      setStats(instagramStats); // 9. Salvar os stats
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

    // Se o chat não está na lista (é um chat 100% novo), recarregue tudo
    if (chatIndex === -1) { 
      console.warn("Mensagem recebida para um chat novo/não carregado:", chatData.id);
      fetchChats(); 
      setLatestEvent(null);
      return;
    }

    const existingChat = allChats[chatIndex];
    
    // Mapeia os dados do socket
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

  // 10. Remover 'handleChamadoClick'
  /*
  const handleChamadoClick = (chamado: Chamado) => {
    ...
  };
  */

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

  // 11. Remover 'totalChamados'
  // const totalLeads = allChats.length; // (agora vem dos stats)
  // const totalChamados = chamados.length; // (removido)

  const listHeader = (
    <>
      {/* --- 12. ATUALIZAR OS CARDS --- */}
      <S.CompactHeaderContainer>
        <S.TitleRow>
          <InstagramIcon />
          <S.SectionTitle>Leads Instagram</S.SectionTitle>
        </S.TitleRow>
        <S.StatsRow>
          <S.MiniCard>
            <S.MetricTitle>Total de Chats</S.MetricTitle>
            <S.MetricValue>{isLoading ? "..." : (stats?.total_chats || 0)}</S.MetricValue>
          </S.MiniCard>
          <S.MiniCard>
            <S.MetricTitle>Chats Ativos Hoje</S.MetricTitle>
            <S.MetricValue>{isLoading ? "..." : (stats?.active_today_chats || 0)}</S.MetricValue>
          </S.MiniCard>
        </S.StatsRow>
      </S.CompactHeaderContainer>
      
      <S.FilterHeaderWrapper>
        <S.SearchInputWrapper>
          <S.SearchIcon />
          <S.SearchInput
            type="text"
            placeholder="Pesquisar por @username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchInputWrapper>
        <S.DateButton onClick={() => alert("Filtro de data clicado!")}>
          <CalendarDaysIcon />
        </S.DateButton>
      </S.FilterHeaderWrapper>
    </>
  );

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

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
      />
      {/* --- 13. REMOVER A COLUNA DE CHAMADOS --- */}
      {/* <ChamadosList
        chamados={chamados} 
        onChamadoClick={handleChamadoClick}
      /> 
      */}
    </ChatLayout>
  );
}