import React from "react";
import { Link, BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import { Container, Button, Jumbotron, Col, Row,
         Form, InputGroup, InputGroupAddon, FormGroup,
         Label, Input, FormText, ListGroup, Alert,
         ListGroupItem } from "reactstrap";
import store from "store";


const style = {
 body: {
   "backgroundColor": "#f5f5f5"
 },
 container: {
   "padding": "15px"
 }
}


// ===== [ LOGIN ] =====================================================================


export class Login extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     user: undefined,
     pass: undefined,
     redirect: false
   }
   this.login = this.login.bind(this);
   this.alert = this.alert.bind(this);
   this.handleInputChange = this.handleInputChange.bind(this);
 }

 login(event) {
   event.preventDefault();
   var self = this; var data = { username: this.state.user, password: this.state.pass }
   axios.post('/api/login', data)
   .then(function(response){
     //console.log("login was "+JSON.stringify(response.data))
     if (response.data.login == false) {
       window.location.href = window.location.href.split('?')[0] + "?login=false"; //wow this line is super lame LMAO
       return;
     } else {
       store.set('user', {name: response.data.username, token: response.data.token, image: response.data.image});
       self.setState(prevState => ({
         user: undefined,
         pass: undefined,
         redirect: true
       }));
     }
   })
 }

 handleInputChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
 }

 alert() {
   if (this.props.location.search == "?login=false") {
     return(
       <Alert color="danger">
         Sorry, we couldn't log you in. Verify you're using the right username and password and try again!
       </Alert>
     )
   }
 }

 render() {
   console.log(this.props)
   if (this.state.redirect) {
     return(
       <Redirect to="/" />
     )
   } else {
     return(
       <form onSubmit={this.login} style={style.body}>
         <Container style={style.container}>
           { this.alert() }
           <h1 className="h3 mb-3 font-weight-normal">Please Log In!</h1>
           <Input type="text" onChange={this.handleInputChange} name="user" placeholder="username" required autoFocus />
           <Input type="password" onChange={this.handleInputChange} name="pass" placeholder="password" required />
           <Button type="submit" name="submit" color="primary">Login</Button>
         </Container>
       </form>
     )
   }
 }
}


// ===== [ SIGNUP ] ====================================================================


export class Signup extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     user: undefined,
     pass: undefined,
     redirect: false
   }
   this.signup = this.signup.bind(this);
   this.handleInputChange = this.handleInputChange.bind(this);
 }

 signup(event) {
   event.preventDefault();
   var self = this; var data = { username: this.state.user, password: this.state.pass }
   axios.post('/api/signup', data)
   .then(function(response){
     store.set('user', {name: response.data.username, token: response.data.token, image: response.data.image})
   })
   .finally(() => {
     self.setState(prevState => ({
       user: undefined,
       pass: undefined,
       redirect: true
     }));
   })
 }

 handleInputChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
 }

 render() {
   if (this.state.redirect) {
     return(
       <Redirect to="/" />
     )
   } else {
     return(
       <form onSubmit={this.signup} style={style.body}>
         <Container style={style.container}>
           <h1 className="h3 mb-3 font-weight-normal">Please Sign Up!</h1>
           <p>By signing up for this service, you hereby agree that you are a playtester for Spellbreak and will not send any links from this site to anyone outside of the playtesting community. Violation of this can and will result in immediate removal from the pre-alpha program.</p>
           <hr/>
           <Input type="text" onChange={this.handleInputChange} name="user" placeholder="username" required autoFocus />
           <Input type="password" onChange={this.handleInputChange} name="pass" placeholder="password" required />
           <Button type="submit" name="submit" color="primary">Signup</Button>
         </Container>
       </form>
     )
   }
 }
}
