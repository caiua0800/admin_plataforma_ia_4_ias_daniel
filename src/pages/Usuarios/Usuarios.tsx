// src/pages/Usuarios/Usuarios.tsx
import { type FormEvent, useState, useEffect } from "react"; // type
import { useAdmin } from "../../contexts/AdminContext";
import { 
  UserPlusIcon, 
  PencilIcon, 
  TrashIcon, 
  KeyIcon 
} from "@heroicons/react/24/solid";
import { Modal } from "../../components/Modal/Modal";
import * as S from "./Usuarios.styles";
import type { User } from "../../types";

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#fff' }}>
    Carregando usuários...
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div style={{ padding: '20px', color: '#f87171', textAlign: 'center' }}>
    {message}
  </div>
);

export function Usuarios() {
  const { 
    admins, 
    addAdmin, 
    updateAdmin, 
    removeAdmin, 
    changePassword, 
    refreshAdmins, // 2. Pegar a função de refresh
    isLoading, 
    error 
  } = useAdmin();
  
  // 3. Adicionar useEffect para carregar dados ao entrar na página
  useEffect(() => {
    refreshAdmins();
  }, [refreshAdmins]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [modalError, setModalError] = useState<string | null>(null);

  const [passEmail, setPassEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const cleanForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setModalError(null);
    setEditingUser(null);
  };

  const cleanPasswordForm = () => {
    setPassEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setModalError(null);
  };

  const handleOpenCreateModal = () => {
    cleanForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    cleanForm();
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setIsModalOpen(true);
  };

  const handleOpenPasswordModal = (user: User) => {
    cleanPasswordForm();
    setPassEmail(user.email);
    setIsPasswordModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    cleanForm();
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    cleanPasswordForm();
  };

  const handleSaveUser = async (e: FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!name || !email) {
      setModalError("Nome e E-mail são obrigatórios.");
      return;
    }

    let result;

    if (editingUser) {
      result = await updateAdmin(editingUser.id, name, email);
    } else {
      if (!password) {
        setModalError("Senha é obrigatória para novos usuários.");
        return;
      }
      result = await addAdmin({ name, email, password });
    }

    if (result.success) {
      handleCloseModal();
    } else {
      setModalError(result.message || "Erro ao salvar usuário.");
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
      const result = await removeAdmin(user.id);
      if (!result.success) {
        alert(result.message || "Erro ao excluir usuário.");
      }
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!currentPassword || !newPassword) {
      setModalError("Preencha todos os campos de senha.");
      return;
    }

    const result = await changePassword(passEmail, currentPassword, newPassword);

    if (result.success) {
      alert("Senha alterada com sucesso!");
      handleClosePasswordModal();
    } else {
      setModalError(result.message || "Erro ao alterar senha.");
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;

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
                    <button onClick={() => handleOpenEditModal(admin)} title="Editar">
                      <PencilIcon />
                    </button>
                    <button onClick={() => handleOpenPasswordModal(admin)} title="Trocar Senha">
                      <KeyIcon />
                    </button>
                    <button onClick={() => handleDeleteUser(admin)} title="Excluir" style={{ color: '#f87171' }}>
                      <TrashIcon />
                    </button>
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
              <S.AddButton onClick={handleOpenCreateModal}>
                <UserPlusIcon />
                Adicionar Usuário
              </S.AddButton>
            </S.Header>
            {renderContent()}
          </S.InnerWrapper>
        </S.GlassGap>
      </S.OuterBorder>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingUser ? "Editar Usuário" : "Cadastrar Novo Usuário"}
      >
        <S.ModalForm onSubmit={handleSaveUser}>
          <S.InputGroup>
            <label htmlFor="name">Nome Completo</label>
            <S.Input 
              id="name" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </S.InputGroup>
          <S.InputGroup>
            <label htmlFor="email">E-mail</label>
            <S.Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </S.InputGroup>
          {!editingUser && (
            <S.InputGroup>
              <label htmlFor="password">Senha Inicial</label>
              <S.Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </S.InputGroup>
          )}
          {modalError && (
            <p style={{ color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>{modalError}</p>
          )}
          <S.ModalButton type="submit">
            {editingUser ? "Salvar Alterações" : "Cadastrar"}
          </S.ModalButton>
        </S.ModalForm>
      </Modal>

      <Modal 
        isOpen={isPasswordModalOpen} 
        onClose={handleClosePasswordModal} 
        title="Trocar Senha"
      >
        <S.ModalForm onSubmit={handleChangePassword}>
          <S.InputGroup>
            <label>E-mail</label>
            <S.Input type="email" value={passEmail} disabled style={{ opacity: 0.7 }} />
          </S.InputGroup>
          <S.InputGroup>
            <label>Senha Atual (do Usuário)</label>
            <S.Input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Digite a senha atual"
            />
          </S.InputGroup>
          <S.InputGroup>
            <label>Nova Senha</label>
            <S.Input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Digite a nova senha"
            />
          </S.InputGroup>
          {modalError && (
            <p style={{ color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>{modalError}</p>
          )}
          <S.ModalButton type="submit">Atualizar Senha</S.ModalButton>
        </S.ModalForm>
      </Modal>
    </>
  );
}