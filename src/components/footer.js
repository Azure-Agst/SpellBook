import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarToggler, NavbarBrand,
         Nav, NavItem, NavLink } from "reactstrap";

const styles = {
  "BoldFoot": {
    "color": "#9e9e9e"
  },
  "DonateFoot": {
    "color": "#5b5b5b"
  },
  "SmallFoot": {
    "marginTop": "4px",
    "color": "#9e9e9e",
    "fontSize": "12px"
  }
}

export default class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <Container>
        <hr />
        <b style={styles.BoldFoot}>Copyright (c) 2018 Andrew "Azure" Augustine. <a href="https://www.paypal.me/AzureAugust" style={styles.DonateFoot}>Donate?</a></b>
        <p style={styles.SmallFoot}>This is a personal project started with the idea of providing users with an encyclopedia for the public release of SpellBreak, a game by Proletariat Inc. I am in no way affilliated with the development of Spellbreak, just a pre-alpha tester and enthusiast of the game. If you see any content on this site you would wish to see removed, please send me an email at <a style={styles.DonateFoot} href="mailto:August712@protonmail.com">August712@protonmail.com</a> with a request, and I will do my best to work with you. Thanks!</p>
        <hr />
      </Container>
    )
  }
}
