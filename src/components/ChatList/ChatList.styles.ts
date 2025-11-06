import styled from "styled-components";
export const Container = styled.div`
  width: 33.333333%;
  border-right: 1px solid #e5e7eb;
  height: 100%;
  overflow-y: auto;
`;
export const ChatItem = styled.div<{ $isActive: boolean }>`
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;
  background-color: ${(props) => (props.$isActive ? "#eff6ff" : "transparent")};
  &:hover {
    background-color: #f9fafb;
  }
`;
export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Name = styled.p`
  font-weight: bold;
  color: #1f2937;
`;
export const DateText = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;
export const LastMessage = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
