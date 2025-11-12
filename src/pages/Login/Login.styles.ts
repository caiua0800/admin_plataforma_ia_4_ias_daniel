import styled, { keyframes } from "styled-components";

// --- Animações ---
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// --- Componentes Estilizados ---

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  // Fundo animado com gradiente escuro e futurista
  background: linear-gradient(-45deg, #000c33, #2b1454, #000c33, #4f46e5);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  
  // Efeito Glassmorphism
  background: rgba(15, 23, 42, 0.6); // slate-900 com 60% opacidade
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  // Borda e sombra
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

  // Animação de entrada
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

export const Logo = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0 auto 24px auto;
  
  background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
  color: white;
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.6);
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin-bottom: 8px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  text-align: center;
  color: #94a3b8; // slate-400
  margin-bottom: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #64748b; // slate-500
  width: 20px;
  height: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 0.875rem;
  color: #e2e8f0;
  
  // Efeito Glass no Input
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &::placeholder {
    color: #64748b;
  }

  // Efeito de GLOW quando focado
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 15px rgba(79, 70, 229, 0.7);
  }
`;

export const ForgotPassword = styled.a`
  font-size: 0.75rem;
  color: #94a3b8;
  text-align: right;
  text-decoration: none;
  margin-top: -12px;
  transition: color 0.2s;
  
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  
  // Gradiente e Sombra que definem o estilo
  background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%);
  box-shadow: 0 5px 20px rgba(168, 85, 247, 0.4);
  
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(168, 85, 247, 0.6);
  }
`;