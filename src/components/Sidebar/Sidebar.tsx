// src/components/Sidebar/Sidebar.tsx
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  DocumentTextIcon,
  SparklesIcon, // <-- Ícone novo e mais apropriado
} from "@heroicons/react/24/outline";
import * as S from "./Sidebar.styles";

// Nova estrutura de navegação com grupos
const navigationGroups = [
  {
    title: "GERAL",
    links: [{ name: "Dashboard", href: "/", icon: ChartBarIcon }],
  },
  {
    title: "ATENDIMENTO",
    links: [
      {
        name: "Leads Instagram",
        href: "/leads-instagram",
        icon: ChatBubbleLeftRightIcon,
      },
      {
        name: "Leads Website",
        href: "/leads-website",
        icon: ChatBubbleLeftRightIcon,
      },
      {
        name: "Clientes Plataforma & App",
        href: "/clientes",
        icon: ChatBubbleLeftRightIcon,
      },
    ],
  },
  {
    title: "ADMINISTRAÇÃO",
    links: [
      { name: "Usuários", href: "/usuarios", icon: UsersIcon },
      // --- MUDANÇA AQUI ---
      { name: "IA Interna", href: "/relatorios", icon: SparklesIcon }, 
      // Mantive a rota /relatorios, mas mudei o nome e o ícone
    ],
  },
];

export function Sidebar() {
  return (
    <S.Container>
      <S.Header>
        <S.Logo>AI</S.Logo>
        <S.Title>Admin AI</S.Title>
      </S.Header>
      <S.Nav>
        {navigationGroups.map((group) => (
          <S.Section key={group.title}>
            <S.SectionTitle>{group.title}</S.SectionTitle>
            {group.links.map((item) => (
              <S.StyledNavLink key={item.name} to={item.href}>
                <item.icon /> {item.name}
              </S.StyledNavLink>
            ))}
          </S.Section>
        ))}
      </S.Nav>
    </S.Container>
  );
}