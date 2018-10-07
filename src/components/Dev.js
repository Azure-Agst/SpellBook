import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { Container, Button, Jumbotron, Col, Row,
         Form, InputGroup, InputGroupAddon, FormGroup,
         Label, Input, FormText, ListGroup, ListGroupItem } from "reactstrap";
import store from "store";

export default class DevPage extends React.Component {
  render() {
    if (store.get('user') != undefined) {
      return (
        <div>
          <Jumbotron>
            <h2>Dev Update Page:</h2>
          </Jumbotron>
          <Container>
            <h3>Hey all, Azure here! (10.7.18)</h3>
            <p>This is the page where I plan to keep you all updated with info regarding the Spellbook project, where I plan on taking it, and how you can help out as a tester!</p>
            <p>First and foremost, I want to thank you for being interested in this software. Despite the simplicity of the project as of late, the project itself takes up a little under 100 MB of space on my hard-drive. As of writing, I'd say the project's well over a few thousand lines of code. It's a lot of work, and I appreciate your bearing with me as I continue to work on the project.</p>
            <p>I'd also like to apologise, as I know that I promised a launch date last week, however my actual job happened, so I had to shift gears and focus on that project for a few days. Now that work's under control, i'm going to start focusing on this a bit more. :)</p>
            <p>Several things have happened since my last update on discord went live:</p>
            <ul>
              <li>Spellbook v0.1.0 went live.</li>
              <li>I finally published a public repo of the code <a href="https://github.com/Azure-Agst/SpellBook">here</a>.</li>
              <li>I made a public Trello board for the project located <a href="https://trello.com/b/kr5hNKj4/spellbook">here</a> to keep you all updated on what I'm working on and what to test as well.</li>
              <li>Did some reverse engineering on the game's files, and (i believe) encouraged proletariat to start encrypting their paks in the most recent bug fix. (Writeup located <a href="https://gist.github.com/Azure-Agst/6c21c9840e078b722290808077f8b40f">here</a>!)</li>
            </ul>
            <p>I know the app's very basic as of now, however I do have a few planned features to keep the app going! These include: a full encyclopedia for the items/equipment in the game, better loadout organization, and better looks for the app!</p>
            <p>Till then, I hope you enjoy the basics, and do give feedback! Happy spellcasting, all!</p>
          </Container>
          <br />
        </div>
      )
    } else {
      return(
        <Redirect to="/" />
      )
    }
  }
}
