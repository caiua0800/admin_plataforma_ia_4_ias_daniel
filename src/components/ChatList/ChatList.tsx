// src/components/ChatList/ChatList.tsx
import * as S from "./ChatList.styles";
import type { BaseChat } from "../../types"; // Importando o tipo Base

// Aceita qualquer coisa que estenda BaseChat
interface ChatListProps<T extends BaseChat> {
  chats: T[];
  selectedChatId: string | null;
  onSelectChat: (chat: T) => void;
  headerComponent?: React.ReactNode;
  className?: string;
}

export function ChatList<T extends BaseChat>({
  chats,
  selectedChatId,
  onSelectChat,
  headerComponent,
  className,
}: ChatListProps<T>) {
  
  const formatChatDate = (dateInput: Date | string | undefined) => {
    if (!dateInput) return "";
    
    const dateObj = new Date(dateInput); 
    if (isNaN(dateObj.getTime())) {
      return "--:--"; 
    }
    
    const now = new Date();
    if (dateObj.toDateString() === now.toDateString()) {
      return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return dateObj.toLocaleDateString([], { day: "2-digit", month: "2-digit" });
  };

  return (
    <S.Container className={className}>
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
                chat.username || chat.name || "User"
              }&background=4f46e5&color=fff`
            }
            alt={chat.name || chat.username}
          />
          <S.Content>
            <S.Info>
              <S.Name>{chat.username ? `@${chat.username}` : (chat.name || chat.id)}</S.Name>
              <S.DateText>{formatChatDate(chat.last_message_date || chat.dateCreated)}</S.DateText>
            </S.Info>

            {(typeof chat.followers_count === 'number' || chat.follows_me) && (
              <S.MetaRow>
                {typeof chat.followers_count === 'number' && (
                  <S.FollowerCount>
                    {chat.followers_count.toLocaleString('pt-BR')} seguidores
                  </S.FollowerCount>
                )}
                {chat.follows_me && (
                  <S.FollowsMeBadge>Segue você</S.FollowsMeBadge>
                )}
              </S.MetaRow>
            )}
            
            <S.LastMessage>
              {(chat as any).cpf || chat.lastMessageText} 
            </S.LastMessage>
          </S.Content>
           
           {chat.hasUnread && selectedChatId !== chat.id && (
             <S.NotificationBadge />
           )}
           
        </S.ChatItem>
      ))}
    </S.Container>
  );
}