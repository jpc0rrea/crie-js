import React, { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import InitialSkeleton from "../../components/InitialSkeleton";

import isEmail from "../../utils/isEmail";

import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleErrors = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    // Validações

    // E-mail vazio
    if (!email) {
      newErrors.email = "Esse campo não pode estar vazio";
    } else if (!isEmail(email)) {
      // Validar se o email é válido
      newErrors.email = "E-mail inválido";
    }

    // Senha vazia
    if (!password) {
      newErrors.password = "Esse campo não pode estar vazio";
    } else if (password.length < 6) {
      // Validar se a senha tem mais de 6 caracteres
      newErrors.password = "A senha deve ser maior que 6 caracteres";
    }

    setErrors(newErrors);

    const emailInputElement = document.getElementById("email");
    const passwordInputElement = document.getElementById("password");

    if (newErrors.email) {
      emailInputElement.classList.add("error");
    } else {
      emailInputElement.classList.remove("error");
    }

    if (newErrors.password) {
      passwordInputElement.classList.add("error");
    } else {
      passwordInputElement.classList.remove("error");
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = handleErrors();
    console.log(errors);
    console.log(newErrors);
  };

  return (
    <InitialSkeleton>
      <div className="welcome-texts">
        <h1 className="page-title">Crie</h1>
        <h1>Bem vindo!</h1>
        <p>Faça login para entrar no sistema de inovação da sua empresa!</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          id="email"
          placeholder="E-mail"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {errors.email && (
          <div className="inputError">
            <p>{errors.email}</p>
          </div>
        )}

        <Input
          type="password"
          id="password"
          placeholder="Senha"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {errors.password && (
          <div className="inputError">
            <p>{errors.password}</p>
          </div>
        )}

        <Link to="/forgotpassword">Esqueci minha senha</Link>
        <Link to="/signup">Criar conta</Link>

        <button type="submit">Entrar</button>
      </form>
    </InitialSkeleton>
  );
}

export default Login;
