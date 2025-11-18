// src/main.tsx
import ReactDOM from "react-dom/client"; // React import removido
import App from "./App.tsx";
import { GlobalStyle } from "./styles/global.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyle />
    <App />
  </>
);