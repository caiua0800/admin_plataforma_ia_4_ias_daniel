import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircleIcon,
  ClockIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";
import * as S from "./Dashboard.styles";
import { InstagramIcon } from "../LeadsInstagram/InstagramIcon";

// --- DADOS SIMULADOS (MOCKED DATA) ---
const leadsInstagramToday = 21;
const leadsWebsiteToday = 12;
const totalLeadsToday = leadsInstagramToday + leadsWebsiteToday;

const aiUsersWeekly = 482;
const supportTicketsFromAI = 73;
const ticketsResolved = 58;
const ticketsInProgress = supportTicketsFromAI - ticketsResolved;

// Dados e Cores para o Gráfico de Rosca (Chamados)
const ticketsChartData = [
  { name: "Resolvidos", value: ticketsResolved },
  { name: "Em Andamento", value: ticketsInProgress },
];
const PIE_CHART_COLORS = ["#06b6d4", "#a855f7"];

// Dados para o nosso GRÁFICO CUSTOMIZADO (Leads da Semana)
const weeklyLeadsData = [
    { label: "Seg", value: 45 }, { label: "Ter", value: 62 },
    { label: "Qua", value: 55 }, { label: "Qui", value: 81 },
    { label: "Sex", value: 74 }, { label: "Sáb", value: 98 },
    { label: "Dom", value: 68 },
];

// --- COMPONENTES ---

const CustomBarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const maxValue = data.length > 0 ? Math.max(...data.map(item => item.value)) : 0;
  return (
    <S.CustomChartContainer>
      {data.map((item, index) => {
        const barHeight = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
        return (
          <S.BarWrapper key={index}>
            <S.BarValue>{item.value}</S.BarValue>
            <S.BarContainer>
              <S.Bar style={{ height: `${barHeight}%` }} />
            </S.BarContainer>
            <S.BarLabel>{item.label}</S.BarLabel>
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

// --- COMPONENTE PRINCIPAL DA DASHBOARD ---
export function Dashboard() {
  return (
    // NOVO WRAPPER PARA CENTRALIZAÇÃO
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

            <S.TopMetricsGrid>
               <MetricCard icon={<ArrowTrendingUpIcon />} title="Total de Leads (Hoje)" value={totalLeadsToday} />
               <MetricCard icon={<ComputerDesktopIcon />} title="Usuários da IA (Semana)" value={aiUsersWeekly} />
               <MetricCard icon={<ClockIcon />} title="Chamados em Andamento" value={ticketsInProgress} />
            </S.TopMetricsGrid>

            <S.MainContentGrid>
              <S.LeadsSection>
                <S.SubGrid>
                   <MetricCard icon={<InstagramIcon />} title="Leads Instagram" value={leadsInstagramToday} />
                   <MetricCard icon={<GlobeAltIcon />} title="Leads Website" value={leadsWebsiteToday} />
                </S.SubGrid>
                <S.ChartBox>
                  <S.SectionTitle>Performance de Leads (Semana)</S.SectionTitle>
                  <CustomBarChart data={weeklyLeadsData} />
                </S.ChartBox>
              </S.LeadsSection>

              <S.ChartBox>
                <S.SectionTitle>Status dos Chamados ({supportTicketsFromAI} total)</S.SectionTitle>
                <S.SupportTicketsWrapper>
                  <S.SupportChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={ticketsChartData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value" stroke="none">
                          {ticketsChartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: "rgba(10, 20, 40, 0.9)", borderColor: "rgba(255, 255, 255, 0.2)", borderRadius: "12px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </S.SupportChartContainer>
                  <S.SupportDataList>
                    <S.SupportDataItem>
                      <S.DataLabel>
                        <S.ColorDot $color={PIE_CHART_COLORS[0]} />
                        Resolvidos
                      </S.DataLabel>
                      <S.DataValue>{ticketsResolved}</S.DataValue>
                    </S.SupportDataItem>
                     <S.SupportDataItem>
                      <S.DataLabel>
                        <S.ColorDot $color={PIE_CHART_COLORS[1]} />
                        Em Andamento
                      </S.DataLabel>
                      <S.DataValue>{ticketsInProgress}</S.DataValue>
                    </S.SupportDataItem>
                  </S.SupportDataList>
                </S.SupportTicketsWrapper>
              </S.ChartBox>
            </S.MainContentGrid>
          </S.InnerWrapper>
        </S.GlassGap>
      </S.OuterBorder>
    </S.PageContainer>
  );
}