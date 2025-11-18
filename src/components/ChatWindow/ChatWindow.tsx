// src/components/ChatWindow/ChatWindow.tsx
import { 
  PaperAirplaneIcon, 
  ArrowPathIcon 
} from "@heroicons/react/24/solid";
import { 
  useState, 
  useEffect, 
  useRef, 
  useLayoutEffect 
} from "react";
import * as S from "./ChatWindow.styles";
import type { BaseChat } from "../../types";

interface ChatWindowProps {
  chat: BaseChat | null;
  className?: string;
  onSendMessage: (message: string) => void;
  // Prop para API de pause/unpause
  onPauseToggle?: (chatId: string) => Promise<any>; 
  // Props para Infinite Scroll
  onLoadMore: () => void;
  isLoadingMore: boolean;
  hasMoreMessages: boolean;
  // Prop para mostrar ou esconder o input
  showInput?: boolean;
}

export function ChatWindow({ 
  chat, 
  className, 
  onSendMessage, 
  onPauseToggle,
  onLoadMore,
  isLoadingMore,
  hasMoreMessages,
  showInput = true
}: ChatWindowProps) {
  
  const [isAiPaused, setIsAiPaused] = useState(false); 
  const [newMessage, setNewMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("A IA está respondendo");
  const [isTogglingPause, setIsTogglingPause] = useState(false);

  const messagesAreaRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null);

  useEffect(() => {
    if (chat) {
      setIsAiPaused(!!chat.is_blocked);
    } else {
      setIsAiPaused(false);
    }
    setIsTogglingPause(false);
  }, [chat?.id, chat?.is_blocked]);

  // Lógica de bloqueio 24h e Placeholder
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
  
  // Lógica de Scroll
  useLayoutEffect(() => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop = messagesAreaRef.current.scrollHeight;
    }
  }, [chat?.id]);

  useLayoutEffect(() => {
    if (prevScrollHeight !== null && messagesAreaRef.current && isLoadingMore === false) {
      const newScrollHeight = messagesAreaRef.current.scrollHeight;
      messagesAreaRef.current.scrollTop = newScrollHeight - prevScrollHeight;
      setPrevScrollHeight(null); 
    }
  }, [chat?.messages.length, prevScrollHeight, isLoadingMore]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && !isLoadingMore && hasMoreMessages) {
      if (messagesAreaRef.current) {
        setPrevScrollHeight(messagesAreaRef.current.scrollHeight);
      }
      onLoadMore(); 
    }
  };

  if (!chat) {
    return (
      <S.Placeholder className={className}>
        <p>Selecione uma conversa para visualizar</p>
      </S.Placeholder>
    );
  }

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
  
  const handlePauseClick = async () => {
    if (!chat || isTogglingPause) return; 

    if (onPauseToggle) {
      setIsTogglingPause(true);
      try {
        await onPauseToggle(chat.id);
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
    return isAiPaused ? "Reativar IA" : "Pausar IA";
  };
  const isButtonPaused = isAiPaused;

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
      
      <S.MessagesArea ref={messagesAreaRef} onScroll={handleScroll}>
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
      
      {showInput && (
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
      )}
    </S.Container>
  );
}