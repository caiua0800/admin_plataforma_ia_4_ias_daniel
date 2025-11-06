import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import * as S from "./Sidebar.styles";

const navigation = [
  { name: "Dashboard", href: "/", icon: ChartBarIcon },
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
  { name: "Usuários", href: "/usuarios", icon: UsersIcon },
  { name: "Relatórios", href: "/relatorios", icon: DocumentTextIcon },
];

export function Sidebar() {
  return (
    <S.Container>
      {" "}
      <S.Header>
        {" "}
        <S.Title>Admin AI</S.Title>{" "}
      </S.Header>{" "}
      <S.Nav>
        {" "}
        {navigation.map((item) => (
          <S.StyledNavLink key={item.name} to={item.href}>
            {" "}
            <item.icon /> {item.name}{" "}
          </S.StyledNavLink>
        ))}{" "}
      </S.Nav>{" "}
    </S.Container>
  );
}
