import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Placeholder = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f9fafb;
  color: #6b7280;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
`;
export const Name = styled.h2`
  font-weight: bold;
  font-size: 1.125rem;
`;
export const PauseButton = styled.button<{ $isPaused: boolean }>`
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.$isPaused ? "#d1fae5" : "#fef3c7")};
  color: ${(props) => (props.$isPaused ? "#065f46" : "#92400e")};
`;
export const MessagesArea = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const MessageBox = styled.div<{ $isReply: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$isReply ? "flex-end" : "flex-start")};
`;
export const MessageBubble = styled.div<{ $isReply: boolean }>`
  max-width: 70%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => (props.$isReply ? "#3b82f6" : "white")};
  color: ${(props) => (props.$isReply ? "white" : "#1f2937")};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;
export const InputArea = styled.div`
  padding: 16px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;
export const InputWrapper = styled.div`
  position: relative;
`;
export const Input = styled.input`
  width: 100%;
  padding: 8px 48px 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
  &:disabled {
    background-color: #f3f4f6;
  }
`;
export const SendButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  color: #3b82f6;
  &:disabled {
    color: #9ca3af;
  }
`;
