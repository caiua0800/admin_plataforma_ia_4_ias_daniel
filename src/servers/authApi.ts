// src/servers/authApi.ts

const BASE_URL = import.meta.env.VITE_BASE_ROUTE;
const API_KEY = "minha_chave_de_api"; 

/**
 * Gera o cabeçalho de autorização Basic Auth (X-API-KEY)
 */
const getStaticAuthHeader = () => {
  const credentials = btoa(`X-API-KEY:${API_KEY}`);
  return `Basic ${credentials}`;
};

/**
 * Função centralizada para deslogar o usuário.
 */
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.dispatchEvent(new Event('auth-change')); 
};

/**
 * Tenta autenticar o usuário na API.
 */
export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}api/users/login`, {
    method: "POST",
    headers: {
      "Authorization": getStaticAuthHeader(), 
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errorMessage = "Falha na autenticação";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      try {
        errorMessage = await response.text();
      } catch (textError) {
        errorMessage = response.statusText;
      }
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  
  if (!data.accessToken || !data.refreshToken) {
    throw new Error("Resposta de login inválida. Faltando tokens.");
  }

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  
  window.dispatchEvent(new Event('auth-change'));
  
  return data;
};

/**
 * Chama a API para renovar o Access Token.
 * --- CORREÇÃO APLICADA AQUI ---
 */
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error("Nenhum refresh token encontrado.");
  }
  
  const response = await fetch(`${BASE_URL}api/users/refresh-token`, {
    method: "POST",
    headers: {
      "Authorization": getStaticAuthHeader(),
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ refreshToken }),
  });

  // 1. VERIFICA SE A RESPOSTA FOI BEM SUCEDIDA (ex: 200 OK) *ANTES* DE LER O JSON
  if (!response.ok) {
    console.error("Refresh token inválido ou expirado. Deslogando.");
    logout(); 
    
    // Tenta ler o erro do corpo da resposta
    const errorData = await response.json().catch(() => ({})); 
    throw new Error(errorData.error || "Sessão expirada");
  }

  // 2. AGORA que sabemos que está OK, tentamos ler o JSON
  let data;
  try {
     data = await response.json();
  } catch (error) {
    // Se cair aqui, é o erro 'SyntaxError: Unexpected end of JSON input'
    console.error("Erro ao parsear JSON do refresh-token (resposta provavelmente vazia):", error);
    logout(); // Desloga o usuário pois a API está inconsistente
    throw new Error("Resposta de autenticação inválida.");
  }
  
  // 3. Verifica se o JSON (que agora sabemos ser válido) tem os tokens
  if (!data.accessToken || !data.refreshToken) {
    logout(); // Limpa tokens se a resposta for inválida
    throw new Error("Resposta de refresh token inválida");
  }

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
      "Authorization": getStaticAuthHeader(),
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ name, email, password }),
  });

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