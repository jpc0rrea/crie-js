import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import Input from "../../components/Input";
import InitialSkeleton from "../../components/InitialSkeleton";
import api from "../../utils/api";
import handleErrors from "../../utils/handleErrors";
import isEmail from "../../utils/isEmail";
import isPassword from "../../utils/isPassword";

import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emailMessage = handleErrors("email", email, isEmail);
    const passwordMessage = handleErrors("password", password, isPassword);
    const newErrors = {
      email: emailMessage,
      password: passwordMessage,
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      api
        .post("login", {
          email,
          password,
        })
        .then((response) => {
          setLoading(false);
          console.log(response.data);
          alert("Usuário logado com sucesso!");
        })
        .catch((err) => {
          setLoading(false);
          // Adicionar a classe error no email e na senha
          // Possíveis erros:
          // 1 - { error: "auth/too-many-requests" }
          // 2 - { message: "Usuário não encontrado" }
          // 3 - { message: "Senha incorreta" }
          console.log(err.response.data);
        });
    } else {
      setLoading(false);
    }
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
        <div className="buttonAndSpinner">
          {loading && (
            <Spinner
              animation="border"
              variant="outline-info"
              role="status"
              className="progressSpinner"
              aria-hidden="true"
            />
          )}
          <button type="submit">Entrar</button>
        </div>
      </form>
    </InitialSkeleton>
  );
}

export default Login;
