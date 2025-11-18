// src/types/index.ts
export interface Message {
  id: string;
  message: string;
  dateCreated: Date;
  isReply: boolean;
  senderName?: string;
}
export interface LeadInstagram {
  id: string;
  name?: string;
  username: string; 
  avatarUrl?: string; 
  status?: number;
  lastMessageText: string; 
  last_message_date: Date | string;
  dateCreated: Date;
  messages: Message[];
  
  followers_count?: number;
  follows_me?: boolean;
  hasUnread?: boolean; 
  lastClientMessageDate?: Date; 

  currentPage?: number;     
  hasMoreMessages?: boolean; 
  
  // --- CAMPO ADICIONADO ---
  is_blocked?: boolean; // Indica se a IA está pausada para este chat
}
// ... (o restante do arquivo permanece igual)
export interface LeadWebsite {
  id: string;
  name?: string;
  status?: number;
  lastMessageText: string;
  dateCreated: Date;
  city?: string;
  ipAddress?: string;
  messages: Message[];
}
export interface ClientPlataformaApp {
  id: string;
  name: string;
  email: string;
  cpf: string;
  status?: number;
  lastMessageText: string;
  dateCreated: Date;
  messages: Message[];
}
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface Chamado {
  id: string;
  leadId: string;
  name: string;
  cpf: string;
  descricao: string;
  dateCreated: Date;
}

export interface InstagramStats {
  total_chats: string;
  active_today_chats: string;
}