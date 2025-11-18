// src/servers/instagram.ts
import apiFetch from './apiClient'; 
import type {
  LeadInstagram,
  Message,
  InstagramStats,
} from "../types";
// Importa o tipo do arquivo que criamos acima
import { MessagesResponse } from "./instagramTypes"; 

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
    const data = await apiFetch(`api/chats?tipo=instagram&page=${page}`, {
      method: 'GET'
    });

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
      // Valores padrão para paginação
      currentPage: 0,
      hasMoreMessages: true,
    }));

    return chats;

  } catch (error) {
    console.error("Falha em getInstagramChats:", error);
    throw error;
  }
};

/**
 * Busca as estatísticas de chats do Instagram.
 */
export const getInstagramStats = async (): Promise<InstagramStats> => {
  try {
    const data = await apiFetch(`api/stats?tipo=instagram`, {
      method: 'GET'
    });
    return data;
  } catch (error) {
    console.error("Falha em getInstagramStats:", error);
    return { total_chats: "0", active_today_chats: "0" };
  }
};

/**
 * Busca as mensagens de um chat específico do Instagram.
 * Filtra as mensagens "%blocked_chat%".
 * Lida com respostas nulas da API (páginas que não existem).
 */
export const getInstagramMessages = async (chatId: string, page = 1): Promise<MessagesResponse> => {
  const API_PATH_ID = "a5759361-2234-4ec2-b75e-890e86a917b3";
  
  try {
    // data PODE ser 'null' se a API retornar 200 OK com corpo vazio (página > 10)
    const data: any[] | null = await apiFetch(`${API_PATH_ID}/api/chats/instagram/${chatId}/messages?page=${page}`, {
      method: 'GET'
    });

    // Se 'data' for nulo (API vazia) ou não for um array, retorna vazio.
    // Isso corrige o erro 'SyntaxError' e 'Unexpected end of JSON input'
    if (!data || !Array.isArray(data)) {
      console.log(`[getInstagramMessages] Página ${page} não retornou dados. Fim da paginação.`);
      return { messages: [], lastClientMessageDate: undefined };
    }

    // Ordena as mensagens
    data.sort((a, b) => {
      const dateA = new Date(a.json.date_created).getTime();
      const dateB = new Date(b.json.date_created).getTime();
      if (dateA !== dateB) {
        return dateA - dateB;
      }
      return (a.json.is_reply ? 1 : 0) - (b.json.is_reply ? 1 : 0);
    });

    // Filtra as mensagens "%blocked_chat%" ANTES de mapear
    const filteredData = data.filter((item: any) => {
      return item.json.message !== "%blocked_chat%";
    });

    // Mapeia apenas as mensagens filtradas
    const messages: Message[] = filteredData.map((item: any) => ({
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
    const data = await apiFetch(`api/message/send`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

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
  } catch (error) {
    console.error("Falha ao enviar mensagem:", error);
    throw error;
  }
};


/**
 * Bloqueia ou desbloqueia a IA para um chat específico.
 */
export const toggleChatBlock = async (chatId: string): Promise<any> => {
  const body = {
    chat_id: chatId,
  };

  try {
    // Usa o apiFetch (que já tem o token JWT)
    const data = await apiFetch(`api/chat/block`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    console.log("[toggleChatBlock] Ação de pause/reativar IA enviada com sucesso:", data);
    return data;
  } catch (error) {
    console.error("Falha ao bloquear/desbloquear chat:", error);
    throw error;
  }
};