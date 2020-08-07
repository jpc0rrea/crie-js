import React from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import InitialSkeleton from "../../components/InitialSkeleton";

import "./styles.css";

function Login() {
  return (
    <InitialSkeleton>
      <div className="welcome-texts">
        <h1 className="page-title">Crie</h1>
        <h1>Bem vindo!</h1>
        <p>Faça login para entrar no sistema de inovação da sua empresa!</p>
      </div>
      <form className="login-form">
        <Input id="email" placeholder="E-mail" />

        <Input type="password" id="password" placeholder="Senha" />

        <Link to="/forgotpassword">Esqueci minha senha</Link>
        <Link to="/signup">Criar conta</Link>

        <button type="submit">Entrar</button>
      </form>
    </InitialSkeleton>
  );
}

export default Login;
