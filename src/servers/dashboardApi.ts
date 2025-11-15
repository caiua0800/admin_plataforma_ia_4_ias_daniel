// src/servers/dashboardApi.ts
import apiFetch from './apiClient';

// Interface para um item no array de performance semanal
export interface WeeklyPerformanceItem {
  date: string; // "2025-11-09"
  leads_count: number;
}

// Interface para a resposta completa da API
export interface DashboardStats {
  instagram_leads_today: string;
  website_leads_today: string;
  total_leads_today: string;
  total_leads_this_month: string;
  total_chats_opened_today: string;
  weekly_performance: WeeklyPerformanceItem[];
}

/**
 * Busca as estatísticas da dashboard.
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    // Usa o apiFetch que já injeta o token JWT
    return await apiFetch('api/dashboard/stats', {
      method: 'GET',
    });
  } catch (error) {
    console.error("Falha em getDashboardStats:", error);
    throw error; // Repassa o erro para o componente tratar
  }
};