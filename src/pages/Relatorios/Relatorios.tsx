import { FormEvent, useState } from "react";
import { CircleStackIcon, ChatBubbleLeftRightIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import * as S from "./Relatorios.styles";

type ReportType = 'source' | 'chat';

export function Relatorios() {
  const [reportType, setReportType] = useState<ReportType>('source');
  const [selectedSource, setSelectedSource] = useState('instagram');
  const [chatIdentifier, setChatIdentifier] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const isFormValid = () => {
    if (!startDate || !endDate) return false;
    if (reportType === 'source') return !!selectedSource;
    if (reportType === 'chat') return chatIdentifier.trim() !== '';
    return false;
  };

  const handleGenerateReport = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsGenerating(true);
    const reportConfig = {
      type: reportType,
      source: reportType === 'source' ? selectedSource : undefined,
      chat: reportType === 'chat' ? chatIdentifier : undefined,
      dates: { start: startDate, end: endDate },
    };

    console.log("Gerando relatório com a configuração:", reportConfig);

    // Simula uma chamada de API para gerar o relatório
    setTimeout(() => {
      alert("Relatório gerado com sucesso! (Verifique o console)");
      setIsGenerating(false);
    }, 2000); // Simula 2 segundos de processamento
  };

  return (
    <S.OuterBorder>
      <S.GlassGap>
        <S.InnerWrapper>
          <S.Header>
            <S.Title>Exportar Relatórios</S.Title>
          </S.Header>

          <S.ConfigBox>
            <form onSubmit={handleGenerateReport}>
              <S.SectionTitle>1. Selecione o Tipo de Relatório</S.SectionTitle>
              <S.RadioGroup>
                <S.RadioLabel>
                  <input type="radio" name="reportType" value="source" checked={reportType === 'source'} onChange={() => setReportType('source')} />
                  <span><CircleStackIcon /> Por Fonte</span>
                </S.RadioLabel>
                <S.RadioLabel>
                  <input type="radio" name="reportType" value="chat" checked={reportType === 'chat'} onChange={() => setReportType('chat')} />
                  <span><ChatBubbleLeftRightIcon /> Por Chat Específico</span>
                </S.RadioLabel>
              </S.RadioGroup>

              <S.SectionTitle>2. Configure os Filtros</S.SectionTitle>
              
              {reportType === 'source' && (
                <S.OptionsContainer key="source">
                  <label htmlFor="source-select">Fonte das Conversas</label>
                  <S.Select id="source-select" value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)}>
                    <option value="instagram">Leads Instagram</option>
                    <option value="website">Leads Website</option>
                    <option value="platform">Clientes da Plataforma</option>
                  </S.Select>
                </S.OptionsContainer>
              )}

              {reportType === 'chat' && (
                <S.OptionsContainer key="chat">
                  <label htmlFor="chat-id">Identificador do Chat</label>
                  <S.Input 
                    id="chat-id" 
                    type="text" 
                    placeholder="Digite o nome, ID ou @username"
                    value={chatIdentifier}
                    onChange={(e) => setChatIdentifier(e.target.value)}
                  />
                </S.OptionsContainer>
              )}

              <S.DateRangeWrapper>
                <div>
                  <label htmlFor="start-date">Data de Início</label>
                  <S.Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="end-date">Data de Fim</label>
                  <S.Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </S.DateRangeWrapper>

              <S.GenerateButton type="submit" disabled={!isFormValid() || isGenerating}>
                {isGenerating ? (
                  "Gerando..."
                ) : (
                 <>
                   <DocumentArrowDownIcon />
                   Gerar Relatório
                 </>
                )}
              </S.GenerateButton>
            </form>
          </S.ConfigBox>
        </S.InnerWrapper>
      </S.GlassGap>
    </S.OuterBorder>
  );
}