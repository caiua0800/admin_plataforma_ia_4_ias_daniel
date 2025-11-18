// src/pages/Relatorios/Relatorios.tsx
import { FormEvent, useState, useRef, useEffect } from "react";
import {
  PaperAirplaneIcon,
  CogIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import * as S from "./Relatorios.styles";
import {
  askInternalApi,
  getInternalChats,
  getInternalChatMessages,
  type InternalChat,
  type InternalMessageTurn,
} from "../../servers/internalApi";

// --- NOVO: Importar o componente de Markdown ---
import { MessageContent } from "../../components/Markdown/MessageContent";

// --- Tipos de Dados ---
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface ChatHistory {
  id: string;
  title: string;
}

// --- Dados Mockados (APENAS ICEBREAKERS) ---
const mockIcebreakers = [
  "Qual foi o total de leads hoje?",
  "Me dê um resumo dos chamados abertos",
  "Qual IA está com mais interações?",
  "Algum cliente falou coisas emocionais?",
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
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [typingStep, setTypingStep] = useState(0);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // useEffect para buscar o histórico de chats na API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const chatsFromApi: InternalChat[] = await getInternalChats();
        const formattedHistory = chatsFromApi.map((chat) => ({
          id: chat.id,
          title: chat.name === "undefined" ? "Novo Chat" : chat.name,
        }));
        setChatHistory(formattedHistory);
      } catch (error) {
        console.error("Erro ao buscar histórico de chats:", error);
      }
    };
    fetchHistory();
  }, []);

  // useEffect para rolar para o final
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  // useEffect para controlar o ciclo da animação
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAiTyping) {
      interval = setInterval(() => {
        setTypingStep((prev) => (prev + 1) % typingSteps.length);
      }, 800);
    } else {
      setTypingStep(0);
    }
    return () => clearInterval(interval);
  }, [isAiTyping]);

  // Handler para clicar em um item do histórico
  const handleHistoryClick = async (chatId: string) => {
    setSelectedChatId(chatId);
    setMessages([]); 
    setIsAiTyping(true); 

    try {
      const messageTurns: InternalMessageTurn[] =
        await getInternalChatMessages(chatId);

      const flattenedMessages: Message[] = messageTurns.flatMap((turn) => {
        const userMsgId = `turn-${turn.id}-user`;
        const aiMsgId = `turn-${turn.id}-ai`;

        return [
          {
            id: userMsgId,
            text: turn.client_message,
            sender: "user" as const,
          },
          {
            id: aiMsgId,
            text: turn.ai_message,
            sender: "ai" as const,
          },
        ];
      });

      setMessages(flattenedMessages);
    } catch (error) {
      console.error("Erro ao buscar mensagens do chat:", error);
      setMessages([
        {
          id: "err-1",
          text: "Erro ao carregar o histórico deste chat.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Handler para criar um novo chat
  const handleNewChat = () => {
    setSelectedChatId(null);
    setMessages([]);
  };

  // Lógica de envio de mensagem
  const submitMessage = async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsAiTyping(true);

    try {
      const { response: aiResponseText, chat_id: returnedChatId } =
        await askInternalApi(text, selectedChatId);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (returnedChatId !== selectedChatId) {
        setSelectedChatId(returnedChatId);
        if (!chatHistory.find((chat) => chat.id === returnedChatId)) {
          const newChatItem: ChatHistory = {
            id: returnedChatId,
            title: text,
          };
          setChatHistory((prev) => [newChatItem, ...prev]);
        }
      }
    } catch (error) {
      const errorMessage: Message = {
        id: `ai-err-${Date.now()}`,
        text: "Desculpe, não consegui processar sua solicitação. Tente novamente.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error(error);
    } finally {
      setIsAiTyping(false);
    }
  };

  // Handler de envio do formulário
  const handleSendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = currentInput.trim();
    if (!text) return;
    setCurrentInput("");
    await submitMessage(text);
  };

  // Handler do icebreaker
  const handleIcebreakerClick = async (text: string) => {
    await submitMessage(text);
  };

  // --- Renderização (JSX) ---
  return (
    <S.OuterBorder>
      <S.GlassGap>
        <S.InnerWrapper>
          <S.ChatContainer>
            {/* Coluna 1: Histórico */}
            <S.HistorySidebar>
              <S.NewChatButton onClick={handleNewChat}>
                <PlusIcon width={20} height={20} />
                Novo Chat
              </S.NewChatButton>
              <S.HistoryTitle>Chats Anteriores</S.HistoryTitle>
              {chatHistory.map((chat) => (
                <S.HistoryItem
                  key={chat.id}
                  $isActive={selectedChatId === chat.id}
                  onClick={() => handleHistoryClick(chat.id)}
                >
                  {chat.title || "Chat Antigo"}
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
                      <S.WelcomeSubtitle>
                        {selectedChatId
                          ? "Histórico de mensagens carregado."
                          : "Como posso ajudar a analisar seus dados hoje?"}
                      </S.WelcomeSubtitle>
                    </div>
                    {!selectedChatId && (
                      <S.IcebreakerGrid>
                        {mockIcebreakers.map((text, i) => (
                          <S.IcebreakerCard
                            key={i}
                            onClick={() => handleIcebreakerClick(text)}
                          >
                            {text}
                          </S.IcebreakerCard>
                        ))}
                      </S.IcebreakerGrid>
                    )}
                  </S.WelcomeContainer>
                ) : (
                  // Tela de Chat Ativo
                  <>
                    {messages.map((msg) =>
                      msg.sender === "user" ? (
                        <S.UserMessage
                          key={msg.id}
                          // Mensagem do usuário (geralmente texto simples, mas pode ter quebras)
                          dangerouslySetInnerHTML={{
                            __html: msg.text.replace(/\n/g, "<br>"),
                          }}
                        />
                      ) : (
                        <S.AiMessage key={msg.id}>
                          {/* --- MUDANÇA AQUI: Usando o componente Markdown --- */}
                          <MessageContent content={msg.text} />
                        </S.AiMessage>
                      )
                    )}
                    {/* Animação de "pensando" */}
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