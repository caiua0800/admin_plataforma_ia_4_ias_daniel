import { useState } from "react";
import { mockedLeadsWebsite } from "../../api/mockedData";
import { LeadWebsite as LeadWebsiteType } from "../../types";
import { ChatLayout } from "../../components/ChatLayout/ChatLayout";
import { ChatList } from "../../components/ChatList/ChatList";
import { ChatWindow } from "../../components/ChatWindow/ChatWindow";

export function LeadsWebsite() {
  const [selectedChat, setSelectedChat] = useState<LeadWebsiteType | null>(
    null
  );
  return (
    <ChatLayout>
      {" "}
      <ChatList
        chats={mockedLeadsWebsite}
        selectedChatId={selectedChat?.id || null}
        onSelectChat={(chat) => setSelectedChat(chat)}
      />{" "}
      <ChatWindow chat={selectedChat} showInput={false} />{" "}
    </ChatLayout>
  );
}
