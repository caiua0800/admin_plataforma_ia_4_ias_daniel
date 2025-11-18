// src/components/Notification/Toast.styles.ts
import styled, { keyframes, css } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

export const ToastWrapper = styled.div<{ $isClosing: boolean }>`
  width: 350px;
  max-width: 90vw;
  background: rgba(30, 41, 59, 0.8); // slate-800 com 80%
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  padding: 16px;
  display: flex;
  gap: 12px;
  animation: ${slideIn} 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  
  ${(props) => props.$isClosing && css`
    animation: ${fadeOut} 0.3s ease-out forwards;
  `}
`;

export const IconContainer = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  // Gradiente roxo-azulado
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  
  svg {
    width: 18px;
    height: 18px;
    color: #fff;
  }
`;

// --- NOVO ESTILO ADICIONADO ---
export const AvatarImage = styled.img`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
// --- FIM DO NOVO ESTILO ---

export const Content = styled.div`
  flex: 1;
  cursor: pointer;
`;

export const Title = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

export const Message = styled.p`
  font-size: 0.875rem;
  color: #cbd5e1; // slate-300
  margin: 4px 0 0 0;
  
  // Limita a mensagem a duas linhas
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CloseButton = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: #64748b; // slate-500
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
  transition: color 0.2s;
  
  &:hover {
    color: #fff;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;