import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { userProfile, editUser, Logout } from "../../services/ApiClient";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./User.css";
import Menu from '../Menu/Menu'

const User = ({history}) => {
  const [state, setState] = useState(null);
  const [redirectTo, setRedirectTo] = useState(false);

  const authContext = useAuthContext(); // eslint-disable-line
  const userC = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    userProfile(userC.id)
      .then((response) => {
        // authContext.login(response);

        setState(response);
      })
      .catch((err) => console.log(err));
  }, []);// eslint-disable-line

  const sendData = (e) => {
    e.preventDefault();
    editUser({
      userId: userC.id,
      name: state.name,
      email: state.email,
    }).then((response) => {
      // authContext.editCar(response);

      setRedirectTo(true);
    });
  };
  const logout = () => {
    Logout().then((response) => {
      authContext.logout(response);

      window.location.assign("/");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  if (!state) {
    return <div>Loading...</div>;
  }
  if (redirectTo) {
    return <Redirect to="/successfull" />;
  }
  return (
    <>
    <Menu history={history}  step={0} />
    <div className="userContainer">
      <h1>Perfil Usuario</h1>
      <form onSubmit={sendData}>
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

        <Button type="submit" text="Enviar" />
      </form>
      <div onClick={logout} className="logout">Logout</div>
    </div>
    </>
  );
};
export default User;
