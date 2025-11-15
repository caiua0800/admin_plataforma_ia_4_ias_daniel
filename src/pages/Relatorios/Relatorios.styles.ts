// src/pages/Relatorios/Relatorios.styles.ts
import styled, { keyframes } from "styled-components";

// --- Animações ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- ESTRUTURA GERAL (COM BORDA DUPLA) ---
export const OuterBorder = styled.div`
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
`;

export const GlassGap = styled.div`
  border-radius: 23px;
  padding: 6px;
  background-color: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  height: 100%;
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  background: linear-gradient(160deg, rgb(15, 2, 44) 0%, rgb(0, 12, 51) 100%);
`;

// --- Container Principal (AGORA DENTRO DO InnerWrapper) ---
export const ChatContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

// --- Coluna 1: Histórico de Chats (COM NOVO ESTILO) ---
export const HistorySidebar = styled.div`
  flex: 0 0 280px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 3px; }
`;

// --- BOTÃO NOVO CHAT ---
export const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background-color: rgba(79, 70, 229, 0.3);
  border: 1px solid #4f46e5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  margin-bottom: 16px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: rgba(79, 70, 229, 0.5);
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
  }
`;

export const HistoryTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  padding: 8px;
  margin-bottom: 8px;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
`;

// --- HistoryItem CORRIGIDO ---
export const HistoryItem = styled.div<{ $isActive?: boolean }>`
  /* --- ADIÇÕES AQUI --- */
  display: flex;
  align-items: center;
  /* ------------------ */

  padding: 12px 16px;
  font-size: 0.875rem;
  color: #cbd5e1;
  border-radius: 12px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid transparent;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: rgba(79, 70, 229, 0.2);
    color: #fff;
    border-color: #4f46e5;
    transform: translateX(3px);
  }

  /* Estilo para o item ativo */
  ${(props) =>
    props.$isActive &&
    `
    background-color: rgba(79, 70, 229, 0.4);
    color: #fff;
    border-color: #4f46e5;
    box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
  `}
`;

// --- Coluna 2: Interface Principal do Chat ---
export const ChatInterface = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: transparent;
  overflow: hidden; 
`;

// --- Mensagens (Área de Scroll) ---
export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column; 
  gap: 20px;
  padding-bottom: 120px; /* Espaço para o input flutuante */
  
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
`;

// --- Bolhas de Mensagem ---
const MessageBubble = styled.div`
  padding: 14px 20px;
  border-radius: 20px;
  line-height: 1.6;
  max-width: 75%;
  animation: ${fadeIn} 0.3s ease-out;
  word-break: break-word;
`;

// --- Mensagem da IA (Esquerda) ---
export const AiMessage = styled(MessageBubble)`
  background-color: rgba(51, 65, 85, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 6px;
  align-self: flex-start;
  color: #e2e8f0;
`;

// --- Mensagem do Usuário (Direita) ---
export const UserMessage = styled(MessageBubble)`
  background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%);
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.4);
  border-bottom-right-radius: 6px;
  align-self: flex-end;
  color: #fff;
`;

// --- Animação de "digitando" ---
export const AiTypingIndicator = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 10px; 
  min-height: 48px; 
  padding: 14px 20px;
  background-color: rgba(51, 65, 85, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border-bottom-left-radius: 6px;
  font-size: 0.875rem;
  color: #cbd5e1;
  animation: ${fadeIn} 0.3s ease-out;

  svg {
    width: 18px;
    height: 18px;
    color: #a855f7;
    animation: ${spin} 1.2s linear infinite;
  }
`;

// --- Tela de Boas-Vindas e Quebra-Gelos ---
export const WelcomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center; 
  padding: 24px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(168, 85, 247, 0.7);
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  color: #cbd5e1;
  margin-top: 8px;
  margin-bottom: 32px;
`;

export const IcebreakerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  max-width: 700px;
  margin-top: auto; 
  padding-bottom: 16px; 
`;

export const IcebreakerCard = styled.div`
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    transform: translateY(-4px);
    border-color: #a855f7;
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  }
`;

// --- Input de Chat (FLUTUANTE) ---
export const ChatInputForm = styled.form`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  z-index: 10;
  padding-top: 16px; 
`;

export const InputWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0,0,0,0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  
  &:focus-within {
    border-color: #4f46e5;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 15px rgba(79, 70, 229, 0.7);
  }
`;

export const ChatInput = styled.input`
  width: 100%;
  padding: 12px 60px 12px 20px;
  font-size: 0.875rem;
  color: #e2e8f0;
  background-color: transparent;
  border: none;
  
  &::placeholder { color: #64748b; }
  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  box-shadow: 0 5px 15px rgba(168, 85, 247, 0.4);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 20px rgba(168, 85, 247, 0.6);
  }
`;