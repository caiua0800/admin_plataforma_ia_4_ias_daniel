// src/servers/apiClient.ts
import { refreshAccessToken, logout } from './authApi';

// A URL base da sua API
const BASE_URL = "https://65b10343b15c.ngrok-free.app/webhook/";

// Esta trava impede que 10 chamadas de API falhem ao mesmo tempo
// e tentem dar 'refresh' 10 vezes. Apenas a primeira tenta.
let isRefreshing = false;

/**
 * Wrapper 'fetch' que gerencia automaticamente a autenticação JWT
 * e a renovação do token para TODAS AS ROTAS DE DADOS.
 * (Não deve ser usado por authApi.ts para evitar loops)
 */
const apiFetch = async (path: string, options: RequestInit = {}) => {
  let accessToken = localStorage.getItem('accessToken');

  // Adiciona o token JWT (Bearer) e headers padrões
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${accessToken}`);
  headers.set('Content-Type', 'application/json');
  headers.set('ngrok-skip-browser-warning', 'true');
  
  options.headers = headers;

  // --- 1. Tenta a requisição original ---
  let response = await fetch(BASE_URL + path, options);

  // --- 2. Verifica se o token expirou (Erro 401) e se já não está renovando ---
  if (response.status === 401 && !isRefreshing) {
    isRefreshing = true; // Trava para que outras chamadas não tentem
    console.warn("apiClient: Token de acesso expirado. Tentando renovar...");

    try {
      // --- 3. Tenta renovar o token ---
      // 'refreshAccessToken' salva os novos tokens no localStorage
      const newAccessToken = await refreshAccessToken(); 
      
      console.log("apiClient: Token renovado com sucesso. Tentando requisição original...");

      // --- 4. Tenta a requisição original NOVAMENTE com o novo token ---
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      options.headers = headers;
      response = await fetch(BASE_URL + path, options);
      
    } catch (refreshError) {
      // Se a *renovação* falhar (ex: refresh token também expirou)
      console.error("apiClient: Falha ao renovar token. Deslogando.", refreshError);
      logout(); // Desloga o usuário
      throw new Error('Sua sessão expirou. Por favor, faça login novamente.');
    } finally {
      isRefreshing = false; // Libera a trava
    }
  }

  // --- 5. Trata outros erros (ex: 404, 500) ---
  // Se a resposta AINDA não estiver OK (ex: o refresh falhou e deu 401 de novo)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Tenta ler o erro
    throw new Error(errorData.error || `Erro na API: ${response.statusText}`);
  }

  // --- 6. Retorna a resposta JSON em caso de sucesso ---
  
  // Se a resposta for 204 (No Content), não há JSON para 'parsear'
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

export default apiFetch;