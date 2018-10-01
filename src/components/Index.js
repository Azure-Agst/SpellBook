import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Container, Button, Jumbotron, Col, Row,
         Form, InputGroup, InputGroupAddon, FormGroup,
         Label, Input, FormText, ListGroup, ListGroupItem } from "reactstrap";
import store from "store";

import items from '../assets/items.js';
import exampleTable from '../assets/exampleTable.js';
import fakeNames from '../assets/names.js';

//
// DEFAULT
//

export default class index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loadData: []
    }
    this.renderTable = this.renderTable.bind(this);
    this.getLoadouts = this.getLoadouts.bind(this);
  }

  componentDidMount() {
    this.getLoadouts();
  }

  getLoadouts() {
    axios.get(`/api/loadouts`)
    .then((response) => {
      this.setState((state, data) => ({
        loadData: response.data
      }));
      this.forceUpdate();
    })
    .catch((err)=> {});
  }

  renderTable() {
    //console.log(this.state.loadData);
    if (this.state.loadData.length == 0 ) {
      return (
        <h3>Loading...</h3>
      )
    } else {
      return(
        <div>
          <ListGroup>
            { this.state.loadData.map((loadout, index) =>
              <ListGroupItem key={index}>
                <Row>
                  <Col xs="3">
                    <b>{loadout.name}</b>
                    <hr />
                    <Link to={`/loadout/${loadout.uuid}`}>
                      <Button color="primary">
                        See More
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <p><i>Left:</i> {loadout.left}</p>
                    <p><i>Right:</i> {loadout.right}</p>
                  </Col>
                  <Col>
                    <p><i>Amulet:</i> {loadout.amulet}</p>
                    <p><i>Belt:</i> {loadout.belt}</p>
                    <p><i>Boots:</i> {loadout.boots}</p>
                  </Col>
                </Row>
              </ListGroupItem>
            ) }
          </ListGroup>
        </div>
      )
    }
  }

  render() {
    if (store.get('user') != undefined) {
      return (
        <Container>
          <Jumbotron>
            <h1>Spellbook v1.0.0</h1>
            <hr />
            <h3>Submit a loadout!</h3>
            <br />
            <LoadoutForm loadData={this.getLoadouts} isLoaded={this.state.loadData.length}/>
          </Jumbotron>
          { this.renderTable() }
        </Container>
      )
    } else {
      return (
        <Container>
          <Jumbotron>
            <h1>Spellbook v1.0.0</h1>
          </Jumbotron>
          <h2>Hey there!</h2>
          <p>This resource is currently only available to playtesters. Sign up or log in to gain access!</p>
          <br />
        </Container>
      )
    }
  }
}

// =============================================================================

//
// LOADOUTFORM
//

class LoadoutForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "placeholder": "",
      "name": "",
      "author": "",
      "rune": "",
      "left": "",
      "right": "",
      "amulet": "",
      "belt": "",
      "boots": "",
      "desc": ""
    }
    this.randomName = this.randomName.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.autoAuthor = this.autoAuthor.bind(this);
  }

  randomName() {
    var nameArray = fakeNames.names;
    if (this.props.isLoaded == 0){
      return("")
    } else if (this.state.placeholder != ""){
      return(this.state.placeholder);
    } else {
      this.state.placeholder = nameArray[Math.floor(Math.random()*nameArray.length)];
      return(nameArray[Math.floor(Math.random()*nameArray.length)])
    }
  }

  autoAuthor() {
    if (store.get('user') != undefined) {
      return(
        <Input type="text" name="author" id="author" value={store.get('user').name} onChange={this.handleInputChange} />
      )
    } else { // NOTE: The only reason this "else" is here is to futureproof for public release.
      return(
        <Input type="text" name="author" id="author" placeholder="Anonymous" onChange={this.handleInputChange} />
      )
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submit(event) {
    event.preventDefault();
    var data = {
      name: this.state.name, author: store.get('user').name,
      rune: this.state.rune, left: this.state.left,
      right: this.state.right, amulet: this.state.amulet,
      belt: this.state.belt, boots: this.state.boots,
      desc: this.state.desc
    };
    var self = this;
    axios.post('./api/createLoadout', data)
    .then(function(response){
      var data = response.data;
      if (data.success == false) {
        console.log(data.error)
      } else {
        self.props.loadData();
      }
    })
  }

  render() {
    return(
      <Form id="mainForm" onSubmit={this.submit}>
        <Row>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Loadout Name:</InputGroupAddon>
              <Input type="text" name="name" id="name" placeholder={this.randomName()} onChange={this.handleInputChange} />
            </InputGroup>
          </Col>
          <Col xs="4">
            <InputGroup>
              <InputGroupAddon addonType="prepend">Author:</InputGroupAddon>
              { this.autoAuthor() }
            </InputGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Rune:</InputGroupAddon>
              <Input type="select" name="rune" id="runeSel" onChange={this.handleInputChange}>
                { items.runes.map((option, key) => <option key={key}>{option}</option>)}
              </Input>
            </InputGroup>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Left:</InputGroupAddon>
              <Input type="select" name="left" id="leftSel" onChange={this.handleInputChange}>
                { items.gauntlets.map((option, key) => <option key={key}>{option}</option>)}
              </Input>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Right:</InputGroupAddon>
              <Input type="select" name="right" id="rightSel" onChange={this.handleInputChange}>
                { items.gauntlets.map((option, key) => <option key={key}>{option}</option>)}
              </Input>
            </InputGroup>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Amulet:</InputGroupAddon>
              <Input type="select" name="amulet" id="leftSel" onChange={this.handleInputChange}>
                { items.amulets.map((option, key) => <option key={key}>{option}</option>)}
              </Input>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Belt:</InputGroupAddon>
              <Input type="select" name="belt" id="rightSel" onChange={this.handleInputChange}>
                { items.belts.map((option, key) => <option key={key}>{option}</option>)}
              </Input>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Boots:</InputGroupAddon>
              <Input type="select" name="boots" id="rightSel" onChange={this.handleInputChange}>
                { items.boots.map((option, key) => <option key={key}>{option}</option>)}
              </Input>
            </InputGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Description:</InputGroupAddon>
              <Input type="textarea" name="desc" id="desc" onChange={this.handleInputChange} />
            </InputGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button>Submit</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
