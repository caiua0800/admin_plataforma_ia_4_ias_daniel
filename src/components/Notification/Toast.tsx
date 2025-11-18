// src/components/Notification/Toast.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon, 
  ShareIcon, 
  GlobeAltIcon,
  XMarkIcon 
} from '@heroicons/react/24/solid';
import * as S from './Toast.styles';
import { NotificationPayload, useNotificationStore } from '../../stores/useNotificationStore';

interface ToastProps {
  notification: NotificationPayload;
}

// Mapeia a plataforma para um ícone e rota
const platformConfig = {
  instagram: {
    icon: <ShareIcon />,
    path: '/leads-instagram'
  },
  website: {
    icon: <GlobeAltIcon />,
    path: '/leads-website'
  },
  platform: {
    icon: <ChatBubbleLeftRightIcon />,
    path: '/clientes'
  },
  general: {
    icon: <ChatBubbleLeftRightIcon />,
    path: '/'
  }
};

export function Toast({ notification }: ToastProps) {
  // 1. Extrair o profilePicture da notificação
  const { id, chatId, platform, title, message, profilePicture } = notification;
  const removeNotification = useNotificationStore((state) => state.removeNotification);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const config = platformConfig[platform] || platformConfig.general;

  // Fecha o toast
  const handleClose = () => {
    setIsClosing(true);
    // Espera a animação de fade-out (300ms) antes de remover do store
    setTimeout(() => {
      removeNotification(id);
    }, 300);
  };

  // Auto-fechamento após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Navega para o chat e fecha o toast
  const handleClick = () => {
    navigate(config.path);
    handleClose();
  };

  return (
    <S.ToastWrapper $isClosing={isClosing}>
    
      {/* --- MUDANÇA APLICADA AQUI --- */}
      {/* Renderiza a foto de perfil se ela existir, senão, mostra o ícone padrão */}
      {profilePicture ? (
        <S.AvatarImage src={profilePicture} alt={title} />
      ) : (
        <S.IconContainer>
          {config.icon}
        </S.IconContainer>
      )}
      {/* --- FIM DA MUDANÇA --- */}
      
      <S.Content onClick={handleClick}>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
      </S.Content>

      <S.CloseButton onClick={handleClose}>
        <XMarkIcon />
      </S.CloseButton>
    </S.ToastWrapper>
  );
}