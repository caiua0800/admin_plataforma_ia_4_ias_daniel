import styled, { keyframes } from "styled-components";

// NOVO: Container para centralizar a dashboard na página
export const PageContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 800px;

`;

// --- ESTRUTURA GERAL DA PÁGINA ---
export const OuterBorder = styled.div`
  width: 100%;
  height: 100%;
  min-height: 800px;
  max-width: 1500px; // Define uma largura máxima para a dashboard
  border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
`;

export const GlassGap = styled.div`
  border-radius: 23px; padding: 6px;
  background-color: rgba(30, 41, 59, 0.3); backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
    min-height: 800px;

`;

export const InnerWrapper = styled.div`
  display: flex; flex-direction: column;
  border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;
  min-height: 800px;

  background: linear-gradient(160deg, rgb(15, 2, 44) 0%, rgb(0, 12, 51) 100%);
`;

// --- CABEÇALHO ---
export const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px; flex-shrink: 0;
`;

export const Title = styled.h1`
  font-size: 2rem; font-weight: bold; color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(79, 70, 229, 0.7);
`;

export const Select = styled.select`
  padding: 10px 16px; font-size: 0.875rem; color: #e2e8f0;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px; box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  
  &:focus {
    outline: none; border-color: #4f46e5;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 10px #4f46e5;
  }
  option { background-color: #1e293b; color: #e2e8f0; }
`;

// --- ESTRUTURA DO NOVO LAYOUT ---
export const TopMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const MainContentGrid = styled.div`
  display: grid;
  // AJUSTE: Coluna de leads (esquerda) é 2x maior que a de suporte (direita)
  grid-template-columns: 2fr 1fr; 
  gap: 24px;
  // AJUSTE: Impede que o item menor (suporte) se estique verticalmente
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeadsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SubGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

// --- CARDS DE MÉTRICA (Estilo Unificado) ---
export const StatCard = styled.div`
  display: flex; align-items: center; gap: 20px;
  padding: 24px; border-radius: 16px;
  background-color: rgba(30, 41, 59, 0.5); /* Fundo mais sólido */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    border-color: rgba(79, 70, 229, 0.5);
  }
`;

export const CardIcon = styled.div`
  width: 48px; height: 48px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px;
  background: linear-gradient(140deg, #4f46e5 0%, #06b6d4 100%);
  
  svg { width: 26px; height: 26px; color: #fff; }
`;

export const CardContent = styled.div``;

export const StatTitle = styled.h3`
  font-size: 0.875rem; font-weight: 500;
  color: #94a3b8; margin-bottom: 4px;
`;

export const StatValue = styled.p`
  font-size: 2rem; font-weight: 700;
  color: #fff; line-height: 1;
`;

// --- GRÁFICOS E CAIXAS DE CONTEÚDO ---
export const ChartBox = styled.div`
  padding: 24px; border-radius: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  min-height: 420px;

`;

export const SectionTitle = styled.h2`
  font-size: 1.125rem; font-weight: 500;
  color: #cbd5e1; margin-bottom: 24px;
`;

// -- GRÁFICO DE BARRAS CUSTOMIZADO (COM CORREÇÃO) --
const growAnimation = keyframes`
  from { transform: scaleY(0); } to { transform: scaleY(1); }
`;

export const CustomChartContainer = styled.div`
  display: flex; justify-content: space-around;
  align-items: flex-end; height: 320px;
  gap: 12px; padding: 0 12px;
`;

export const BarWrapper = styled.div`
  flex: 1; display: flex; flex-direction: column;
  align-items: center; height: 100%;
`;

export const BarContainer = styled.div`
  width: 100%; flex: 1;
  display: flex; align-items: flex-end;
  justify-content: center;
  margin-top: 8px; margin-bottom: 8px;
`;

export const Bar = styled.div`
  width: 70%; max-width: 30px;
  background: linear-gradient(to top, #4f46e5, #a855f7);
  border-radius: 6px; box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  animation: ${growAnimation} 0.8s ease-out forwards;
  transform-origin: bottom;
`;

export const BarValue = styled.span`
  font-size: 0.75rem; font-weight: 600; color: #a0aec0;
`;

export const BarLabel = styled.span`
  font-size: 0.75rem; font-weight: 500; color: #94a3b8;
`;

// -- NOVO COMPONENTE DE SUPORTE INTEGRADO --
export const SupportTicketsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  @media (max-width: 500px) { flex-direction: column; }
`;

export const SupportChartContainer = styled.div`
  flex: 0 0 140px;
  height: 140px;
`;

export const SupportDataList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SupportDataItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DataLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: #cbd5e1;
`;

export const ColorDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  box-shadow: 0 0 8px ${props => props.$color};
`;

export const DataValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
`;