import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuthContext } from "../../contexts/AuthContext"; 

import { login } from "../../services/ApiClient";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);

  const authContext = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(state).then((response) => {
      authContext.login(response);
      console.log(response);
      window.location.assign("/home");
    });
  };

  const handleChange = (e) => {
    // setState({
    //   [e.target.name]: e.target.value,
    // });
    const { name, value } = e.target;
    setState((prev) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const showPassword = () => {
    setVisible(!visible);
  };

  return (
    <div className="loginContainer">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type={state.visible}
          name="email"
          placeholder="Email"
          icon="user"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          type={visible ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          icon="password"
          onChange={handleChange}
          value={state.password}
          onClick={showPassword}
        />
        <Button type="submit" text="Entrar" />
      </form>

      <div className="footer">
        <p>¿Aún no estás registrado?</p>
        <Link to="/signup">Regístrate</Link>
      </div>
    </div>
  );
};

export default Login;
