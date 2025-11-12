// src/components/ChamadosList/ChamadosList.tsx
import { Chamado } from "../../types";
import * as S from "./ChamadosList.styles";

interface ChamadosListProps {
  chamados: Chamado[];
  onChamadoClick: (chamado: Chamado) => void;
}

export function ChamadosList({ chamados, onChamadoClick }: ChamadosListProps) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Chamados Abertos ({chamados.length})</S.Title>
      </S.Header>
      <S.List>
        {chamados.map((chamado) => (
          <S.Card key={chamado.id} onClick={() => onChamadoClick(chamado)}>
            <S.CardHeader>
              <S.CardTitle>{chamado.name}</S.CardTitle>
              <S.CardCPF>{chamado.cpf}</S.CardCPF>
            </S.CardHeader>
            <S.CardDescription>{chamado.descricao}</S.CardDescription>
          </S.Card>
        ))}
      </S.List>
    </S.Container>
  );
}