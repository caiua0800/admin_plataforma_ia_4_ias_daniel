import { useState } from "react";
import { useAdmin } from "../../contexts/AdminContext"; // Usando o Contexto!

export function Usuarios() {
  const { admins, addAdmin } = useAdmin();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // ... (Restante do código da página de usuários é idêntico ao da resposta com Tailwind, apenas adapte o JSX para usar styled-components se desejar)

  // Para simplificar, vamos usar um JSX simples sem styled-components aqui
  return (
    <div>
      <h1>Gerenciamento de Usuários</h1>
      <h2>Administradores ({admins.length}/5)</h2>
      <ul>
        {" "}
        {admins.map((admin) => (
          <li key={admin.id}>
            {admin.name} ({admin.email})
          </li>
        ))}{" "}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addAdmin({ name, email });
        }}
      >
        <h3>Novo Administrador</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit" disabled={admins.length >= 5}>
          Adicionar
        </button>
      </form>
    </div>
  );
}
