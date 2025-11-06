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
  status?: number;
  lastMessageTest: string;
  dateCreated: Date;
  messages: Message[];
}
export interface LeadWebsite {
  id: string;
  name?: string;
  status?: number;
  lastMessageTest: string;
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
  lastMessageTest: string;
  dateCreated: Date;
  messages: Message[];
}
export interface User {
  id: string;
  name: string;
  email: string;
}
