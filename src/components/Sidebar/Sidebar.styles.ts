// src/components/Sidebar/Sidebar.styles.ts
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  
  /* Efeito Flutuante */
  margin: 16px; /* Descola a sidebar da borda */
  height: calc(100vh - 32px); /* Altura - (margem * 2) */
  border-radius: 24px; /* Mais arredondada */

  /* EFEITO DE VIDRO (GLASSMORPHISM) */
  background-color: rgba(15, 23, 42, 0.5); /* Slate 900 com 50% */
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

  /* Borda de luz sutil */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Logo = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.25rem;
  margin-right: 12px;
  
  /* Gradiente Roxo-Azulado */
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  color: white;
  box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  /* Efeito de luz no texto */
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7),
    0 0 15px rgba(79, 70, 229, 0.7);
`;

export const Nav = styled.nav`
  flex: 1; /* Isso faz o <nav> crescer e empurrar o <Footer> para baixo */
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto; /* Adiciona scroll se os links não couberem */

  /* Estilização da barra de scroll (opcional, mas elegante) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(79, 70, 229, 0.5);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Section = styled.div``;

export const SectionTitle = styled.h2`
  font-size: 0.75rem; /* 12px */
  font-weight: 600;
  color: #94a3b8; /* Slate 400 */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 12px;
  margin-top: 8px;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 12px; /* Mais arredondado */
  text-decoration: none;
  color: #94a3b8; /* Cinza (inativo) */
  transition: all 0.2s ease-in-out;
  position: relative; /* Para o pseudo-elemento */

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  /* O ITEM ATIVO COM EFEITO DE LUZ BRANCA E ROXA */
  &.active {
    color: #fff; /* Texto branco */
    background: linear-gradient(
      90deg,
      rgba(79, 70, 229, 0.3) 0%,
      rgba(79, 70, 229, 0.0) 100%
    ); /* Fundo gradiente roxo */

    /* Efeito de luz (brilho) */
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);

    /* A "LUZ BRANCA" na borda */
    &::before {
      content: "";
      position: absolute;
      left: -1px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 0 8px #fff;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
`;

// --- ADIÇÃO DOS ESTILOS DE LOGOUT ---

export const Footer = styled.div`
  padding: 16px;
  margin-top: auto; /* Garante que ele fique no final */
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Linha separadora */
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 12px;
  text-decoration: none;
  color: #94a3b8; /* Cor cinza (inativo) */
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* Efeito de hover vermelho (para indicar "saída") */
  &:hover {
    background-color: rgba(239, 68, 68, 0.1); /* Fundo vermelho fraco */
    color: #f87171; /* Texto vermelho */
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
`;