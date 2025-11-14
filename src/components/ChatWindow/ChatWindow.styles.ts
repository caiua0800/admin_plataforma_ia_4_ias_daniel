// src/components/ChatWindow/ChatWindow.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  flex: 1; /* Ocupa o espaço restante */
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  min-width: 0;
`;

export const Placeholder = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #94a3b8;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: rgba(0, 12, 51, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 5;
`;

export const Name = styled.h2`
  font-weight: bold;
  font-size: 1.125rem;
  color: #e2e8f0;
`;

export const PauseButton = styled.button<{ $isPaused: boolean }>`
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${(props) =>
    props.$isPaused
      ? "linear-gradient(145deg, #10B981, #059669)"
      : "linear-gradient(145deg, #F59E0B, #D97706)"};
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(1px);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 120px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #475569;
    border-radius: 3px;
  }
`;

export const MessageBox = styled.div<{ $isReply: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$isReply ? "flex-end" : "flex-start")};
`;

// Este wrapper agrupa a Bolha da Mensagem e o Horário
export const MessageWrapper = styled.div<{ $isReply: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isReply ? "flex-end" : "flex-start")};
  max-width: 90%;
`;

export const MessageBubble = styled.div<{ $isReply: boolean }>`
  /* --- CORREÇÃO AQUI --- */
  /* Removemos o max-width fixo de 70% para que a bolha possa 
     se expandir até o limite do MessageWrapper (que é 90%) */
  /* max-width: 70%; */ 
  
  /* Adicionamos 'word-break' para garantir que textos longos sem 
     espaço quebrem corretamente e não estourem a bolha */
  word-break: break-word;

  padding: 12px 16px;
  border-radius: 22px;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);

  ${(props) =>
    props.$isReply
      ? `
        background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
        box-shadow: 0 4px 20px rgba(79, 70, 229, 0.6);
        border-bottom-right-radius: 6px;
      `
      : `
        background-color: rgba(51, 65, 85, 0.7);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-bottom-left-radius: 6px;
      `}

  p {
    line-height: 1.6;
  }

  /* * NOVO ESTILO DE TABELA (COMO O CHATGPT/GEMINI) * */
  table {
    width: 100%;
    margin-top: 12px;
    border-collapse: collapse;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  th,
  td {
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  th {
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.2);
  }
  tr:last-child td {
    border-bottom: none;
  }
`;

export const Timestamp = styled.span<{ $isReply: boolean }>`
  font-size: 0.75rem; /* 12px */
  color: #64748b; /* slate-500 */
  margin-top: 4px;
  /* Adiciona um leve recuo para alinhar com o padding da bolha */
  margin-right: ${(props) => (props.$isReply ? "12px" : "0")};
  margin-left: ${(props) => (props.$isReply ? "0" : "12px")};
`;

export const InputArea = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  
  background-color: rgba(0, 12, 51, 0.6);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 60px 16px 22px;
  background-color: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 0.875rem;

  &::placeholder {
    color: #64748b;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export const SendButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  background: linear-gradient(135deg, #4f46e5, #06b6d4);
  color: white;
  box-shadow: 0 0 15px #4f46e5;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 25px #4f46e5, 0 0 10px #06b6d4;
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    background: #475569;
    color: #94a3b8;
    box-shadow: none;
    cursor: not-allowed;
  }
`;