// src/components/ChatLayout/ChatLayout.styles.ts
import styled from "styled-components";

/* 1. A BORDA EXTERNA (Mais arredondada) */
export const OuterBorder = styled.div`
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 8px 10px -6px rgba(0, 0, 0, 0.3);
  
  /* Ocupa todo o espaço do MainContent */
  width: 100%;
  height: 100%;
`;

/* 2. O ESPAÇAMENTO DE VIDRO (Gap maior) */
export const GlassGap = styled.div`
  border-radius: 23px;
  padding: 6px; /* O espaçamento da borda dupla */
  
  background-color: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  height: 100%;
`;

/* 3. O WRAPPER DO CONTEÚDO (COM GRADIENTE) */
export const InnerWrapper = styled.div`
  display: flex;
  height: 100%;
  border-radius: 18px; /* Mais arredondado */
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* --- DESCOMENTE ESTA LINHA --- */
  overflow: hidden; 
  /* Isso garante que o container principal 
     NÃO vai esticar se o conteúdo estourar. */
  
  /* * O GRADIENTE ESCURO (NÃO MAIS PRETO SÓLIDO)
   * Do roxo-base para o azul-fundo
  */
  background: linear-gradient(
    160deg,
    rgb(43, 20, 82) 0%,
    rgb(0, 12, 51) 100%
  );
`;