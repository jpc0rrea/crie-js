import React from "react";

import { Link } from "react-router-dom";

import "./styles.css";

import loginImg from "../../assets/images/landing.svg";

function ForgotPassword() {
  return (
    <div id="page-forgotPassword">
      <div id="page-forgotPassword-content">
        <div id="left-side">
          <div className="help-texts">
            <h1 className="page-title">Crie</h1>
            <h1>Esqueceu sua senha?</h1>
            <p>
              Digite seu e-mail abaixo e te enviaremos o link para resetar sua
              senha.
            </p>
          </div>
          <form className="forgotPassword-form">
            <div className="input-block">
              <input type="text" id="email" placeholder="E-mail" />
            </div>

            <button type="submit">Enviar Link</button>

            <Link to="/login">Voltar para login</Link>
          </form>
        </div>
        <div id="right-side">
          <img id="login-image" src={loginImg} alt="Inovação" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
