// src/servers/instagram.ts
import apiFetch from './apiClient'; // 1. Importar o novo cliente centralizado
import type {
  LeadInstagram,
  Message,
  InstagramStats,
} from "../types";
// Importa o tipo da resposta das mensagens
import { MessagesResponse } from "./instagramTypes"; // (Vamos criar este arquivinho)

// 2. Lógica de validação (sem alteração)
const getValidString = (value: any): string | undefined => {
  if (typeof value === 'string' && value !== "undefined" && value !== "false") {
    return value;
  }
  return undefined;
};

/**
 * Busca os chats do Instagram.
 */
export const getInstagramChats = async (page = 1): Promise<LeadInstagram[]> => {
  try {
    // 3. Usa apiFetch (que já tem o token)
    const data = await apiFetch(`api/chats?tipo=instagram&page=${page}`, {
      method: 'GET'
    });

    // 4. A lógica de mapeamento dos dados continua a mesma
    const chats: LeadInstagram[] = data.map((item: any) => ({
      id: item.json.id,
      lastMessageText: item.json.last_message_text,
      last_message_date: item.json.last_message_date,
      dateCreated: new Date(item.json.date_created),
      username: item.json.username, 
      avatarUrl: getValidString(item.json.profile_picture),
      name: getValidString(item.json.name),
      followers_count: item.json.followers_count,
      follows_me: item.json.follows_me,
      messages: [], 
    }));

    return chats;

  } catch (error) {
    console.error("Falha em getInstagramChats:", error);
    // Relança o erro para o apiClient/componente tratar
    throw error;
  }
};

/**
 * Busca as estatísticas de chats do Instagram.
 */
export const getInstagramStats = async (): Promise<InstagramStats> => {
  try {
    // 3. Usa apiFetch
    const data = await apiFetch(`api/stats?tipo=instagram`, {
      method: 'GET'
    });
    return data;
  } catch (error) {
    console.error("Falha em getInstagramStats:", error);
    // Retorna um fallback em caso de erro
    return { total_chats: "0", active_today_chats: "0" };
  }
};

/**
 * Busca as mensagens de um chat específico do Instagram.
 */
export const getInstagramMessages = async (chatId: string, page = 1): Promise<MessagesResponse> => {
  // O ID do path parece ser estático para esta rota
  const API_PATH_ID = "a5759361-2234-4ec2-b75e-890e86a917b3";
  
  try {
    // 3. Usa apiFetch
    const data: any[] = await apiFetch(`${API_PATH_ID}/api/chats/instagram/${chatId}/messages?page=${page}`, {
      method: 'GET'
    });

    // 4. A lógica de mapeamento dos dados continua a mesma
    data.sort((a, b) => {
      const dateA = new Date(a.json.date_created).getTime();
      const dateB = new Date(b.json.date_created).getTime();
      if (dateA !== dateB) {
        return dateA - dateB;
      }
      return (a.json.is_reply ? 1 : 0) - (b.json.is_reply ? 1 : 0);
    });

    const messages: Message[] = data.map((item: any) => ({
      id: item.json.id.toString(),
      message: item.json.message,
      isReply: item.json.is_reply,
      senderName: item.json.sender_name,
      dateCreated: new Date(item.json.date_created),
    }));

    const lastClientMessage = [...messages].reverse().find(m => !m.isReply);

    return {
      messages: messages,
      lastClientMessageDate: lastClientMessage ? lastClientMessage.dateCreated : undefined,
    };

  } catch (error) {
    console.error(`Falha em getInstagramMessages (chatId: ${chatId}):`, error);
    throw error;
  }
};

/**
 * Envia uma mensagem pelo Instagram.
 */
export const sendInstagramMessage = async (chatId: string, message: string): Promise<Message> => {
  const body = {
    tipo: "instagram",
    chat_id: chatId,
    mensagem: message,
    isInstagram: true
  };

  try {
    // 3. Usa apiFetch
    const data = await apiFetch(`api/message/send`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    // 4. A lógica de mapeamento dos dados continua a mesma
    if (data && data.json) {
      return {
        id: data.json.id.toString(),
        message: data.json.message,
        isReply: data.json.is_reply,
        senderName: data.json.sender_name,
        dateCreated: new Date(data.json.date_created),
      };
    }

    // Fallback (se a API não retornar a mensagem)
    return {
      id: `local-${Date.now()}`,
      message: message,
      isReply: true,
      senderName: "Atendente",
      dateCreated: new Date(),
    };
  } catch (error) {
    console.error("Falha ao enviar mensagem:", error);
    throw error;
  }
};