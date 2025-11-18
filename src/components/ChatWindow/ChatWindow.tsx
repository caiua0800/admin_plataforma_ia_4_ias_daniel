// src/components/ChatWindow/ChatWindow.tsx
import { 
  PaperAirplaneIcon, 
  ArrowPathIcon // 1. Importar ícone do spinner
} from "@heroicons/react/24/solid";
import { 
  useState, 
  useEffect, 
  useRef, // 2. Importar refs
  useLayoutEffect // 3. Importar useLayoutEffect
} from "react";
import * as S from "./ChatWindow.styles";
import type { LeadInstagram as LeadInstagramType, Message } from "../../types";

interface ChatWindowProps {
  chat: LeadInstagramType | null;
  className?: string;
  onSendMessage: (message: string) => void;
  onPauseToggle?: (chatId: string) => Promise<any>;
  
  // --- NOVAS PROPS ADICIONADAS ---
  onLoadMore: () => void;
  isLoadingMore: boolean;
  hasMoreMessages: boolean;
}

export function ChatWindow({ 
  chat, 
  className, 
  onSendMessage, 
  onPauseToggle,
  onLoadMore,
  isLoadingMore,
  hasMoreMessages
}: ChatWindowProps) {
  
  const [isAiPaused, setIsAiPaused] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("A IA está respondendo");
  const [isTogglingPause, setIsTogglingPause] = useState(false);

  // --- REFS PARA O SCROLL ---
  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null);

  // Lógica de bloqueio 24h (sem alteração)
  useEffect(() => {
    if (!chat) return;
    const lastClientMessageDate = chat.lastClientMessageDate;
    let blocked = false;
    if (lastClientMessageDate) {
      const now = new Date();
      const messageDate = new Date(lastClientMessageDate);
      const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
      blocked = diffInHours > 24;
    }
    setIsBlocked(blocked);
    if (blocked) {
      setPlaceholderText("Janela de 24h fechada. Aguarde o cliente responder.");
    } else if (isAiPaused) {
      setPlaceholderText("Digite sua mensagem...");
    } else {
      setPlaceholderText("A IA está respondendo");
    }
  }, [chat, isAiPaused, chat?.lastClientMessageDate]);

  // Reseta pause (sem alteração)
  useEffect(() => {
    setIsAiPaused(false);
    setIsTogglingPause(false);
  }, [chat?.id]);

  // --- LÓGICA DE SCROLL ---

  // 1. Rola para o final quando o chat é aberto pela primeira vez
  useLayoutEffect(() => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  }, [chat?.id]); // Depende apenas do ID do chat

  // 2. Preserva a posição do scroll ao carregar mais mensagens
  useLayoutEffect(() => {
    if (prevScrollHeight !== null && messagesAreaRef.current && isLoadingMore === false) {
      const newScrollHeight = messagesAreaRef.current.scrollHeight;
      messagesAreaRef.current.scrollTop = newScrollHeight - prevScrollHeight;
      setPrevScrollHeight(null); // Reseta
    }
  }, [chat?.messages.length, prevScrollHeight, isLoadingMore]); // Roda quando as mensagens mudam

  // 3. Handler de scroll para carregar mais
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    
    // Se o scroll chegar ao topo, e não estiver carregando, e houver mais mensagens
    if (scrollTop === 0 && !isLoadingMore && hasMoreMessages) {
      console.log("ChatWindow: Scroll no topo, carregando mais...");
      // Salva a altura atual ANTES de buscar novas
      if (messagesAreaRef.current) {
        setPrevScrollHeight(messagesAreaRef.current.scrollHeight);
      }
      onLoadMore(); // Chama a função do pai
    }
  };
  // --- FIM DA LÓGICA DE SCROLL ---


  if (!chat) {
    return (
      <S.Placeholder className={className}>
        <p>Selecione uma conversa para visualizar</p>
      </S.Placeholder>
    );
  }

  // Funções de envio (sem alteração)
  const handleSendClick = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage(""); 
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };
  
  // Lógica do botão de pause (sem alteração)
  const handlePauseClick = async () => {
    if (!chat || isTogglingPause) return; 

    if (onPauseToggle) {
      setIsTogglingPause(true);
      try {
        await onPauseToggle(chat.id);
        setIsAiPaused(!isAiPaused);
      } catch (error) {
        console.error("Falha ao tentar pausar a IA:", error);
        alert("Erro ao tentar pausar a IA. Tente novamente.");
      } finally {
        setIsTogglingPause(false);
      }
    } else {
      setIsAiPaused(!isAiPaused);
    }
  };

  const isInputDisabled = isBlocked || !isAiPaused;
  const getPauseButtonText = () => {
    if (isTogglingPause) return "Aguarde...";
    if (!onPauseToggle || !isAiPaused) {
      return "Pausar IA";
    }
    return "Reativar IA";
  };
  const isButtonPaused = onPauseToggle ? isAiPaused : false;

  return (
    <S.Container className={className}>
      <S.Header>
        <S.Name>{chat.username ? `@${chat.username}` : (chat.name || "Visitante")}</S.Name>
        <S.PauseButton
          $isPaused={isButtonPaused}
          onClick={handlePauseClick} 
          disabled={isTogglingPause}
        >
          {getPauseButtonText()} 
        </S.PauseButton>
      </S.Header>
      
      {/* 4. Adiciona a 'ref' e o 'onScroll' handler */}
      <S.MessagesArea ref={messagesAreaRef} onScroll={handleScroll}>
      
        {/* 5. Renderiza o spinner no topo se estiver carregando */}
        {isLoadingMore && (
          <S.SpinnerContainer>
            <ArrowPathIcon />
          </S.SpinnerContainer>
        )}

        {chat.messages.map((msg) => {
          const time = new Date(msg.dateCreated).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <S.MessageBox key={msg.id} $isReply={msg.isReply}>
              <S.MessageWrapper $isReply={msg.isReply}>
                <S.MessageBubble
                  $isReply={msg.isReply}
                  dangerouslySetInnerHTML={{ __html: msg.message.replace(/\n/g, '<br>') }}
                />
                <S.Timestamp $isReply={msg.isReply}>{time}</S.Timestamp>
              </S.MessageWrapper>
            </S.MessageBox>
          );
        })}
      </S.MessagesArea>
      
      <S.InputArea>
        <S.InputWrapper>
          <S.Input
            placeholder={placeholderText}
            disabled={isInputDisabled}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <S.SendButton 
            disabled={isInputDisabled || !newMessage.trim()}
            onClick={handleSendClick}
          >
            <PaperAirplaneIcon width={24} height={24} />
          </S.SendButton>
        </S.InputWrapper>
      </S.InputArea>
    </S.Container>
  );
}