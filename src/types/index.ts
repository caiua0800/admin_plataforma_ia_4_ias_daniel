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
  username: string; // O @
  avatarUrl?: string; // URL da foto de perfil (pode ser undefined)
  status?: number;
  lastMessageText: string; 
  last_message_date: Date | string;
  dateCreated: Date;
  messages: Message[];
  
  followers_count?: number;
  follows_me?: boolean;
  hasUnread?: boolean; // Para a notificação
  lastClientMessageDate?: Date; // Para a regra de 24h

  // --- CAMPOS ADICIONADOS ---
  currentPage?: number;     // Rastreia a última página carregada
  hasMoreMessages?: boolean; // Indica se há mais páginas para buscar
}
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
  leadId: string; // Para vincular ao LeadInstagram
  name: string;
  cpf: string;
  descricao: string;
  dateCreated: Date;
}

export interface InstagramStats {
  total_chats: string;
  active_today_chats: string;
}