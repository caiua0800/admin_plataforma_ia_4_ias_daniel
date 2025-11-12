// src/components/ChamadosList/ChamadosList.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  flex: 0 0 30%; /* 3/10 da largura */
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 12, 51, 0.4);
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
`;

export const List = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #475569;
    border-radius: 3px;
  }
`;

export const Card = styled.div`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  /* Gradiente sutil da sidebar */
  background: linear-gradient(
    160deg,
    rgba(79, 70, 229, 0.1) 0%,
    rgba(6, 182, 212, 0.1) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
    border-color: #4f46e5;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #e0e7ff; /* Cor clara */
`;

export const CardCPF = styled.span`
  font-size: 0.875rem;
  color: #94a3b8;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #cbd5e1; /* Slate 300 */
  margin-top: 12px;
  line-height: 1.5;
`;