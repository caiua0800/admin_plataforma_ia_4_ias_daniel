import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  mockedLeadsInstagram,
  mockedLeadsWebsite,
  mockedClientsPlataformaApp,
} from "../../api/mockedData";
import * as S from "./Dashboard.styles";

// Dados para o gráfico de barras
const chartData = [
  { name: "Instagram", leads: mockedLeadsInstagram.length },
  { name: "Website", leads: mockedLeadsWebsite.length },
];

// Componente auxiliar para os cards de estatísticas
const Card = ({ title, value }: { title: string; value: string | number }) => (
  <S.StatCard>
    <S.StatTitle>{title}</S.StatTitle>
    <S.StatValue>{value}</S.StatValue>
  </S.StatCard>
);

export function Dashboard() {
  return (
    <>
      <S.Header>
        <S.Title>Dashboard</S.Title>
        <S.Select>
          <option>Hoje</option>
          <option>Ontem</option>
          <option>Últimos 7 dias</option>
          <option>Últimos 15 dias</option>
          <option>Este mês</option>
          <option>Todos os tempos</option>
        </S.Select>
      </S.Header>

      <S.StatsGrid>
        <Card
          title="Total de Leads (Hoje)"
          value={mockedLeadsInstagram.length + mockedLeadsWebsite.length}
        />
        <Card
          title="Clientes em Contato (Hoje)"
          value={mockedClientsPlataformaApp.length}
        />
        <Card title="Redirecionados p/ Consultor" value="12" />
        <Card title="Simulações de Lucro" value="28" />
      </S.StatsGrid>

      <S.ChartContainer>
        <S.ChartTitle>Leads por Canal</S.ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Legend />
            <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </S.ChartContainer>
    </>
  );
}
