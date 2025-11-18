// src/servers/userApi.ts
import apiFetch from "./apiClient";
// Importamos as constantes e o helper de authApi
import { BASE_URL, getStaticAuthHeader } from "./authApi";

interface ChangePasswordParams {
  email: string;
  password?: string;
  new_password: string;
}

interface EditUserParams {
  id: string;
  name: string;
  email: string;
}

/**
 * Troca a senha do usuário.
 * --- ATUALIZADO: Usa Basic Auth (Chave de API) ---
 */
export const changeUserPassword = async (params: ChangePasswordParams) => {
  try {
    // Usamos fetch direto em vez de apiFetch para controlar o header Authorization
    const response = await fetch(`${BASE_URL}api/users/change-pass`, {
      method: "POST",
      headers: {
        "Authorization": getStaticAuthHeader(), // <-- Usa Basic Auth
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      let errorMessage = "Erro ao trocar senha";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = await response.text();
      }
      return { success: false, message: errorMessage };
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error: any) {
    console.error("Erro ao trocar senha:", error);
    return { success: false, message: error.message };
  }
};

/**
 * Edita um administrador.
 * Mantém o uso do apiFetch (Token JWT), a menos que essa rota também exija API Key.
 * (Geralmente edição de perfil usa Token, mas se precisar mudar avise)
 */
export const editUser = async ({ id, name, email }: EditUserParams) => {
  try {
    const data = await apiFetch(`api/users/actions?action=edit&id=${id}`, {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("Erro ao editar usuário:", error);
    return { success: false, message: error.message };
  }
};

/**
 * Exclui um administrador.
 */
export const deleteUser = async (id: string) => {
  try {
    const data = await apiFetch(`api/users/actions?action=delete&id=${id}`, {
      method: "POST",
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("Erro ao excluir usuário:", error);
    return { success: false, message: error.message };
  }
};