import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import * as S from './Login.styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // AQUI vai a sua lógica de autenticação.
    // Por exemplo, chamar a API, verificar o usuário e a senha.
    
    // Se o login for bem-sucedido, redirecione para a dashboard:
    console.log('Tentativa de login com:', { email, password });
    navigate('/'); // Redireciona para a rota principal (dashboard)
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
            />
          </S.InputWrapper>

          <S.ForgotPassword href="#">
            Esqueceu sua senha?
          </S.ForgotPassword>

          <S.LoginButton type="submit">
            Entrar
          </S.LoginButton>
        </S.Form>
      </S.LoginBox>
    </S.Container>
  );
}