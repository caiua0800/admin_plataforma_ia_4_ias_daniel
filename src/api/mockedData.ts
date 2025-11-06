import {
  LeadInstagram,
  LeadWebsite,
  ClientPlataformaApp,
  User,
} from "../types";

export const mockedUsers: User[] = [
  { id: "user-1", name: "Admin Principal", email: "admin@empresa.com" },
];
export const mockedLeadsInstagram: LeadInstagram[] = [
  {
    id: "insta-1",
    name: "joana.santos",
    status: 1,
    lastMessageTest: "Quanto custa o plano pro?",
    dateCreated: new Date("2025-11-02T10:00:00Z"),
    messages: [
      {
        id: "insta-msg-1",
        message: "Oi, tudo bem?",
        dateCreated: new Date("2025-11-02T09:59:00Z"),
        isReply: false,
        senderName: "joana.santos",
      },
      {
        id: "insta-msg-2",
        message:
          "Olá, Joana! Tudo bem e com você? Sou a assistente virtual. Como posso ajudar?",
        dateCreated: new Date("2025-11-02T09:59:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "insta-msg-3",
        message: "Quanto custa o plano pro?",
        dateCreated: new Date("2025-11-02T10:00:00Z"),
        isReply: false,
        senderName: "joana.santos",
      },
    ],
  },
];
export const mockedLeadsWebsite: LeadWebsite[] = [
  {
    id: "web-1",
    name: "Carlos Oliveira",
    status: 2,
    lastMessageTest: "Obrigado!",
    dateCreated: new Date("2025-11-01T15:30:00Z"),
    city: "São Paulo",
    ipAddress: "189.12.34.56",
    messages: [
      {
        id: "web-msg-1",
        message: "Olá, gostaria de fazer uma simulação.",
        dateCreated: new Date("2025-11-01T15:28:00Z"),
        isReply: false,
        senderName: "Carlos Oliveira",
      },
      {
        id: "web-msg-2",
        message:
          "Claro, Carlos! Para começar, me diga o valor que deseja simular.",
        dateCreated: new Date("2025-11-01T15:28:30Z"),
        isReply: true,
        senderName: "IA",
      },
      {
        id: "web-msg-3",
        message: "Obrigado!",
        dateCreated: new Date("2025-11-01T15:30:00Z"),
        isReply: false,
        senderName: "Carlos Oliveira",
      },
    ],
  },
];
export const mockedClientsPlataformaApp: ClientPlataformaApp[] = [
  {
    id: "client-1",
    name: "Ana Pereira",
    email: "ana.p@email.com",
    cpf: "123.456.789-00",
    status: 1,
    lastMessageTest: "Não consigo ver meu extrato.",
    dateCreated: new Date("2025-11-02T11:00:00Z"),
    messages: [
      {
        id: "client-msg-1",
        message: "Não consigo ver meu extrato.",
        dateCreated: new Date("2025-11-02T11:00:00Z"),
        isReply: false,
        senderName: "Ana Pereira",
      },
    ],
  },
];
