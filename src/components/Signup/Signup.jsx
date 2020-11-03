import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
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
  const [error, SetError] = useState("")
  const [redirectTo, setRedirectTo] = useState(false)

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
        
        if(response.error) {
          SetError(response.error)
        } else {
          setRedirectTo(true)
        }
      })
      .catch((error) => console.error(error));
  };
 if(redirectTo){
   return <Redirect to="/login" />
 }
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
        { error.name ? <div className="error"> {error.name.message} </div>: null}
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={state.email}
        />
        { error.email ? <div className="error"> {error.email.message} </div>: null}
        <Input
          type={visible ? "text" : "password"}
          onClick={showPassword}
          name="password"
          placeholder="Contraseña"
          icon="password"
          onChange={handleChange}
          value={state.password}
        />
        { error.password ? <div className="error"> {error.password.message} </div>: null}

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
