import React from "react";
import { Link} from "react-router-dom";
import "./Signup.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import LinkButton from "../LinkButton/LinkButton";

import { signup } from "../../services/ApiClient";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    signup(this.state)
      .then((response) => {
        window.location.assign("/login");
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div className="loginContainer">
        <h1>Registro</h1>

        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            icon="password"
            onChange={this.handleChange}
            value={this.state.password}
          />

          <Button type="submit" text="Enviar" />
        </form>

        <p>O inicia sesión con</p>
        <div className="socialLogin">
          <LinkButton href="http://localhost:3011/auth/google" text="Google" icon="google" />
          <LinkButton href="/auth/facebook" text="Facebook" icon="facebook" />
        </div>

        <div className="footer">
          <p>¿Ya estás registrado?</p>
          <Link to="/login">Inicia sesión aquí</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
