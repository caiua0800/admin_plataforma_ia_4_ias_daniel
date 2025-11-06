import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  height: 100vh;
  background-color: #1f2937;
  color: white;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  border-bottom: 1px solid #374151;
`;
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;
export const Nav = styled.nav`
  flex: 1;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 6px;
  text-decoration: none;
  color: #d1d5db;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background-color: #374151;
    color: white;
  }
  &.active {
    background-color: #111827;
    color: white;
  }
  svg {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;
