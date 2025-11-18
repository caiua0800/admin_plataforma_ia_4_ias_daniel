// src/components/Markdown/TableBlock.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;
  font-family: 'Inter', sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const Label = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

// --- NOVO: Container para os botões ---
export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CopyButton = styled.button`
  background: none;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  padding: 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  color: #e2e8f0;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    background-color: rgba(255, 255, 255, 0.02);
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;