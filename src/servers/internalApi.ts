// src/servers/internalApi.ts
import apiFetch from './apiClient'; // 1. O 'apiFetch' AINDA é usado pelas outras funções (GET)

// --- NOVO: Adicionar constantes e helper para autenticação estática ---
// (Copiado de authApi.ts para ser usado APENAS pela função askInternalApi)
const BASE_URL = "https://65b10343b15c.ngrok-free.app/webhook/";
const API_KEY = "minha_chave_de_api"; // <-- Verifique se esta chave está correta

/**
 * Gera o cabeçalho de autorização Basic Auth (X-API-KEY)
 */
const getStaticAuthHeader = () => {
  const credentials = btoa(`X-API-KEY:${API_KEY}`);
  return `Basic ${credentials}`;
};
// --- FIM DA ADIÇÃO ---


// --- Tipos de Dados ---

/**
 * Define a estrutura de um chat vindo da API /internal-chats
 */
export interface InternalChat {
  id: string;
  name: string;
  created_by: string | null;
  date_created: string;
}

/**
 * Define a estrutura de um "turno" de mensagem da API
 * (Contém a pergunta do cliente e a resposta da IA)
 */
export interface InternalMessageTurn {
  id: number;
  client_message: string;
  ai_message: string;
  date_created: string; 
}

// --- Funções da API ---

/**
 * Busca o histórico de chats da IA Interna.
 * Esta função continua usando apiFetch (e o token JWT).
 */
export const getInternalChats = async (): Promise<InternalChat[]> => {
  try {
    return await apiFetch(`api/internal-chats`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Falha em getInternalChats:", error);
    throw error;
  }
};

/**
 * Busca as mensagens de um chat específico da IA Interna.
 * Esta função continua usando apiFetch (e o token JWT).
 */
export const getInternalChatMessages = async (
  chatId: string
): Promise<InternalMessageTurn[]> => {
  try {
    return await apiFetch(
      `api/internal-chats/messages?chatId=${chatId}`,
      {
        method: "GET",
      }
    );
  } catch (error) {
    console.error("Falha em getInternalChatMessages:", error);
    throw error;
  }
};

/**
 * Envia uma pergunta para a API de relatórios internos.
 * --- ESTA FUNÇÃO FOI MODIFICADA ---
 * Ela agora usa a Chave de API estática (Basic) e não o token JWT.
 */
export const askInternalApi = async (
  question: string,
  chatId?: string | null
): Promise<{ response: string; chat_id: string }> => {
  
  const body: { question: string; chatId?: string } = {
    question: question,
  };
  if (chatId) {
    body.chatId = chatId;
  }

  try {
    // --- MUDANÇA AQUI: Trocado 'apiFetch' por 'fetch' manual ---
    const response = await fetch(`${BASE_URL}api/internal-report`, {
      method: "POST",
      headers: {
        "Authorization": getStaticAuthHeader(), // <-- Usa a Chave de API estática
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    });

    // Adicionado tratamento de erro para o fetch manual
    if (!response.ok) {
      let errorMessage = "Erro na API de relatório";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }
    
    const dataArray = await response.json();
    // --- FIM DA MUDANÇA ---
    
    // A API retorna um ARRAY: [ { response: "...", chatId: "..." } ]
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      console.error("Resposta da API inesperada:", dataArray);
      throw new Error("Formato de resposta da API de relatório inválido.");
    }

    const data = dataArray[0];

    if (!data || typeof data.response === "undefined" || typeof data.chatId === "undefined") {
      console.error("Objeto de resposta da API inválido:", data);
      throw new Error("Formato de resposta da API de relatório inválido.");
    }
    
    const cleanedChatId = data.chatId.startsWith("=")
      ? data.chatId.substring(1)
      : data.chatId;

    return {
      response: data.response,
      chat_id: cleanedChatId,
    };
  } catch (error) {
    console.error("Falha em askInternalApi:", error);
    throw error;
  }
};