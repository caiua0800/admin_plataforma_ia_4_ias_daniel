// src/types/index.ts

export interface Message {
  id: string;
  message: string;
  dateCreated: Date;
  isReply: boolean;
  senderName?: string;
}

// Base comum para facilitar a compatibilidade
export interface BaseChat {
  id: string;
  name?: string;
  username?: string; // Opcional em todos
  avatarUrl?: string;
  status?: number;
  lastMessageText: string; // Corrigido de Test para Text se necessário, mantendo consistência
  last_message_date?: Date | string; // Opcional/Compatibilidade
  dateCreated: Date;
  messages: Message[];
  
  followers_count?: number;
  follows_me?: boolean;
  hasUnread?: boolean;
  lastClientMessageDate?: Date;
  
  currentPage?: number;
  hasMoreMessages?: boolean;
  is_blocked?: boolean;
}

export interface LeadInstagram extends BaseChat {
  // Propriedades específicas do Instagram já estão no BaseChat como opcionais
}

export interface LeadWebsite extends BaseChat {
  city?: string;
  ipAddress?: string;
}

export interface ClientPlataformaApp extends BaseChat {
  email: string;
  cpf: string;
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