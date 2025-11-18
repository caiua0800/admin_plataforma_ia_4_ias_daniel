// src/pages/Login/Login.tsx
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import * as S from "./Login.styles";
// 1. Importar a função de login da sua API de autenticação
import { loginUser } from "../../servers/authApi";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // 2. A função de login DEVE ser async
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 3. Chamar a API de login
      // A função 'loginUser' (que vamos corrigir) agora salva os tokens
      await loginUser(email, password);

      // 4. Redirecionar para a dashboard APÓS o sucesso
      navigate("/");

    } catch (err: any) {
      // 5. Se a API falhar (senha errada), mostrar o erro
      console.error("Erro no login:", err);
      setError(err.message || "E-mail ou senha inválidos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.LoginBox>
        <S.Logo>AI</S.Logo>
        <S.Title>Bem-vindo de volta</S.Title>
        <S.Subtitle>Acesse o painel de controle do seu sistema.</S.Subtitle>

        <S.Form onSubmit={handleLogin}>
          <S.InputWrapper>
            <S.InputIcon>
              <EnvelopeIcon />
            </S.InputIcon>
            <S.Input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </S.InputWrapper>

          <S.InputWrapper>
            <S.InputIcon>
              <LockClosedIcon />
            </S.InputIcon>
            <S.Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </S.InputWrapper>

          {/* 6. Mostrar a mensagem de erro da API */}
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

          <S.ForgotPassword href="#">
            Esqueceu sua senha?
          </S.ForgotPassword>

          {/* 7. Mostrar "Entrando..." no botão */}
          <S.LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </S.LoginButton>
        </S.Form>
      </S.LoginBox>
    </S.Container>
  );
}