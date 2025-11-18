// src/stores/useNotificationStore.ts
import { create } from 'zustand';

// Define o formato de uma notificação
export interface NotificationPayload {
  id: string; // ID único para a notificação (não o chat ID)
  chatId: string; // ID do chat para onde navegar
  platform: 'instagram' | 'website' | 'platform' | 'general';
  title: string; // Ex: "@username" ou "Novo Lead"
  message: string; // A prévia da mensagem
  profilePicture?: string; // <-- ADICIONADO AQUI
}

interface NotificationState {
  notifications: NotificationPayload[];
  addNotification: (notification: Omit<NotificationPayload, 'id'>) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  
  // Adiciona uma nova notificação com um ID único
  addNotification: (notificationData) => {
    const newNotification: NotificationPayload = {
      ...notificationData,
      id: `toast-${Date.now()}-${Math.random()}` // ID único
    };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));
  },

  // Remove uma notificação pelo seu ID único
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));