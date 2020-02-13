import './card.css';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';
import HP1 from './photos/HP1.jpg';
import HP22 from './photos/HP22.jpg';
import HP33 from './photos/HP33.jpg';
import SW11 from './photos/SW11.jpg';
import React, {Component} from 'react';
import CardImg from 'react-bootstrap/Image'

class card extends Component {
  render(){
  return (
    <div >
    <Container>
    <Row >
    <Col sm={3}>
      <Card>
        <CardImg src={HP1} alt ="HP1" fluid/>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle><b>$20.00</b></CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button outline color = "info" href="/Cart"><b>Add to Cart</b></Button>
        </CardBody>
      </Card>
      </Col>

      <Col sm={3}>
      <Card>
        <CardImg src={HP22} alt ="HP2" fluid />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle><b>$20.00</b></CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <p></p>
          <Button outline color = "info" href="/Cart"><b>Add to Cart</b></Button>
        </CardBody>
      </Card>
      </Col>

      <Col sm={3}>
      <Card>
        <CardImg src={HP33} alt ="HP33" fluid/>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle><b>$20.00</b></CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button outline color = "info" href="/Cart"><b>Add to Cart</b></Button>
        </CardBody>
      </Card>
      </Col>

      <Col sm={3}>      
      <Card>
        <CardImg src={SW11} alt ="Star Wars" fluid/>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle><b>$20.00</b></CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button outline color = "info" href="/Cart"><b>Add to Cart</b></Button>
        </CardBody>
      </Card>
      </Col>

      </Row>
      </Container>
    </div>
    );
  }
}

export default card;

