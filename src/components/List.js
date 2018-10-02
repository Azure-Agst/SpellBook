import React from "react";
import ReactDOM from "react-dom";
import store from "store";
import axios from 'axios';
import { Container, Button, Jumbotron, Col, Row,
         Form, InputGroup, InputGroupAddon, FormGroup,
         Label, Input, FormText, ListGroup, Table,
         ListGroupItem, ButtonGroup } from "reactstrap";
import { Link, Redirect } from 'react-router-dom';

var styles = {
  rightAlign: {
    textAlign: "right"
  },
  centerAlign: {
    textAlign: "center"
  },
  loadingDiv: {
    textAlign: "center",
    marginTop: "5em",
    marginBottom: "5em"
  },
  rune: {
    padding: "0",
    margin: "0"
  },
  buttons: {
    "margin": "auto"
  }
}

export default class LoadoutList extends React.Component {

  //TODO: Get this fuckin thing to work.

  constructor(props){
    super(props);
    this.state = {
      count: 0,
      page: 0,
      loadData: []
    }
    this.renderData = this.renderData.bind(this);
    this.getData = this.getData.bind(this);
    this.renderCursor = this.renderCursor.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  getData() {
    var page = this.props.match.params.page;
    axios.get(`/api/loadouts/page-${page}`)
    .then((response) => {
      this.setState((state, data) => ({
        maxPages: Math.ceil(response.data.count / 10),
        loadData: response.data.docs,
        page: page
      }));
    })
    .catch((err)=> {});
  }

  componentDidMount() {
    this.getData();
  }

  nextPage(event) {
    event.preventDefault();
    var page = this.props.match.params.page;
    this.getData();
    return(<Redirect to={ "/loadouts/"+(+page+1) } />)
  }

  prevPage(event) {
    event.preventDefault();
    var page = this.props.match.params.page;
    this.getData();
    return(<Redirect to={ "/loadouts/"+(+page-1) } />)
  }

  renderCursor() {
    var page = this.props.match.params.page;
    console.log(page)
    if (page == 1) {
      return(
        <div style={styles.centerAlign}>
          <Button onClick={this.nextPage}>Next Page</Button>
        </div>
      )
    } else if (page == this.state.maxPages) {
      return(
        <div style={styles.centerAlign}>
          <Button onClick={this.prevPage}>Prev Page</Button>
        </div>
      )
    } else {
      return(
        <div style={styles.centerAlign}>
          <Button onClick={this.nextPage}>Next Page  </Button>
          <Button onClick={this.prevPage}>  Prev Page</Button>
        </div>
      )
    }
  }

  renderData() {
    if (this.state.loadData.length == 0) {
      return(
        <div style={styles.loadingDiv}>
          <h1>Loading...</h1>
          <p>If this page takes more than 10 seconds to load, please refresh the page. Thanks!</p>
        </div>
      )
    } else {
      var loadData = this.state.loadData;
      return(
        <Container>
          <br />
          <h2>User Submitted Loadouts:</h2>
          <hr />
          {
            loadData.map((loadout, key) => {
              return(
                <ListGroupItem key={key}>
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
              )
            })
          }
        </Container>
      )
    }
  }

  render() {
    if (store.get('user') == undefined) {
      return(
        <Redirect to="/" />
      )
    } else {
      return(
        <Container>
          { this.renderData() }
          <hr />
          <div style={styles.buttons}>
            <ButtonGroup>
            { this.renderCursor() }
            </ButtonGroup>
          </div>
        </Container>
      )
    }
  }

}
