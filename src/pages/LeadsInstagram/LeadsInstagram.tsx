import { useState } from "react";
import { mockedLeadsInstagram } from "../../api/mockedData";
import { LeadInstagram as LeadInstagramType } from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";
import { ChatList } from "../../components/ChatList/ChatList";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

export function LeadsInstagram() {
  const [selectedChat, setSelectedChat] = useState<LeadInstagramType | null>(
    null
  );
  return (
    <ChatLayout>
      {" "}
      <ChatList
        chats={mockedLeadsInstagram}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={(chat) => setSelectedChat(chat)}
      />{" "}
      <ChatWindow chat={selectedChat} showInput={true} />{" "}
    </ChatLayout>
  );
}
