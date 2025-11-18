// src/api/mockedData.ts
import type {
  LeadInstagram,
  LeadWebsite,
  ClientPlataformaApp,
  User,
  Chamado,
} from "../types";

export const mockedUsers: User[] = [
  { id: "user-1", name: "Admin Principal", email: "admin@empresa.com" },
  { id: "user-2", name: "Atendente Nível 1", email: "atendente1@empresa.com" },
  { id: "user-3", name: "Supervisor", email: "supervisor@empresa.com" },
];

export const mockedLeadsInstagram: LeadInstagram[] = [
  {
    id: "insta-1",
    name: "Joana Santos",
    username: "joana.santos",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Joana+Santos&background=4f46e5&color=fff",
    status: 1,
    lastMessageText: "Quanto custa o plano pro?", // CORRIGIDO (era Test)
    dateCreated: new Date("2025-11-06T10:00:00Z"),
    last_message_date: "2025-11-06T10:04:00Z", // ADICIONADO (Campo obrigatório)
    messages: [
      {
        id: "insta-msg-1",
        message: "Oi, tudo bem?",
        dateCreated: new Date("2025-11-06T09:59:00Z"),
        isReply: false,
        senderName: "joana.santos",
      },
      {
        id: "insta-msg-2",
        message:
          "Olá, Joana! Tudo bem e com você? Sou a assistente virtual. Como posso ajudar?",
        dateCreated: new Date("2025-11-06T09:59:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "insta-msg-3",
        message: "Quanto custa o plano pro?",
        dateCreated: new Date("2025-11-06T10:00:00Z"),
        isReply: false,
        senderName: "joana.santos",
      },
      {
        id: "insta-msg-4",
        message:
          "Nosso plano Pro custa R$99/mês. Ele inclui acesso ilimitado e relatórios avançados. A IA detectou que você pode ter um problema de pagamento. Deseja abrir um chamado?",
        dateCreated: new Date("2025-11-06T10:01:00Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "insta-msg-5",
        message: "Sim, por favor. Meu CPF é 123.456.789-00.",
        dateCreated: new Date("2025-11-06T10:04:00Z"),
        isReply: false,
        senderName: "joana.santos",
      },
    ],
  },
  {
    id: "insta-2",
    name: "Marcos Andrade",
    username: "marcos_and",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Marcos+Andrade&background=06b6d4&color=fff",
    status: 1,
    lastMessageText: "Gostaria de falar com um humano", // CORRIGIDO
    dateCreated: new Date("2025-11-06T09:15:00Z"),
    last_message_date: "2025-11-06T09:15:30Z", // ADICIONADO
    messages: [
      {
        id: "insta-msg-6",
        message: "Não consigo fazer login, meu CPF é 987.654.321-11",
        dateCreated: new Date("2025-11-06T09:14:00Z"),
        isReply: false,
        senderName: "marcos_and",
      },
      {
        id: "insta-msg-7",
        message: "Gostaria de falar com um humano",
        dateCreated: new Date("2025-11-06T09:15:00Z"),
        isReply: false,
        senderName: "marcos_and",
      },
      {
        id: "insta-msg-8",
        message:
          "Claro, Marcos. Detectei um problema de login. Um chamado foi aberto e um de nossos atendentes irá assumir a conversa.",
        dateCreated: new Date("2025-11-06T09:15:30Z"),
        isReply: true,
        senderName: "IA",
      },
    ],
  },
  {
    id: "insta-3",
    name: "Lucas Almeida",
    username: "lucas.tech",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Lucas+Almeida&background=3b82f6&color=fff",
    status: 1,
    lastMessageText: "Integra com a API do Bling?", // CORRIGIDO
    dateCreated: new Date("2025-11-05T14:30:00Z"),
    last_message_date: "2025-11-05T14:30:30Z", // ADICIONADO
    messages: [
      {
        id: "insta-msg-9",
        message: "Integra com a API do Bling?",
        dateCreated: new Date("2025-11-05T14:30:00Z"),
        isReply: false,
        senderName: "lucas.tech",
      },
      {
        id: "insta-msg-10",
        message:
          "Olá, Lucas! Atualmente, nossa integração principal é com o Asaas, mas a integração com o Bling está em nosso roadmap para o próximo trimestre.",
        dateCreated: new Date("2025-11-05T14:30:30Z"),
        isReply: true,
        senderName: "IA",
      },
    ],
  },
  {
    id: "insta-4",
    name: "Beatriz Costa",
    username: "design.bia",
    avatarUrl:
      "https://ui-avatars.com/api/?name=Beatriz+Costa&background=a855f7&color=fff",
    status: 1,
    lastMessageText: "Olá! Adorei o projeto.", // CORRIGIDO
    dateCreated: new Date("2025-11-04T18:00:00Z"),
    last_message_date: "2025-11-04T18:00:00Z", // ADICIONADO
    messages: [
      {
        id: "insta-msg-11",
        message: "Olá! Adorei o projeto.",
        dateCreated: new Date("2025-11-04T18:00:00Z"),
        isReply: false,
        senderName: "design.bia",
      },
    ],
  },
];


export const mockedClientsPlataformaApp: ClientPlataformaApp[] = [
  {
    id: "client-1",
    name: "Ana Pereira",
    email: "ana.p@email.com",
    cpf: "111.222.333-44",
    status: 1,
    lastMessageText: "Perfeito, muito obrigada!", // CORRIGIDO
    dateCreated: new Date("2025-11-06T11:05:00Z"),
    messages: [
      {
        id: "client-msg-1",
        message: "Não consigo ver meu extrato.",
        dateCreated: new Date("2025-11-06T11:00:00Z"),
        isReply: false,
        senderName: "Ana Pereira",
      },
      {
        id: "client-msg-2",
        message:
          "Olá, Ana. Sinto muito por isso. Verifiquei que seu extrato de Outubro está sendo processado. Deve aparecer em até 1 hora. Enquanto isso, posso ajudar com algo mais?",
        dateCreated: new Date("2025-11-06T11:00:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "client-msg-novo-1",
        message: "Na verdade sim. Pode me gerar um relatório de valorização dos meus 3 contratos este mês?",
        dateCreated: new Date("2025-11-06T11:03:00Z"),
        isReply: false,
        senderName: "Ana Pereira",
      },
      {
        id: "client-msg-novo-2",
        message: `Claro, Ana! Aqui está o relatório de valorização dos seus contratos para o mês de Outubro:<br><br><table><thead><tr><th>Contrato</th><th>Valor Atual</th><th>Valorização (Mês)</th></tr></thead><tbody><tr><td>CTR-001 (FII XPTO)</td><td>R$ 10.450,00</td><td>+4.5%</td></tr><tr><td>CTR-002 (Ações ABC)</td><td>R$ 5.120,00</td><td>+2.1%</td></tr><tr><td>CTR-003 (CDB Pré)</td><td>R$ 20.180,00</td><td>+0.9%</td></tr></tbody></table><br>Posso ajudar com mais alguma informação?`,
        dateCreated: new Date("2025-11-06T11:04:00Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "client-msg-novo-3",
        message: "Perfeito, muito obrigada!",
        dateCreated: new Date("2025-11-06T11:05:00Z"),
        isReply: false,
        senderName: "Ana Pereira",
      },
    ],
  },
  {
    id: "client-2",
    name: "Bruno Costa",
    email: "bruno.costa@email.com",
    cpf: "222.333.444-55",
    status: 1,
    lastMessageText: "Ok, vou aguardar.", // CORRIGIDO
    dateCreated: new Date("2025-11-05T16:01:00Z"),
    messages: [
      {
        id: "client-msg-3",
        message: "Meu PIX não caiu.",
        dateCreated: new Date("2025-11-05T16:00:00Z"),
        isReply: false,
        senderName: "Bruno Costa",
      },
      {
        id: "client-msg-4",
        message: "Olá, Bruno. Verifiquei uma instabilidade em nosso sistema de PIX. Um chamado foi aberto (CH-4) e nossa equipe técnica já está trabalhando nisso. O valor será creditado em breve.",
        dateCreated: new Date("2025-11-05T16:00:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "client-msg-5",
        message: "Ok, vou aguardar.",
        dateCreated: new Date("2025-11-05T16:01:00Z"),
        isReply: false,
        senderName: "Bruno Costa",
      },
    ],
  },
];

export const mockedChamados: Chamado[] = [
  {
    id: "chamado-1",
    leadId: "insta-1", 
    name: "Joana Santos",
    cpf: "123.456.789-00",
    descricao:
      "Cliente não consegue acessar o plano pro. Relata erro de pagamento.",
    dateCreated: new Date("2025-11-06T10:05:00Z"),
  },
  {
    id: "chamado-2",
    leadId: "insta-2", 
    name: "Marcos Andrade",
    cpf: "987.654.321-11",
    descricao:
      "Solicitou falar com um atendente humano para resolver um problema de login.",
    dateCreated: new Date("2025-11-06T09:16:00Z"),
  },
  {
    id: "chamado-3",
    leadId: "client-1", 
    name: "Ana Pereira",
    cpf: "111.222.333-44",
    descricao:
      "IA detectou que o extrato da cliente está atrasado. Necessita verificação manual.",
    dateCreated: new Date("2025-11-06T11:01:00Z"),
  },
  {
    id: "chamado-4",
    leadId: "client-2", 
    name: "Bruno Costa",
    cpf: "222.333.444-55",
    descricao:
      "PIX enviado há mais de 30 minutos e não creditado. Verificar sistema.",
    dateCreated: new Date("2025-11-05T16:05:00Z"),
  },
  {
    id: "chamado-5",
    leadId: "insta-1", 
    name: "Joana Santos",
    cpf: "123.456.789-00",
    descricao:
      "Cliente informa que, além do pagamento, seu nome está errado no cadastro.",
    dateCreated: new Date("2025-11-06T14:00:00Z"),
  },
];

export const mockedLeadsWebsite: LeadWebsite[] = [
  {
    id: "web-1",
    name: "Carlos Oliveira",
    status: 2,
    lastMessageText: "Obrigado! Vou analisar.", // CORRIGIDO
    dateCreated: new Date("2025-11-07T11:30:00Z"), 
    city: "São Paulo",
    ipAddress: "189.12.34.56",
    messages: [
      {
        id: "web-msg-1",
        message: "Olá, gostaria de fazer uma simulação.",
        dateCreated: new Date("2025-11-07T11:28:00Z"),
        isReply: false,
        senderName: "Carlos Oliveira",
      },
      {
        id: "web-msg-2",
        message:
          "Claro, Carlos! Para começar, me diga o valor que deseja simular.",
        dateCreated: new Date("2025-11-07T11:28:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "web-msg-3",
        message: "R$ 15.000,00",
        dateCreated: new Date("2025-11-07T11:29:00Z"),
        isReply: false,
        senderName: "Carlos Oliveira",
      },
      {
        id: "web-msg-4",
        message:
          "Para R$ 15.000,00, nossos planos de investimento sugerem uma rentabilidade estimada de 1.2% ao mês. Deseja ver mais detalhes?",
        dateCreated: new Date("2025-11-07T11:29:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "web-msg-5",
        message: "Obrigado! Vou analisar.",
        dateCreated: new Date("2025-11-07T11:30:00Z"),
        isReply: false,
        senderName: "Carlos Oliveira",
      },
    ],
  },
  {
    id: "web-2",
    name: "Fernanda Lima",
    status: 1,
    lastMessageText: "Entendido, vou aguardar.", // CORRIGIDO
    dateCreated: new Date("2025-11-06T15:20:00Z"), 
    city: "Rio de Janeiro",
    ipAddress: "200.11.22.33",
    messages: [
      {
        id: "web-msg-6",
        message: "Qual o melhor plano para MEI?",
        dateCreated: new Date("2025-11-06T15:20:00Z"),
        isReply: false,
        senderName: "Fernanda Lima",
      },
      {
        id: "web-msg-7",
        message:
          "Olá, Fernanda! Nosso plano mais recomendado para MEI é o 'Plano Empreendedor'. Ele oferece 50 TIDs gratuitas e taxas reduzidas. Um de nossos consultores entrará em contato em breve.",
        dateCreated: new Date("2025-11-06T15:20:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "web-msg-8",
        message: "Entendido, vou aguardar.",
        dateCreated: new Date("2025-11-06T15:21:00Z"),
        isReply: false,
        senderName: "Fernanda Lima",
      },
    ],
  },
  {
    id: "web-3",
    name: "Ricardo Mendes",
    status: 1,
    lastMessageText: "Preciso de suporte técnico.", // CORRIGIDO
    dateCreated: new Date("2025-11-07T09:10:00Z"), 
    city: "Belo Horizonte",
    ipAddress: "177.55.66.77",
    messages: [
      {
        id: "web-msg-9",
        message: "Estou tentando integrar a API mas estou recebendo erro 401.",
        dateCreated: new Date("2025-11-07T09:09:00Z"),
        isReply: false,
        senderName: "Ricardo Mendes",
      },
      {
        id: "web-msg-10",
        message: "Preciso de suporte técnico.",
        dateCreated: new Date("2025-11-07T09:10:00Z"),
        isReply: false,
        senderName: "Ricardo Mendes",
      },
      {
        id: "web-msg-11",
        message:
          "Olá, Ricardo. O erro 401 (Unauthorized) geralmente indica que sua Chave de API está incorreta ou expirou. Por favor, verifique sua chave no painel de desenvolvedor. Se o erro persistir, um chamado será aberto.",
        dateCreated: new Date("2025-11-07T09:10:30Z"),
        isReply: true,
        senderName: "IA",
      },
    ],
  },
  {
    id: "web-4",
    name: "Visitante Anônimo",
    status: 1,
    lastMessageText: "Quanto custa?", // CORRIGIDO
    dateCreated: new Date("2025-11-05T10:00:00Z"), 
    city: "Curitiba",
    ipAddress: "199.88.77.66",
    messages: [
      {
        id: "web-msg-12",
        message: "Quanto custa?",
        dateCreated: new Date("2025-11-05T10:00:00Z"),
        isReply: false,
        senderName: "Visitante Anônimo",
      },
      {
        id: "web-msg-13",
        message:
          "Olá! Nossos planos começam em R$ 49,90. Posso ajudar a encontrar o plano ideal para você?",
        dateCreated: new Date("2025-11-05T10:00:30Z"),
        isReply: true,
        senderName: "IA",
      },
    ],
  },
];