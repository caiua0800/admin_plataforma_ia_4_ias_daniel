// src/components/ChatList/ChatList.tsx
import * as S from "./ChatList.styles";
import type { LeadInstagram } from "../../types"; // Importando o tipo principal

// 1. Usa a interface importada (LeadInstagram) em vez de uma local duplicada
//    Isso garante que 'last_message_date' e 'lastMessageText' estejam corretos.
interface ChatListProps<T extends LeadInstagram> {
  chats: T[];
  selectedChatId: string | null;
  onSelectChat: (chat: T) => void;
  headerComponent?: React.ReactNode;
  className?: string;
}

export function ChatList<T extends LeadInstagram>({
  chats,
  selectedChatId,
  onSelectChat,
  headerComponent,
  className,
}: ChatListProps<T>) {
  
  // --- CORREÇÃO AQUI (Para o crash da data) ---
  const formatChatDate = (dateInput: Date | string) => {
    // 1. Garante que estamos trabalhando com um objeto Date
    const dateObj = new Date(dateInput); 
    
    // 2. Checa se a data é válida
    if (isNaN(dateObj.getTime())) {
      return "--:--"; // Fallback se a data for inválida
    }
    
    const now = new Date();
    
    // 3. Compara usando o objeto Date
    if (dateObj.toDateString() === now.toDateString()) {
      return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return dateObj.toLocaleDateString([], { day: "2-digit", month: "2-digit" });
  };
  // --- FIM DA CORREÇÃO ---

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
              {/* 4. Passa a data (string ou Date) para a função correta */}
              <S.DateText>{formatChatDate(chat.last_message_date)}</S.DateText>
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
            
            {/* 5. Corrigido para 'lastMessageText' (do types/index.ts) */}
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