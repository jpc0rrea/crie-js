import React from "react";
import { Link } from "react-router-dom";

import InitialSkeleton from "../../components/InitialSkeleton";

import "./styles.css";

function Signup() {
  return (
    <InitialSkeleton>
      <div className="create-texts">
        <h1 className="page-title">Crie</h1>
        <h1>Crie sua conta</h1>
        <p>Os administradores da sua empresa precisam aprovar sua conta.</p>
      </div>
      <form className="signUp-form">
        <div className="input-block">
          <input type="text" id="email" placeholder="E-mail" />
        </div>
        <div className="input-block">
          <input type="text" id="cpf" placeholder="CPF" />
        </div>
        <div className="input-block">
          <input type="text" id="name" placeholder="Nome" />
        </div>
        <div className="input-block">
          <input type="text" id="lastName" placeholder="Sobrenome" />
        </div>
        <div className="input-block">
          <input type="password" id="password" placeholder="Senha" />
        </div>
        <div className="input-block">
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirmação de senha"
          />
        </div>
        <div className="input-block">
          <input type="text" id="acessCode" placeholder="Código de acesso" />
        </div>
        <button type="submit">Criar Conta</button>

        <Link to="/login">Voltar para login</Link>
      </form>
    </InitialSkeleton>
  );
}

export default Signup;
