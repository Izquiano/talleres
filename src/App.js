import React from "react";
import { Route, Switch } from "react-router-dom";

import Splash from './components/Splash/Splash';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import DarParte from './components/DarParte/DarParte';
import Confirmation from './components/Confirmation/Confirmation';
import ConsultarPartes from './components/ConsultarPartes/ConsultarPartes';



import "./App.css";
import Coches from "./components/Coches/Coches";
import AddCar from "./components/AddCar/AddCar";

const user = JSON.parse(localStorage.getItem("user"));

function App() {
  return (
    <div className="App">
      {user ? <Menu /> : null}
      
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dar-parte" component={DarParte} />
        <Route exact path="/coches" component={Coches} />
        <Route exact path="/add-car" component={AddCar} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/consultar-partes" component={ConsultarPartes} />
        

        
      </Switch>
    </div>
  );
}

export default App;
