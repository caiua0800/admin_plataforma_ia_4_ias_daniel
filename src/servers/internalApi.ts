// Usamos a mesma URL base e chave do seu servidor do Instagram
const BASE_URL = "https://65b10343b15c.ngrok-free.app/webhook/";
const API_KEY = "minha_chave_de_api";

/**
 * Gera o cabeçalho de autorização Basic Auth.
 */
const getAuthHeader = () => {
  const credentials = btoa(`X-API-KEY:${API_KEY}`);
  return `Basic ${credentials}`; 
};

/**
 * Envia uma pergunta para a API de relatórios internos.
 * Retorna a string da resposta.
 */
export const askInternalApi = async (question: string): Promise<string> => {
  const body = {
    question: question
  };

  try {
    const response = await fetch(`${BASE_URL}api/internal-report`, {
      method: 'POST',
      headers: {
        "Authorization": getAuthHeader(),
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    // Retorna a string de resposta da API
    return data.response; 

  } catch (error) {
    console.error("Falha em askInternalApi:", error);
    throw error; // Repassa o erro para o componente tratar
  }
};