// src/components/ChatWindow/ChatWindow.tsx
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import * as S from "./ChatWindow.styles";
// Importar os tipos completos
import type { LeadInstagram as LeadInstagramType, Message } from "../../types";

interface ChatWindowProps {
  chat: LeadInstagramType | null;
  className?: string;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ chat, className, onSendMessage }: ChatWindowProps) {
  const [isAiPaused, setIsAiPaused] = useState(false);
  const [newMessage, setNewMessage] = useState(""); // Estado para o input
  const [isBlocked, setIsBlocked] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("A IA está respondendo");

  // --- LÓGICA DE BLOQUEIO DE 24 HORAS ---
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

    // Atualiza o placeholder baseado na lógica
    if (blocked) {
      setPlaceholderText("Janela de 24h fechada. Aguarde o cliente responder.");
    } else if (isAiPaused) {
      setPlaceholderText("Digite sua mensagem...");
    } else {
      setPlaceholderText("A IA está respondendo");
    }
  }, [chat, isAiPaused, chat?.lastClientMessageDate]); // Roda sempre que o chat ou o estado de pausa mudar
  // --- FIM DA LÓGICA ---

  if (!chat) {
    return (
      <S.Placeholder className={className}>
        <p>Selecione uma conversa para visualizar</p>
      </S.Placeholder>
    );
  }

  // Função para lidar com o envio
  const handleSendClick = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage(""); // Limpa o input
    }
  };

  // Função para enviar com "Enter"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  // Condição de desativação: (bloqueado PELA REGRA DE 24H) OU (bloqueado PELA IA)
  const isInputDisabled = isBlocked || !isAiPaused;

  return (
    <S.Container className={className}>
      <S.Header>
        <S.Name>{chat.username ? `@${chat.username}` : (chat.name || "Visitante")}</S.Name>
        <S.PauseButton
          $isPaused={isAiPaused}
          onClick={() => setIsAiPaused(!isAiPaused)}
        >
          {isAiPaused ? "Reativar IA" : "Pausar IA"}
        </S.PauseButton>
      </S.Header>
      <S.MessagesArea>
        {chat.messages.map((msg) => {
          const time = msg.dateCreated.toLocaleTimeString([], {
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
      
      {/* --- ÁREA DE INPUT ATUALIZADA --- */}
      <S.InputArea>
        <S.InputWrapper>
          <S.Input
            placeholder={placeholderText}
            disabled={isInputDisabled}
            value={newMessage}
            // --- CORREÇÃO AQUI ---
            onChange={(e) => setNewMessage(e.target.value)}
            // --- FIM DA CORREÇÃO ---
            onKeyDown={handleKeyDown}
          />
          <S.SendButton 
            // Desativa se o input estiver desabilitado OU se não houver texto
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