// src/components/Notification/NotificationHost.tsx
import styled from 'styled-components';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { Toast } from './Toast';

// O container que fica no canto da tela
const HostContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export function NotificationHost() {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <HostContainer>
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </HostContainer>
  );
}