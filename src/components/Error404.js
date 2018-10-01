import React from "react";
import { Link, BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import { Container, Button, Jumbotron, Col, Row,
         Form, InputGroup, InputGroupAddon, FormGroup,
         Label, Input, FormText, ListGroup, ListGroupItem } from "reactstrap";


var styles = {
 loadingDiv: {
   textAlign: "center",
   marginTop: "5em",
   marginBottom: "5em"
 }
}



export default class Error404 extends React.Component {
  render() {
    return(
      <div style={styles.loadingDiv}>
        <h1>Error! That page does not exist! <Link to="/">Go back home?</Link></h1>
      </div>
    )
  }
}
