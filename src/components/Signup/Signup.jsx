import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

import { signup } from "../../services/ApiClient";

const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);

  const showPassword = () => {
    setVisible(!visible);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(state)
      .then((response) => {
        window.location.assign("/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="loginContainer">
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={state.name}
        />
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          type={visible ? "text" : "password"}
          onClick={showPassword}
          name="password"
          placeholder="Contraseña"
          icon="password"
          onChange={handleChange}
          value={state.password}
        />

        <Button type="submit" text="Enviar" />
      </form>

      {/* <p>O inicia sesión con</p>
        <div className="socialLogin">
          <LinkButton href={`${process.env.REACT_APP_API_URL}/auth/google`} text="Google" icon="google" />
          <LinkButton href="/auth/facebook" text="Facebook" icon="facebook" />
        </div> */}

      <div className="footer">
        <p>¿Ya estás registrado?</p>
        <Link to="/login">Inicia sesión aquí</Link>
      </div>
    </div>
  );
};

export default Signup;
