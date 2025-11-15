// src/components/Sidebar/Sidebar.tsx
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  SparklesIcon,
  ArrowRightOnRectangleIcon, // 1. Importar ícone de Sair
} from "@heroicons/react/24/outline";
import * as S from "./Sidebar.styles";
import { useNavigate } from "react-router-dom"; // 2. Importar useNavigate

// ... (navigationGroups permanece igual)
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


export function Sidebar() {
  // 3. Hook para navegação
  const navigate = useNavigate();

  // 4. Função de Logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <S.Container>
      <S.Header>
        <S.Logo>AI</S.Logo>
        <S.Title>Admin AI</S.Title>
      </S.Header>
      
      {/* Navegação principal */}
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

      {/* 5. Adicionar o Footer com o botão de Sair */}
      <S.Footer>
        <S.LogoutButton onClick={handleLogout}>
          <ArrowRightOnRectangleIcon />
          Sair
        </S.LogoutButton>
      </S.Footer>
    </S.Container>
  );
}