//import from external
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Nav } from "reactstrap";
import store from "store";

//Import CSS
import './assets/css/bootstrap.min.css';

import Header from 'Components/Header.js';
import Footer from 'Components/Footer.js';
import Index from 'Components/Index.js';
import LoadoutView from 'Components/Loadout.js';
import LoadoutList from 'Components/List.js'
import { Login, Signup } from 'Components/Auth.js';
import Dev from 'Components/Dev.js';
import Error404 from 'Components/Error404.js';

var style = {
  "main": {
    "paddingTop": "60px"
  }
}

class Main extends React.Component {
  constructor(props){
    super(props);
  }

  onComponentDidMount() {
    if (store.get('user').name != undefined){
      this.setState((state, data) => ({
        username: store.get('user').name,
        token: store.get('user').token,
        image: store.get('user').image
      }));
    }
  }

  render(){
    return(
      <BrowserRouter>
        <div>
          <Header updateMain={this.updateMain}/>
          <div style={style.main}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/loadout/:uuid" component={LoadoutView} />
              <Route exact path="/loadouts/:page" component={LoadoutList} />
              <Route exact path="/dev" component={Dev} />
              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/pt-user-signup" component={Signup} />
              <Redirect exact from="/auth" to="/auth/login" />
              <Route component={Error404} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
)
