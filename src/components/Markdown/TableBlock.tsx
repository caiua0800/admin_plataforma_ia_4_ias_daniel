// src/components/Markdown/TableBlock.tsx
import { useRef, useState } from 'react';
import { 
  ClipboardDocumentIcon, 
  CheckIcon, 
  TableCellsIcon,
  ArrowDownTrayIcon // Novo ícone
} from '@heroicons/react/24/outline';
import * as S from './TableBlock.styles';

export function TableBlock({ children }: { children: React.ReactNode }) {
  const [isCopied, setIsCopied] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // Copia para a área de transferência (formato TSV - Tab Separated Values, bom para colar no Excel)
  const handleCopy = async () => {
    if (!tableRef.current) return;
    
    const text = tableRef.current.innerText;
    await navigator.clipboard.writeText(text);
    
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // --- NOVA FUNÇÃO: Baixar CSV ---
  const handleDownloadCsv = () => {
    if (!tableRef.current) return;

    // Encontra a tabela dentro do wrapper
    const table = tableRef.current.querySelector('table');
    if (!table) return;

    // Pega todas as linhas
    const rows = Array.from(table.querySelectorAll('tr'));

    // Mapeia as linhas e células para formato CSV
    const csvContent = rows.map(row => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      return cells.map(cell => {
        // Pega o texto e escapa aspas duplas (padrão CSV)
        const text = cell.textContent || '';
        const escapedText = text.replace(/"/g, '""');
        // Envolve em aspas para garantir que vírgulas no texto não quebrem o CSV
        return `"${escapedText}"`;
      }).join(',');
    }).join('\n');

    // Cria um Blob e um link temporário para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tabela_relatorio_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Label>
          <TableCellsIcon width={14} /> Tabela
        </S.Label>
        
        <S.Actions>
          {/* Botão de Download */}
          <S.CopyButton onClick={handleDownloadCsv} title="Baixar CSV">
            <ArrowDownTrayIcon /> CSV
          </S.CopyButton>

          {/* Botão de Copiar */}
          <S.CopyButton onClick={handleCopy} title="Copiar para colar no Excel">
            {isCopied ? (
              <>
                <CheckIcon /> Copiado!
              </>
            ) : (
              <>
                <ClipboardDocumentIcon /> Copiar
              </>
            )}
          </S.CopyButton>
        </S.Actions>

      </S.Header>
      <S.TableWrapper ref={tableRef}>
        <S.StyledTable as="table">
            {children}
        </S.StyledTable>
      </S.TableWrapper>
    </S.Container>
  );
}