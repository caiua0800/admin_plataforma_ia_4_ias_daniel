// src/components/ChatLayout/ChatLayout.tsx
import * as S from "./ChatLayout.styles";

export const ChatLayout = ({ children }: { children: React.ReactNode }) => (
  /* A Borda Externa */
  <S.OuterBorder>
    {/* O Espaçamento de Vidro */}
    <S.GlassGap>
      {/* O Conteúdo (com Borda Interna) */}
      <S.InnerWrapper>{children}</S.InnerWrapper>
    </S.GlassGap>
  </S.OuterBorder>
);