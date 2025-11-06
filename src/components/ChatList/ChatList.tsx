import * as S from "./ChatList.styles";
interface Chat {
  id: string;
  name?: string;
  lastMessageTest: string;
  dateCreated: Date;
}
interface ChatListProps<T extends Chat> {
  chats: T[];
  selectedChatId: string | null;
  onSelectChat: (chat: T) => void;
}

export function ChatList<T extends Chat>({
  chats,
  selectedChatId,
  onSelectChat,
}: ChatListProps<T>) {
  return (
    <S.Container>
      {" "}
      {chats.map((chat) => (
        <S.ChatItem
          key={chat.id}
          $isActive={selectedChatId === chat.id}
          onClick={() => onSelectChat(chat)}
        >
          {" "}
          <S.Info>
            {" "}
            <S.Name>{chat.name || "Visitante"}</S.Name>{" "}
            <S.DateText>{chat.dateCreated.toLocaleDateString()}</S.DateText>{" "}
          </S.Info>{" "}
          <S.LastMessage>{chat.lastMessageTest}</S.LastMessage>{" "}
        </S.ChatItem>
      ))}{" "}
    </S.Container>
  );
}
