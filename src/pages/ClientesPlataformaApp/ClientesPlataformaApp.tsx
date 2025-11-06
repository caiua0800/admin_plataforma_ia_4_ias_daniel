import { useState } from "react";
import { mockedClientsPlataformaApp } from "../../api/mockedData";
import { ClientPlataformaApp as ClientType } from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";
import { ChatList } from "../../components/ChatList/ChatList";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

export function ClientesPlataformaApp() {
  const [selectedChat, setSelectedChat] = useState<ClientType | null>(null);
  return (
    <ChatLayout>
      {" "}
      <ChatList
        chats={mockedClientsPlataformaApp}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={(chat) => setSelectedChat(chat)}
      />{" "}
      <ChatWindow chat={selectedChat} showInput={true} />{" "}
    </ChatLayout>
  );
}
