// src/servers/instagram.ts
// 1. Importar o novo tipo
import type { LeadInstagram, Message, InstagramStats } from "../types";

const BASE_URL = "https://65b10343b15c.ngrok-free.app/webhook/";
const API_KEY = "minha_chave_de_api";

const getAuthHeader = () => {
  const credentials = btoa(`X-API-KEY:${API_KEY}`);
  return `Basic ${credentials}`; 
};

const getValidString = (value: any): string | undefined => {
  if (typeof value === 'string' && value !== "undefined" && value !== "false") {
    return value;
  }
  return undefined;
};


export const getInstagramChats = async (page = 1): Promise<LeadInstagram[]> => {
  // ... (código da função sem alteração)
  try {
    const response = await fetch(`${BASE_URL}api/chats?tipo=instagram&page=${page}`, {
      headers: {
        "Authorization": getAuthHeader(),
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar chats: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data)

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
    throw error;
  }
};

// --- 2. NOVA FUNÇÃO ADICIONADA ---
/**
 * Busca as estatísticas de chats do Instagram.
 */
export const getInstagramStats = async (): Promise<InstagramStats> => {
  try {
    const response = await fetch(`${BASE_URL}api/stats?tipo=instagram`, {
      headers: {
        "Authorization": getAuthHeader(),
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar estatísticas: ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Falha em getInstagramStats:", error);
    // Retorna um fallback em caso de erro
    return { total_chats: "0", active_today_chats: "0" };
  }
};
// --- FIM DA NOVA FUNÇÃO ---


export interface MessagesResponse {
  messages: Message[];
  lastClientMessageDate?: Date;
}

export const getInstagramMessages = async (chatId: string, page = 1): Promise<MessagesResponse> => {
  // ... (código da função sem alteração)
  const API_PATH_ID = "a5759361-2234-4ec2-b75e-890e86a917b3";
  
  try {
    const response = await fetch(`${BASE_URL}${API_PATH_ID}/api/chats/instagram/${chatId}/messages?page=${page}`, {
      headers: {
        "Authorization": getAuthHeader(),
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar mensagens: ${response.statusText}`);
    }

    const data: any[] = await response.json();

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

export const sendInstagramMessage = async (chatId: string, message: string): Promise<Message> => {
  // ... (código da função sem alteração)
  const body = {
    tipo: "instagram",
    chat_id: chatId,
    mensagem: message,
    isInstagram: true
  };

  const response = await fetch(`${BASE_URL}api/message/send`, {
    method: 'POST',
    headers: {
      "Authorization": getAuthHeader(),
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar mensagem");
  }

  const data = await response.json();

  if (data && data.json) {
    return {
      id: data.json.id.toString(),
      message: data.json.message,
      isReply: data.json.is_reply,
      senderName: data.json.sender_name,
      dateCreated: new Date(data.json.date_created),
    };
  }

  return {
    id: `local-${Date.now()}`,
    message: message,
    isReply: true,
    senderName: "Atendente",
    dateCreated: new Date(),
  };
};