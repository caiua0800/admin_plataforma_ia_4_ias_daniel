// src/pages/Usuarios/Usuarios.tsx
import { FormEvent, useState } from "react";
// 1. O tipo importado permanece o mesmo
import { useAdmin, NewAdminData } from "../../contexts/AdminContext";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Modal } from "../../components/Modal/Modal";
import * as S from "./Usuarios.styles";

// Componente simples de Loading
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#fff' }}>
    Carregando usuários...
  </div>
);

// Componente simples de Erro
const ErrorDisplay = ({ message }: { message: string }) => (
  <div style={{ padding: '20px', color: '#f87171', textAlign: 'center' }}>
    {message}
  </div>
);

export function Usuarios() {
  // 2. Pegar os novos estados do contexto
  const { admins, addAdmin, isLoading, error } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Estado para o formulário (incluindo senha e erro)
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState(""); // <-- NOVO
  const [modalError, setModalError] = useState<string | null>(null); // <-- NOVO

  const cleanForm = () => {
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setModalError(null);
  }

  const handleOpenModal = () => {
    cleanForm();
    setIsModalOpen(true);
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    cleanForm();
  }

  // 3. Esta função permanece a mesma, pois já interage com a API via 'addAdmin'
  const handleAddUser = async (e: FormEvent) => {
    e.preventDefault();
    setModalError(null); // Limpa erros antigos

    if (newName && newEmail && newPassword) {
      const adminData: NewAdminData = {
        name: newName,
        email: newEmail,
        password: newPassword,
      };

      // 4. Chamar o contexto (que agora chama a API)
      const result = await addAdmin(adminData);

      // 5. Tratar o resultado
      if (result.success) {
        handleCloseModal(); // Sucesso, fecha o modal
      } else {
        // Falha, exibe a mensagem da API (ex: "E-mail já em uso")
        setModalError(result.message || "Erro ao cadastrar usuário.");
      }
    } else {
      setModalError("Todos os campos são obrigatórios.");
    }
  };

  // 4. Função para renderizar o conteúdo da tabela
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorDisplay message={error} />;
    }

    return (
      <S.TableContainer>
        <S.StyledTable>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Cargo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* O .map(admins) agora usa os dados da API */}
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  <S.UserInfo>
                    <S.Avatar src={`https://ui-avatars.com/api/?name=${admin.name.replace(' ', '+')}&background=4f46e5&color=fff`} />
                    <div>
                      <S.UserName>{admin.name}</S.UserName>
                      <S.UserEmail>{admin.email}</S.UserEmail>
                    </div>
                  </S.UserInfo>
                </td>
                <td>Administrador</td>
                <td>
                  <S.StatusBadge $isActive={true}>Ativo</S.StatusBadge>
                </td>
                <td>
                  <S.ActionButtons>
                    <button><PencilIcon /></button>
                    <button><TrashIcon /></button>
                  </S.ActionButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </S.StyledTable>
      </S.TableContainer>
    );
  };

  return (
    <>
      <S.OuterBorder>
        <S.GlassGap>
          <S.InnerWrapper>
            <S.Header>
              <S.Title>Gerenciamento de Usuários</S.Title>
              <S.AddButton onClick={handleOpenModal}>
                <UserPlusIcon />
                Adicionar Usuário
              </S.AddButton>
            </S.Header>
            
            {/* 5. Renderizar o conteúdo (Loading, Erro ou Tabela) */}
            {renderContent()}

          </S.InnerWrapper>
        </S.GlassGap>
      </S.OuterBorder>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title="Cadastrar Novo Usuário"
      >
        <S.ModalForm onSubmit={handleAddUser}>
          <S.InputGroup>
            <label htmlFor="name">Nome Completo</label>
            <S.Input 
              id="name" 
              type="text" 
              placeholder="Ex: Pedro Henrique" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </S.InputGroup>
          <S.InputGroup>
            <label htmlFor="email">E-mail</label>
            <S.Input 
              id="email" 
              type="email" 
              placeholder="Ex: pedro@email.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </S.InputGroup>
          
          {/* 6. Adicionar campo de Senha */}
          <S.InputGroup>
            <label htmlFor="password">Senha</label>
            <S.Input 
              id="password" 
              type="password" 
              placeholder="Mínimo 8 caracteres"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </S.InputGroup>
          
          {/* 7. Adicionar exibição de erro no modal */}
          {modalError && (
            <p style={{ color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>
              {modalError}
            </p>
          )}

          <S.ModalButton type="submit">
            Cadastrar
          </S.ModalButton>
        </S.ModalForm>
      </Modal>
    </>
  );
}