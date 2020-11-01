import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { userProfile, editUser, Logout } from "../../services/ApiClient";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./User.css";

const User = () => {
  const [state, setState] = useState(null);
  const [redirectTo, setRedirectTo] = useState(false);

  const authContext = useAuthContext();
  const userC = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(userC);

    userProfile(userC.id)
      .then((response) => {
        // authContext.login(response);
        console.log(response);
        setState(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    editUser({
        userId: userC.id,
        name: state.name,
        email: state.email
        
      }).then((response) => {
      // authContext.editCar(response);
    
      setRedirectTo(true);
    });
  };
  const logout = () => {
    
    
    Logout().then((response) => {
      // authContext.login(response);
      
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
          <div onClick={logout}>Logout</div>

      
    </div>
  );
};
export default User;
