import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChatBubbleLeftRightIcon, 
  ShareIcon, 
  GlobeAltIcon,
  XMarkIcon 
} from '@heroicons/react/24/solid';
import * as S from './Toast.styles';
import { useNotificationStore } from '../../stores/useNotificationStore';
import type { NotificationPayload } from '../../stores/useNotificationStore'; // Use type aqui

interface ToastProps {
  notification: NotificationPayload;
}
// ... resto do arquivo igual ...
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
  // Removido chatId que não estava sendo usado
  const { id, platform, title, message, profilePicture } = notification;
  const removeNotification = useNotificationStore((state) => state.removeNotification);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const config = platformConfig[platform] || platformConfig.general;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      removeNotification(id);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate(config.path);
    handleClose();
  };

  return (
    <S.ToastWrapper $isClosing={isClosing}>
      {profilePicture ? (
        <S.AvatarImage src={profilePicture} alt={title} />
      ) : (
        <S.IconContainer>
          {config.icon}
        </S.IconContainer>
      )}
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