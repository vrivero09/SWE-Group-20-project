import './Nav.css';
import './card.css';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';
import HP1 from './photos/HP1.jpg';
import HP2 from './photos/HP2.jpg';
import HP3 from './photos/HP3.jpg';
import React, {Component} from 'react';


class card extends Component {
  render(){
  return (
    <div>
    <Container>
    <Row>
    <Col sm={3}>
      <Card className = "cardSize">
        <CardImg top width="50%" src={HP1} alt ="HP1" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Add to Cart</Button>
        </CardBody>
      </Card>
      </Col>

      <Col sm={3}>
      <Card>
        <CardImg top width="10%" src={HP2} alt ="HP2" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Add to Cart</Button>
          {/* <Button tag={local} to="/somewhere" /> */}
        </CardBody>
      </Card>
      </Col>

      <Col sm={3}>
      <Card>
        <CardImg top width="10%" src={HP3} alt ="HP3" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Add to Cart</Button>
          {/* <Button tag={} to="/cart" /> */}
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

