import React from "react";
import { Route, Switch } from "react-router-dom";

import Splash from './components/Splash/Splash';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import DarParte from './components/DarParte/DarParte';


import "./App.css";
import Coches from "./components/Coches/Coches";
import AddCar from "./components/AddCar/AddCar";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dar-parte" component={DarParte} />
        <Route exact path="/coches" component={Coches} />
        <Route exact path="/add-car" component={AddCar} />
      </Switch>
    </div>
  );
}

export default App;
