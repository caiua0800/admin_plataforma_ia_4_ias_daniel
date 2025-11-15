// src/servers/internalApi.ts
import apiFetch from './apiClient'; // 1. Importar o cliente central (que usa o token JWT)

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
 * Esta função agora usa o apiFetch e, portanto, o token JWT.
 */
export const getInternalChats = async (): Promise<InternalChat[]> => {
  try {
    // 2. Usa o apiFetch
    return await apiFetch(`api/internal-chats`, {
      method: "GET",
    });
  } catch (error) {
    console.error("Falha em getInternalChats:", error);
    throw error; // Repassa o erro para o AppLayout/componente tratar
  }
};

/**
 * Busca as mensagens de um chat específico da IA Interna.
 */
export const getInternalChatMessages = async (
  chatId: string
): Promise<InternalMessageTurn[]> => {
  try {
    // 2. Usa o apiFetch
    return await apiFetch(
      `api/internal-chats/messages?chatId=${chatId}`,
      {
        method: "GET",
      }
    );
  } catch (error) {
    console.error("Falha em getInternalChatMessages:", error);
    throw error; // Repassa o erro
  }
};

/**
 * Envia uma pergunta para a API de relatórios internos.
 */
export const askInternalApi = async (
  question: string,
  chatId?: string | null
): Promise<{ response: string; chat_id: string }> => {
  
  // O corpo da requisição espera 'chatId' (camelCase)
  const body: { question: string; chatId?: string } = {
    question: question,
  };
  if (chatId) {
    body.chatId = chatId;
  }

  try {
    // 2. Usa o apiFetch
    const dataArray = await apiFetch(`api/internal-report`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    // 3. Lógica de tratamento da resposta (continua a mesma)
    
    // A API retorna um ARRAY: [ { response: "...", chatId: "..." } ]
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      console.error("Resposta da API inesperada:", dataArray);
      throw new Error("Formato de resposta da API de relatório inválido.");
    }

    const data = dataArray[0];

    // A API retorna 'chatId' (camelCase) na *resposta*
    if (!data || typeof data.response === "undefined" || typeof data.chatId === "undefined") {
      console.error("Objeto de resposta da API inválido:", data);
      throw new Error("Formato de resposta da API de relatório inválido.");
    }
    
    // Limpa o caractere "=" que a API pode retornar
    const cleanedChatId = data.chatId.startsWith("=")
      ? data.chatId.substring(1)
      : data.chatId;

    // Retorna o objeto no formato que o Relatorios.tsx espera (chat_id)
    return {
      response: data.response,
      chat_id: cleanedChatId,
    };
  } catch (error) {
    console.error("Falha em askInternalApi:", error);
    throw error; // Repassa o erro
  }
};