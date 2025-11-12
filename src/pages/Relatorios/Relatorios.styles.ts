import styled, { keyframes } from "styled-components";

// --- ESTRUTURA GERAL DA PÁGINA ---
export const OuterBorder = styled.div`
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
`;
export const GlassGap = styled.div`
  border-radius: 23px;
  padding: 6px;
  background-color: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  height: 100%;
`;
export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  padding: 24px;
  background: linear-gradient(160deg, rgb(15, 2, 44) 0%, rgb(0, 12, 51) 100%);
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
`;

// --- CABEÇALHO ---
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-shrink: 0;
`;
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(79, 70, 229, 0.7);
`;

// --- Container Principal de Configuração ---
export const ConfigBox = styled.div`
  padding: 32px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
  max-width: 700px;
  margin: 0 auto;

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
    margin-bottom: 8px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: #fff;
  margin-top: 24px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:first-of-type {
    margin-top: 0;
  }
`;

// --- Radio Buttons Customizados ---
export const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const RadioLabel = styled.label`
  flex: 1;
  cursor: pointer;
  
  input {
    display: none;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.2s;

    svg {
      width: 20px;
      height: 20px;
      color: #94a3b8;
      transition: all 0.2s;
    }
  }

  input:checked + span {
    border-color: #4f46e5;
    background-color: rgba(79, 70, 229, 0.2);
    box-shadow: 0 0 15px rgba(79, 70, 229, 0.5);
    color: #fff;

    svg {
      color: #fff;
    }
  }
`;

// --- Container para Opções que Aparecem/Desaparecem ---
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

export const OptionsContainer = styled.div`
  animation: ${fadeIn} 0.4s ease-out;
  margin-bottom: 24px;
`;

// --- Inputs e Selects ---
export const Input = styled.input`
  width: 100%; padding: 12px 16px; font-size: 0.875rem; color: #e2e8f0;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &::placeholder { color: #64748b; }

  &:focus {
    outline: none; border-color: #4f46e5;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 10px rgba(79, 70, 229, 0.5);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px; font-size: 0.875rem; color: #e2e8f0;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:focus {
    outline: none; border-color: #4f46e5;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 10px #4f46e5;
  }
  option { background-color: #1e2b3b; }
`;

export const DateRangeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;
`;

// --- Botão Principal ---
export const GenerateButton = styled.button`
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px; margin-top: 32px; border: none; border-radius: 12px;
  font-size: 1rem; font-weight: 600; color: #fff;
  cursor: pointer;
  background: linear-gradient(135deg, #4f46e5 0%, #a855f7 100%);
  box-shadow: 0 5px 15px rgba(168, 85, 247, 0.4);
  transition: all 0.2s ease;
  
  svg { width: 20px; height: 20px; }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(168, 85, 247, 0.6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #334155; // slate-700
    box-shadow: none;
  }
`;