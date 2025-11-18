// src/stores/useChatActivityStore.ts
import { create } from 'zustand';

interface ChatActivityState {
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
}

export const useChatActivityStore = create<ChatActivityState>((set) => ({
  activeChatId: null,
  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
}));