// src/pages/Relatorios/Relatorios.tsx
import { FormEvent, useState, useRef, useEffect } from "react";
import {
  PaperAirplaneIcon,
  CogIcon,
  MagnifyingGlassIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";
import * as S from "./Relatorios.styles";
// 1. Importar a nova função do servidor
import { askInternalApi } from "../../servers/internalApi";

// --- Tipos de Dados ---
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
}

// --- Dados Mockados ---
const mockHistory: ChatHistory[] = [
  { id: '1', title: "Resumo de leads de ontem", messages: [] },
  { id: '2', title: "Análise de sentimento (Instagram)", messages: [] },
  { id: '3', title: "Usuários com problemas de PIX", messages: [] },
];

const mockIcebreakers = [
  "Qual foi o total de leads hoje?",
  "Me dê um resumo dos chamados abertos",
  "Qual IA está com mais interações?",
  "Algum cliente falou coisas emocionais?", // Adicionado seu exemplo
];

// --- Dados para a animação ---
const typingSteps = [
  { icon: <CogIcon />, text: "Pensando..." },
  { icon: <MagnifyingGlassIcon />, text: "Buscando dados..." },
  { icon: <BoltIcon />, text: "Processando..." },
];


// --- Componente Principal ---
export function Relatorios() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [chatHistory] = useState<ChatHistory[]>(mockHistory);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [typingStep, setTypingStep] = useState(0);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // useEffect para rolar para o final
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  // useEffect para controlar o ciclo da animação
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAiTyping) {
      interval = setInterval(() => {
        setTypingStep(prev => (prev + 1) % typingSteps.length);
      }, 800);
    } else {
      setTypingStep(0);
    }
    return () => clearInterval(interval);
  }, [isAiTyping]);

  // --- 2. FUNÇÃO DE ENVIO ATUALIZADA ---
  const handleSendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = currentInput.trim();
    if (!text) return;

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput("");
    setIsAiTyping(true);

    try {
      // Chama a API real
      const aiResponseText = await askInternalApi(text);
      
      // Cria a mensagem da IA com a resposta
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponseText, // Resposta da API
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      // Em caso de erro, manda uma mensagem de erro no chat
      const errorMessage: Message = {
        id: `ai-err-${Date.now()}`,
        text: "Desculpe, não consegui processar sua solicitação. Tente novamente.",
        sender: 'ai',
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error(error);
    } finally {
      // Para a animação de "digitando"
      setIsAiTyping(false);
    }
  };

  // --- 3. FUNÇÃO DE QUEBRA-GELO ATUALIZADA ---
  const handleIcebreakerClick = async (text: string) => {
    // Adiciona a mensagem do usuário (quebra-gelo)
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setIsAiTyping(true);

    try {
      // Chama a API real
      const aiResponseText = await askInternalApi(text);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponseText, // Resposta da API
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiMessage]);
    
    } catch (error) {
      const errorMessage: Message = {
        id: `ai-err-${Date.now()}`,
        text: "Desculpe, não consegui processar sua solicitação. Tente novamente.",
        sender: 'ai',
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error(error);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <S.OuterBorder>
      <S.GlassGap>
        <S.InnerWrapper>
          <S.ChatContainer>
            {/* Coluna 1: Histórico */}
            <S.HistorySidebar>
              <S.HistoryTitle>Chats Anteriores</S.HistoryTitle>
              {chatHistory.map(chat => (
                <S.HistoryItem key={chat.id}>
                  {chat.title}
                </S.HistoryItem>
              ))}
            </S.HistorySidebar>

            {/* Coluna 2: Interface do Chat */}
            <S.ChatInterface>
              <S.MessagesContainer ref={messagesContainerRef}>
                {messages.length === 0 && !isAiTyping ? (
                  // Tela de Boas-Vindas
                  <S.WelcomeContainer>
                    <div>
                      <S.WelcomeTitle>Assistente de IA Interno</S.WelcomeTitle>
                      <S.WelcomeSubtitle>Como posso ajudar a analisar seus dados hoje?</S.WelcomeSubtitle>
                    </div>
                    <S.IcebreakerGrid>
                      {mockIcebreakers.map((text, i) => (
                        <S.IcebreakerCard key={i} onClick={() => handleIcebreakerClick(text)}>
                          {text}
                        </S.IcebreakerCard>
                      ))}
                    </S.IcebreakerGrid>
                  </S.WelcomeContainer>
                ) : (
                  // Tela de Chat Ativo
                  <>
                    {messages.map(msg => 
                      msg.sender === 'user' ? (
                        <S.UserMessage key={msg.id} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }} />
                      ) : (
                        <S.AiMessage key={msg.id} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }} />
                      )
                    )}
                    {/* Animação de "pensando" (um passo de cada vez) */}
                    {isAiTyping && (
                      <S.AiTypingIndicator>
                        {typingSteps[typingStep].icon}
                        {typingSteps[typingStep].text}
                      </S.AiTypingIndicator>
                    )}
                  </>
                )}
              </S.MessagesContainer>
              
              {/* Input de Chat */}
              <S.ChatInputForm onSubmit={handleSendMessage}>
                <S.InputWrapper>
                  <S.ChatInput 
                    type="text"
                    placeholder="Pergunte algo para a IA..."
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                  />
                  <S.SendButton type="submit">
                    <PaperAirplaneIcon width={20} height={20} />
                  </S.SendButton>
                </S.InputWrapper>
              </S.ChatInputForm>
            </S.ChatInterface>
          </S.ChatContainer>
        </S.InnerWrapper>
      </S.GlassGap>
    </S.OuterBorder>
  );
}