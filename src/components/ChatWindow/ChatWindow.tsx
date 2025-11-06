import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import * as S from "./ChatWindow.styles";

interface Message {
  id: string;
  message: string;
  dateCreated: Date;
  isReply: boolean;
  senderName?: string;
}
interface Chat {
  id: string;
  name?: string;
  messages: Message[];
}
interface ChatWindowProps {
  chat: Chat | null;
  showInput: boolean;
}

export function ChatWindow({ chat, showInput }: ChatWindowProps) {
  const [isAiPaused, setIsAiPaused] = useState(false);

  if (!chat) {
    return (
      <S.Placeholder>
        <p>Selecione uma conversa para visualizar</p>
      </S.Placeholder>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Name>{chat.name || "Visitante"}</S.Name>
        {showInput && (
          <S.PauseButton
            $isPaused={isAiPaused}
            onClick={() => setIsAiPaused(!isAiPaused)}
          >
            {" "}
            {isAiPaused ? "Reativar IA" : "Pausar IA"}{" "}
          </S.PauseButton>
        )}
      </S.Header>
      <S.MessagesArea>
        {chat.messages.map((msg) => (
          <S.MessageBox key={msg.id} $isReply={msg.isReply}>
            {" "}
            <S.MessageBubble $isReply={msg.isReply}>
              <p>{msg.message}</p>
            </S.MessageBubble>{" "}
          </S.MessageBox>
        ))}
      </S.MessagesArea>
      {showInput && (
        <S.InputArea>
          <S.InputWrapper>
            <S.Input
              placeholder={
                isAiPaused ? "Digite sua mensagem..." : "A IA está respondendo"
              }
              disabled={!isAiPaused}
            />
            <S.SendButton disabled={!isAiPaused}>
              <PaperAirplaneIcon width={24} height={24} />
            </S.SendButton>
          </S.InputWrapper>
        </S.InputArea>
      )}
    </S.Container>
  );
}
