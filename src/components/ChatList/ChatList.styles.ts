// src/components/ChatList/ChatList.styles.ts
import styled from "styled-components";

// O container da lista agora tem 30% de largura
export const Container = styled.div`
  flex: 0 0 40%; /* 3/10 da largura */
  background-color: rgba(0, 12, 51, 0.2); /* Fundo sutil */
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #475569;
    border-radius: 3px;
  }
`;

// ... (O resto do arquivo ChatItem, Avatar, etc. permanece igual)
// ...
export const ChatItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s, box-shadow 0.2s;
  background-color: transparent;
  position: relative; // Posição para a notificação

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }

  ${(props) =>
    props.$isActive &&
    `
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
    
    border-image: linear-gradient(to right, #4f46e5, transparent) 1;
    border-left: 4px solid #4f46e5;
  `}
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(79, 70, 229, 0.5); /* Cor da sidebar */
`;

export const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.p`
  font-weight: 600;
  color: #e2e8f0;
  font-size: 0.875rem;
  
  /* Limita o nome para caber a bolinha */
  max-width: 150px; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DateText = styled.p`
  font-size: 0.75rem;
  color: #64748b;
`;

// --- NOVO: Container para Seguidores e Badge ---
export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

// --- NOVO: Estilo para contagem de seguidores ---
export const FollowerCount = styled.p`
  font-size: 0.75rem;
  color: #64748b;
`;

// --- NOVO: Estilo para o marcador "Segue Você" ---
export const FollowsMeBadge = styled.span`
  font-size: 0.7rem; /* 11.2px */
  font-weight: 600;
  color: #10b981; /* Verde */
  background-color: rgba(16, 185, 129, 0.1);
  padding: 2px 6px;
  border-radius: 6px;
`;

// --- NOVO: Bolinha de notificação ---
export const NotificationBadge = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #4f46e5;
  border: 2px solid #fff;
  box-shadow: 0 0 10px #4f46e5;
`;

export const LastMessage = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
`;