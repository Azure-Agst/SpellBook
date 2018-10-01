import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
         Nav, NavItem, NavLink, UncontrolledDropdown,
         DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import store from "store";

var style = {
  brand: {
    "color": "white"
  },
  prof: {
    "borderRadius": "50%",
    "height": "30px",
    padding: "0",
    margin: "0"
  }
}

export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleNav() {
    this.setState(prevState => ({
      isOpen: !this.state.isOpen
    }));
  }

  logout() {
    store.remove('user');
    this.forceUpdate();
    window.location.href = "/";
    window.location.reload();
  }

  render() {
    if (store.get('user') != undefined) {
      console.log("USER IS DEFINED")
      return(
        <Navbar color="dark" fixed="top" dark expand="md">
          <NavbarBrand style={style.brand} tag={Link} to="/">SpellBook v1</NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              {/* HERE */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <img src={store.get('user').image} style={style.prof}/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.logout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      )
    } else {
      console.log("USER IS UNDEFINED")
      return(
        <Navbar color="dark" fixed="top" dark expand="md">
          <NavbarBrand style={style.brand} tag={Link} to="/">SpellBook v1</NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
              <Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/auth/login">Login</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={Link} to="/auth/signup">Signup</NavLink>
                </NavItem> */}
              </Fragment>
            </Nav>
          </Collapse>
        </Navbar>
      )
    }
  }
}
