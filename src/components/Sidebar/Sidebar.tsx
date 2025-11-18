// src/components/Sidebar/Sidebar.tsx
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  SparklesIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import * as S from "./Sidebar.styles";
// 1. Remover useNavigate
// import { useNavigate } from "react-router-dom"; 

// ... (navigationGroups permanece igual) ...
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
      { name: "IA Interna", href: "/relatorios", icon: SparklesIcon }, 
    ],
  },
];

// 2. Adicionar a prop onLogoutClick
interface SidebarProps {
  onLogoutClick: () => void;
}

export function Sidebar({ onLogoutClick }: SidebarProps) {
  // 3. Remover useNavigate
  // const navigate = useNavigate();

  // 4. Função de Logout agora chama a prop
  const handleLogout = () => {
    onLogoutClick();
  };

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

      <S.Footer>
        <S.LogoutButton onClick={handleLogout}>
          <ArrowRightOnRectangleIcon />
          Sair
        </S.LogoutButton>
      </S.Footer>
    </S.Container>
  );
}