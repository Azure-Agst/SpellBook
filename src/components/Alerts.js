import React from "react";
import ReactDOM from "react-dom";
import store from "store";
import axios from 'axios';
import { Container, Button, Jumbotron, Col, Row,
         Form, InputGroup, InputGroupAddon, FormGroup,
         Label, Input, FormText, ListGroup, Table,
         ListGroupItem, Alert } from "reactstrap";
import { Redirect } from 'react-router-dom';


export default class MainAlert extends React.Component {
  render() {
    return(
      <div>
        <Alert color="info">
          <b>Update 10/1/18:</b><br />Almost ready for v1.0.0! Hold tight, guys! <i>-Azure</i>
        </Alert>
      </div>
    )
  }
}
