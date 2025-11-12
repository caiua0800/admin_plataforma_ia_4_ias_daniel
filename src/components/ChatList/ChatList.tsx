// src/components/ChatList/ChatList.tsx
import * as S from "./ChatList.styles";

interface Chat {
  id: string;
  name?: string;
  username?: string;
  avatarUrl?: string;
  cpf?: string;
  lastMessageTest: string;
  dateCreated: Date;
}

interface ChatListProps<T extends Chat> {
  chats: T[];
  selectedChatId: string | null;
  onSelectChat: (chat: T) => void;
  headerComponent?: React.ReactNode;
  className?: string; // <-- 1. ADICIONE ISSO
}

export function ChatList<T extends Chat>({
  chats,
  selectedChatId,
  onSelectChat,
  headerComponent,
  className, // <-- 2. ADICIONE ISSO
}: ChatListProps<T>) {
  // ... (função formatChatDate)
  const formatChatDate = (date: Date) => {
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { day: "2-digit", month: "2-digit" });
  };

  return (
    <S.Container className={className}> {/* <-- 3. ADICIONE AQUI */}
      {headerComponent}
      {chats.map((chat) => (
        <S.ChatItem
          key={chat.id}
          $isActive={selectedChatId === chat.id}
          onClick={() => onSelectChat(chat)}
        >
          <S.Avatar
            src={
              chat.avatarUrl ||
              `https://ui-avatars.com/api/?name=${
                chat.name || "User"
              }&background=4f46e5&color=fff`
            }
            alt={chat.name || chat.username}
          />
          <S.Content>
            <S.Info>
              <S.Name>{chat.username ? `@${chat.username}` : chat.name}</S.Name>
              <S.DateText>{formatChatDate(chat.dateCreated)}</S.DateText>
            </S.Info>
            <S.LastMessage>
              {chat.cpf || chat.lastMessageTest}
            </S.LastMessage>
          </S.Content>
        </S.ChatItem>
      ))}
    </S.Container>
  );
}