// src/servers/authApi.ts

// --- ALTERAÇÃO: Não precisamos mais do API_KEY aqui ---
export const BASE_URL = import.meta.env.VITE_BASE_ROUTE;
export const API_KEY = "minha_chave_de_api"; // Mantido caso outras funções precisem

/**
 * Gera o cabeçalho de autorização Basic Auth (X-API-KEY)
 */
export const getStaticAuthHeader = () => {
  const credentials = btoa(`X-API-KEY:${API_KEY}`);
  return `Basic ${credentials}`;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.dispatchEvent(new Event('auth-change')); 
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}api/users/login`, {
    method: "POST",
    headers: {
      // Login ainda usa a Chave de API estática
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

  if (!response.ok) {
    console.error("Refresh token inválido ou expirado. Deslogando.");
    logout(); 
    
    const errorData = await response.json().catch(() => ({})); 
    throw new Error(errorData.error || "Sessão expirada");
  }

  let data;
  try {
     data = await response.json();
  } catch (error) {
    console.error("Erro ao parsear JSON do refresh-token:", error);
    logout(); 
    throw new Error("Resposta de autenticação inválida.");
  }
  
  if (!data.accessToken || !data.refreshToken) {
    logout(); 
    throw new Error("Resposta de refresh token inválida");
  }

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  
  return data.accessToken; 
};

export interface RegisterResult {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Cadastra um novo usuário.
 * --- AGORA USA TOKEN JWT (Bearer Auth) ---
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResult> => {
  
  // Pega o token do admin logado (JWT)
  const accessToken = localStorage.getItem('accessToken'); 
  
  const response = await fetch(`${BASE_URL}api/users/register`, {
    method: "POST",
    headers: {
      // --- MUDANÇA: USANDO BEARER TOKEN ---
      "Authorization": `Bearer ${accessToken}`, 
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