import styled from "styled-components";

// --- ESTRUTURA GERAL DA PÁGINA (Padrão Dashboard) ---
export const OuterBorder = styled.div`
  border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  width: 100%; height: 100%;
`;
export const GlassGap = styled.div`
  border-radius: 23px; padding: 6px;
  background-color: rgba(30, 41, 59, 0.3); backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); height: 100%;
`;
export const InnerWrapper = styled.div`
  display: flex; flex-direction: column; height: 100%;
  border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto; padding: 24px;
  background: linear-gradient(160deg, rgb(15, 2, 44) 0%, rgb(0, 12, 51) 100%);
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
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

// --- BOTÃO DE ADICIONAR ---
export const AddButton = styled.button`
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; border: none; border-radius: 12px;
  font-size: 0.875rem; font-weight: 600; color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%);
  box-shadow: 0 5px 15px rgba(168, 85, 247, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  svg { width: 20px; height: 20px; }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(168, 85, 247, 0.6);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// --- TABELA ---
export const TableContainer = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #e2e8f0;

  th, td {
    padding: 16px;
    text-align: left;
  }

  thead {
    background-color: rgba(255, 255, 255, 0.05);
    th {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 500;
    }
  }

  tbody tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: background-color 0.2s;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

export const UserName = styled.p`
  font-weight: 500;
  color: #fff;
`;

export const UserEmail = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
`;

export const StatusBadge = styled.span<{ $isActive: boolean }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.$isActive ? '#10b981' : '#94a3b8'};
  background-color: ${props => props.$isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)'};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;

  button {
    background: none; border: none; color: #94a3b8;
    cursor: pointer; padding: 4px;
    transition: color 0.2s, transform 0.2s;
    svg { width: 18px; height: 18px; }
    &:hover { color: #fff; transform: scale(1.1); }
  }
`;

// --- FORMULÁRIO DO MODAL ---
export const ModalForm = styled.form`
  display: flex; flex-direction: column; gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
  }
`;

export const Input = styled.input`
  width: 100%; padding: 12px 16px; font-size: 0.875rem; color: #e2e8f0;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &::placeholder { color: #64748b; }

  &:focus {
    outline: none; border-color: #4f46e5;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 10px rgba(79, 70, 229, 0.5);
  }
`;

export const ModalButton = styled(AddButton)`
  width: 100%;
  margin-top: 10px;
  padding: 12px;
`;