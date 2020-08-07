import React from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import InitialSkeleton from "../../components/InitialSkeleton";

import "./styles.css";

function ForgotPassword() {
  return (
    <InitialSkeleton>
      <div className="help-texts">
        <h1 className="page-title">Crie</h1>
        <h1>Esqueceu sua senha?</h1>
        <p>
          Digite seu e-mail abaixo e te enviaremos o link para resetar sua
          senha.
        </p>
      </div>
      <form className="forgotPassword-form">
        <Input id="email" placeholder="E-mail" />

        <button type="submit">Enviar Link</button>

        <Link to="/login">Voltar para login</Link>
      </form>
    </InitialSkeleton>
  );
}

export default ForgotPassword;
