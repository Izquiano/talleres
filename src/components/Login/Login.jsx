import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuthContext } from "../../contexts/AuthContext";
import LinkButton from "../LinkButton/LinkButton";

import { login } from "../../services/ApiClient";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });


  const [redirectTo, setRedirecTo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState()

  const authContext = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(state)
      .then((response) => {
        
        authContext.login(response);
        

        setRedirecTo(true);
      })
      .catch((err) =>
        setErrors(err.response.data.message)
       
       );
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

  if (redirectTo) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="loginContainer">
      <h1>Iniciar sesión</h1>
  {errors ? <div className="error">{errors}</div>: null}
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
          onClick={showPassword}
          name="password"
          placeholder="Contraseña"
          icon="password"
          onChange={handleChange}
          value={state.password}
        />
        <Button type="submit" text="Entrar" />
      </form>

      <p>O inicia sesión con</p>
      <div className="socialLogin">
        <LinkButton
          href={`${process.env.REACT_APP_API_URL}/auth/google`}
          text="Google"
          icon="google"
        />
        {/* <LinkButton href="/auth/facebook" text="Facebook" icon="facebook" /> */}
      </div>

      <div className="footer">
        <p>¿Aún no estás registrado?</p>
        <Link to="/signup">Regístrate</Link>
      </div>
    </div>
  );
};

export default Login;
