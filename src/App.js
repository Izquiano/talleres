import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Splash from "./components/Splash/Splash";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DarParte from "./components/DarParte/DarParte";
import Confirmation from "./components/Confirmation/Confirmation";
import ConsultarPartes from "./components/ConsultarPartes/ConsultarPartes";
import User from "./components/User/User";

import AdminHome from "./components/Admin/AdminHome/AdminHome";

import "./App.css";
import Coches from "./components/Coches/Coches";
import AddCar from "./components/AddCar/AddCar";
import Successfull from "./components/Successfull/Successfull";

import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
} from "./components/AuthenticatedRoute/AuthenticatedRoute";


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="App">
      {user ? <Menu /> : null}

      <Switch>
        {/* Admin */}
        <Route exact path="/dashboard" component={AdminHome} />
        

        {/* User */}
        {/* <NotAuthenticatedRoute
        path="/"
        render={(props) => <Splash {...props} user={user}/>}
        user={user}
        /> */}
        <NotAuthenticatedRoute
        path="/login"
        render={(props) => <Login {...props} />}
       
        />
        <Route exact path="/" component={Splash} />

        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/signup" component={Signup} />

        <AuthenticatedRoute
          path="/home"
          render={(props) => <Home {...props}  />}
          
        />
        <AuthenticatedRoute
          path="/consultar-partes"
          render={(props) => <ConsultarPartes {...props}  />}
          
        />
        <AuthenticatedRoute
          path="/dar-parte"
          render={(props) => <DarParte {...props}  />}
          
        />
        <AuthenticatedRoute
          path="/coches"
          render={(props) => <Coches {...props}  />}
          user={user}
        />
        <AuthenticatedRoute
          path="/add-car"
          render={(props) => <AddCar {...props}  />}
          
        />
        <AuthenticatedRoute
          path="/confirmation"
          render={(props) => <Confirmation {...props} />}
         
        />
        <AuthenticatedRoute
          path="/user"
          render={(props) => <User {...props} />}
          
        />
        <AuthenticatedRoute
          path="/successfull"
          render={(props) => <Successfull {...props}  />}
          
        />

        {/* <Route exact path="/home" component={Home} /> */}
        {/* <Route exact path="/dar-parte" component={DarParte} /> */}
        {/* <Route exact path="/coches" component={Coches} /> */}
        {/* <Route exact path="/add-car" component={AddCar} /> */}
        {/* <Route exact path="/confirmation" component={Confirmation} /> */}
        {/* <Route exact path="/consultar-partes" component={ConsultarPartes} /> */}
        {/* <Route exact path="/user" component={User} /> */}
        {/* <Route exact path="/successfull" component={Successfull} /> */}
      </Switch>
    </div>
  );
}

export default App;
