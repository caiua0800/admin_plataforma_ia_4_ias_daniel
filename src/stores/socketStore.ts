// src/stores/socketStore.ts
import { create } from 'zustand';

// 1. Define o formato do chatData (snake_case, como vem da API/Socket)
interface SocketChatData {
  id: string;
  last_message_date: string; 
  last_message_text: string;
  user_message?: string; // <-- CAMPO ADICIONADO (opcional)
  date_created: string;
  username: string;
  profile_picture: string;
  name: string | boolean;
  followers_count: number;
  follows_me: boolean;
  // Adicione quaisquer outros campos que o chatData possa ter
}

// 2. Define o formato do evento que vem do WebSocket
export interface SocketEventPayload {
  event: 'chat_updated' | 'new_message'; // Garante que ambos os eventos sejam aceitos
  platform: 'instagram' | 'website' | 'platform';
  chatData: SocketChatData;
}

// 3. Define o estado da nossa store
interface SocketState {
  latestEvent: SocketEventPayload | null;
  setLatestEvent: (event: SocketEventPayload | null) => void; // Garante que null seja aceito
}

// 4. Cria a store
export const useSocketStore = create<SocketState>((set) => ({
  latestEvent: null,
  setLatestEvent: (event) => set({ latestEvent: event }),
}));