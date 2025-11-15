// src/pages/Dashboard/Dashboard.tsx
import { useState, useEffect } from "react";
import {
  // Tooltip não é mais usado com o gráfico de barras customizado, pode ser removido
  // ResponsiveContainer, // Também não é mais necessário para o CustomBarChart
} from "recharts";
import {
  GlobeAltIcon,
  UsersIcon, // NOVO: Ícone para "Total de Leads (Hoje)"
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  ShareIcon, // NOVO: Ícone para "Leads Instagram (Hoje)"
} from "@heroicons/react/24/solid";
import * as S from "./Dashboard.styles";
// REMOVIDO: O InstagramIcon customizado não será mais usado
// import { InstagramIcon } from "../LeadsInstagram/InstagramIcon"; 
import { 
  getDashboardStats, 
  DashboardStats, 
  WeeklyPerformanceItem 
} from "../../servers/dashboardApi";

// Helper para formatar a data "2025-11-09" para "Dom"
const getDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { weekday: 'short', timeZone: 'UTC' }).replace('.', '');
};

const CustomBarChart = ({ data }: { data: WeeklyPerformanceItem[] }) => {
  const maxValue = data.length > 0 ? Math.max(...data.map(item => item.leads_count)) : 0;
  
  const completeData = [...data];
  while (completeData.length < 7) {
    completeData.unshift({ date: `empty-${completeData.length}`, leads_count: 0 });
  }

  return (
    <S.CustomChartContainer>
      {completeData.map((item, index) => {
        const barHeight = maxValue > 0 ? (item.leads_count / maxValue) * 100 : 0;
        return (
          <S.BarWrapper key={item.date || index}>
            <S.BarValue>{item.leads_count}</S.BarValue>
            <S.BarContainer>
              <S.Bar style={{ height: `${barHeight}%` }} />
            </S.BarContainer>
            <S.BarLabel>{item.date.startsWith('empty') ? '-' : getDayOfWeek(item.date)}</S.BarLabel>
          </S.BarWrapper>
        );
      })}
    </S.CustomChartContainer>
  );
};

const MetricCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | number; }) => (
  <S.StatCard>
    <S.CardIcon>{icon}</S.CardIcon>
    <S.CardContent>
      <S.StatTitle>{title}</S.StatTitle>
      <S.StatValue>{value}</S.StatValue>
    </S.CardContent>
  </S.StatCard>
);

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Não foi possível carregar as estatísticas.");
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Carregando estatísticas...</div>;
    }

    if (error) {
      return <div style={{ color: '#f87171', textAlign: 'center', padding: '50px' }}>{error}</div>;
    }

    if (!stats) {
      return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Nenhum dado encontrado.</div>;
    }

    return (
      <>
        <S.TopMetricsGrid>
          {/* Ícone atualizado para "Total de Leads (Hoje)" */}
          <MetricCard icon={<UsersIcon />} title="Total de Leads (Hoje)" value={stats.total_leads_today} />
          <MetricCard icon={<ChatBubbleLeftRightIcon />} title="Chats Abertos (Hoje)" value={stats.total_chats_opened_today} />
          <MetricCard icon={<CalendarDaysIcon />} title="Total de Leads (Mês)" value={stats.total_leads_this_month} />
        </S.TopMetricsGrid>

        <S.MainContentGrid>
          <S.LeadsSection>
            <S.SubGrid>
              {/* Ícone atualizado para "Leads Instagram (Hoje)" */}
              <MetricCard icon={<ShareIcon />} title="Leads Instagram (Hoje)" value={stats.instagram_leads_today} />
              <MetricCard icon={<GlobeAltIcon />} title="Leads Website (Hoje)" value={stats.website_leads_today} />
            </S.SubGrid>
            <S.ChartBox>
              <S.SectionTitle>Performance de Leads (Semana)</S.SectionTitle>
              <CustomBarChart data={stats.weekly_performance} />
            </S.ChartBox>
          </S.LeadsSection>
        </S.MainContentGrid>
      </>
    );
  };

  return (
    <S.PageContainer>
      <S.OuterBorder>
        <S.GlassGap>
          <S.InnerWrapper>
            <S.Header>
              <S.Title>Painel de Controle</S.Title>
              <S.Select>
                <option>Esta semana</option>
                <option>Hoje</option>
                <option>Este mês</option>
              </S.Select>
            </S.Header>

            {renderContent()}

          </S.InnerWrapper>
        </S.GlassGap>
      </S.OuterBorder>
    </S.PageContainer>
  );
}