import React, { useState } from "react";
import { Link } from "react-router-dom";

import InitialSkeleton from "../../components/InitialSkeleton";
import Input from "../../components/Input";

import handleErrorsFrontEnd from "../../utils/handleErrorsFrontEnd";
import isEmail from "../../utils/isEmail";
import isPassword from "../../utils/isPassword";
import isAccessCode from "../../utils/isAccessCode";
import validateConfirmPassword from "../../utils/validateConfirmPassword";
import cpfMask from "../../utils/cpfMask";

import "./styles.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acessCode, setAcessCode] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    cpf: "",
    name: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    acessCode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let emailMessage = handleErrorsFrontEnd("email", email, isEmail);
    let cpfMessage = handleErrorsFrontEnd("cpf", cpf);
    let nameMessage = handleErrorsFrontEnd("name", name);
    let lastNameMessage = handleErrorsFrontEnd("lastName", lastName);
    let passwordMessage = handleErrorsFrontEnd(
      "password",
      password,
      isPassword
    );
    let confirmPasswordMessage = handleErrorsFrontEnd(
      "confirmPassword",
      confirmPassword
    );
    let acessCodeMessage = handleErrorsFrontEnd(
      "acessCode",
      acessCode,
      isAccessCode
    );

    [passwordMessage, confirmPasswordMessage] = validateConfirmPassword(
      password,
      confirmPassword,
      passwordMessage,
      confirmPasswordMessage
    );

    const newErrors = {
      email: emailMessage,
      cpf: cpfMessage,
      name: nameMessage,
      lastName: lastNameMessage,
      password: passwordMessage,
      confirmPassword: confirmPasswordMessage,
      acessCode: acessCodeMessage,
    };

    setErrors(newErrors);
  };

  return (
    <InitialSkeleton>
      <div className="create-texts">
        <h1 className="page-title">Crie</h1>
        <h1>Crie sua conta</h1>
        <p>Os administradores da sua empresa precisam aprovar sua conta.</p>
      </div>
      <form className="signUp-form" onSubmit={handleSubmit}>
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
          id="cpf"
          placeholder="CPF"
          onChange={(event) => {
            setCpf(cpfMask(event.target.value));
          }}
          value={cpf}
        />
        {errors.cpf && (
          <div className="inputError">
            <p>{errors.cpf}</p>
          </div>
        )}
        <Input
          id="name"
          placeholder="Nome"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {errors.name && (
          <div className="inputError">
            <p>{errors.name}</p>
          </div>
        )}
        <Input
          id="lastName"
          placeholder="Sobrenome"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        {errors.lastName && (
          <div className="inputError">
            <p>{errors.lastName}</p>
          </div>
        )}
        <Input
          id="password"
          type="password"
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
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        {errors.confirmPassword && (
          <div className="inputError">
            <p>{errors.confirmPassword}</p>
          </div>
        )}
        <Input
          id="acessCode"
          placeholder="Código de acesso"
          onChange={(event) => {
            setAcessCode(event.target.value);
          }}
        />
        {errors.acessCode && (
          <div className="inputError">
            <p>{errors.acessCode}</p>
          </div>
        )}

        <button type="submit">Criar Conta</button>

        <Link to="/login">Voltar para login</Link>
      </form>
    </InitialSkeleton>
  );
}

export default Signup;
