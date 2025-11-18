// src/components/Markdown/CodeBlock.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e; // Fundo escuro estilo editor
  font-family: 'Fira Code', 'Consolas', monospace;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const Language = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  font-weight: 600;
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

// Wrapper para o SyntaxHighlighter
export const CodeWrapper = styled.div`
  & > pre {
    margin: 0 !important;
    padding: 16px !important;
    background: transparent !important; // Usa o fundo do container
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;