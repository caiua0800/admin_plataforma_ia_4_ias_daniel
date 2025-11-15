// src/servers/authApi.ts

const BASE_URL = "https://65b10343b15c.ngrok-free.app/webhook/";
const API_KEY = "minha_chave_de_api"; // <-- Verifique se esta chave está correta

/**
 * Gera o cabeçalho de autorização Basic Auth (X-API-KEY)
 */
const getStaticAuthHeader = () => {
  const credentials = btoa(`X-API-KEY:${API_KEY}`);
  return `Basic ${credentials}`;
};

/**
 * Função centralizada para deslogar o usuário e limpar o localStorage.
 */
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login'; 
};

/**
 * Tenta autenticar o usuário na API.
 */
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}api/users/login`, {
    method: "POST",
    headers: {
      // --- ESTA É A CORREÇÃO CRÍTICA ---
      // Adiciona a autenticação estática da API
      "Authorization": getStaticAuthHeader(), 
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ email, password }),
  });

  // Lógica robusta para tratar a resposta (JSON ou Texto)
  if (!response.ok) {
    let errorMessage = "Falha na autenticação";
    try {
      // Tenta ler o erro como JSON (ex: { "error": "Senha inválida" })
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // Se falhar (pq é texto, como "Unauthorized"), lê como TEXTO.
      try {
        errorMessage = await response.text();
      } catch (textError) {
        errorMessage = response.statusText; // ex: "Unauthorized"
      }
    }
    // Lança o erro para o Login.tsx capturar
    throw new Error(errorMessage);
  }

  // Se a resposta foi OK (200)
  const data = await response.json();
  
  if (!data.accessToken || !data.refreshToken) {
    throw new Error("Resposta de login inválida. Faltando tokens.");
  }

  // Salva os tokens no localStorage para a sessão persistir
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  
  return data;
};

/**
 * Chama a API para renovar o Access Token.
 */
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error("Nenhum refresh token encontrado.");
  }
  
  const response = await fetch(`${BASE_URL}api/users/refresh-token`, {
    method: "POST",
    headers: {
      "Authorization": getStaticAuthHeader(), // Rota de refresh também precisa
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Refresh token inválido ou expirado. Deslogando.");
    logout(); 
    throw new Error(data.error || "Sessão expirada");
  }

  if (!data.accessToken || !data.refreshToken) {
    throw new Error("Resposta de refresh token inválida");
  }

  // Salva os NOVOS tokens
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  
  return data.accessToken; 
};


// --- Funções de Usuário (Registro) ---
export interface RegisterResult {
  success: boolean;
  message?: string;
  data?: any;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResult> => {
  
  const response = await fetch(`${BASE_URL}api/users/register`, {
    method: "POST",
    headers: {
      "Authorization": getStaticAuthHeader(), // Rota de registro também precisa
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ name, email, password }),
  });

  // Lógica de erro robusta
  if (!response.ok) {
    let errorMessage = "Erro ao registrar";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      errorMessage = await response.text();
    }
    return { success: false, message: errorMessage };
  }

  const data = await response.json();
  return { success: true, data: data };
};