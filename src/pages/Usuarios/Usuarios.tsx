import { FormEvent, useState } from "react";
import { useAdmin } from "../../contexts/AdminContext";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Modal } from "../../components/Modal/Modal";
import * as S from "./Usuarios.styles";

export function Usuarios() {
  const { admins, addAdmin } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para o formulário do novo usuário
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    if (newName && newEmail) {
      addAdmin({ name: newName, email: newEmail });
      setNewName("");
      setNewEmail("");
      handleCloseModal();
    }
  }

  return (
    <>
      <S.OuterBorder>
        <S.GlassGap>
          <S.InnerWrapper>
            <S.Header>
              <S.Title>Gerenciamento de Usuários</S.Title>
              <S.AddButton onClick={handleOpenModal} disabled={admins.length >= 5}>
                <UserPlusIcon />
                Adicionar Usuário
              </S.AddButton>
            </S.Header>

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
                          <button><PencilIcon /></button>
                          <button><TrashIcon /></button>
                        </S.ActionButtons>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </S.StyledTable>
            </S.TableContainer>
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
          <S.ModalButton type="submit">
            Cadastrar
          </S.ModalButton>
        </S.ModalForm>
      </Modal>
    </>
  );
}