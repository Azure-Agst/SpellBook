import React from "react";
import ReactDOM from "react-dom";
import store from "store";
import axios from 'axios';
import { Container, Button, Jumbotron, Col, Row,
         Form, InputGroup, InputGroupAddon, FormGroup,
         Label, Input, FormText, ListGroup, Table,
         ListGroupItem } from "reactstrap";

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
  }
}


export default class Loadout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loadData: []
    }
    this.renderData = this.renderData.bind(this);
  }

  componentDidMount() {
    const uuid = this.props.match.params.uuid;
    axios.get(`/api/loadout/${uuid}`)
    .then((response) => {
      this.setState((state, data) => ({
        loadData: response.data
      }));
    })
    .catch((err)=> {});

  }

  render() {
    //console.log(this.state.response);
    return(
      <Container>
        { this.renderData() }
      </Container>
    )
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
        <div>
          {
            loadData.map((loadout, key) => {
              return(
                <div key={key}>
                  <Jumbotron>
                    <h1>{ loadout.name }</h1>
                    <b>By: { loadout.author }</b>
                  </Jumbotron>
                  <Row>
                    <Col style={styles.centerAlign}>
                      <p style={styles.rune}>{loadout.rune}</p>
                      <p style={styles.rune}><b>&#8593;</b></p>
                      <p style={styles.rune}><b>Rune</b></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6" style={styles.rightAlign}>
                      <p>{loadout.left}  <b>&#8592; Left</b></p>
                    </Col>
                    <Col xs="6">
                      <p><b>Right &#8594;</b>  {loadout.right}</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs="4" style={styles.rightAlign}>
                      <b>Amulet:</b>
                      <p>{loadout.amulet}</p>
                    </Col>
                    <Col xs="4" style={styles.centerAlign}>
                      <b>Belt:</b>
                      <p>{loadout.belt}</p>
                    </Col>
                    <Col xs="4">
                      <b>Boots:</b>
                      <p>{loadout.boots}</p>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={{ size: 'auto', offset: 1 }}>
                      <p><b>Description:</b></p>
                      <p><i>{loadout.desc}</i></p>
                    </Col>
                  </Row>
                </div>
              )
            })
          }
        </div>
      )
    }
  }
}
