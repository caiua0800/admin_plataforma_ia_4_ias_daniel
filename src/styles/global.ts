// src/styles/global.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #e2e8f0;
    -webkit-font-smoothing: antialiased;

    /* * NOVO MESH GRADIENT (CYBER-GLOW)
     * Inspirado na sua imagem. Fundo muito escuro com brilhos.
    */
    background-color:rgb(0, 12, 51); /* Fundo quase preto */
    background-image: 
      /* Luz roxa-azulada (principal) */
      radial-gradient(at 10% 20%,rgb(37, 33, 118) 0px, transparent 50%),
      
      /* Luz azul-forte */
      radial-gradient(at 80% 30%,rgb(14, 81, 188) 0px, transparent 60%),
      
      /* Luz branca/lilás (glow) */
      radial-gradient(at 50% 50%,rgb(255, 255, 255) 0px, transparent 50%),

      /* Luz roxa base */
      radial-gradient(at 80% 90%,rgb(43, 20, 82) 0px, transparent 60%);

    background-attachment: fixed;
    min-height: 100vh;
  }
`;