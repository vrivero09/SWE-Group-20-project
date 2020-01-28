import React from 'react';
import './Nav.css';
import './card.css';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';
import HP1 from './photos/HP1.jpg';


const Example = (props) => {
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
        <CardImg top width="10%" src="https://kbimages1-a.akamaihd.net/74b5c21d-35e1-4b25-bd97-010d3afc885a/1200/1200/False/harry-potter-and-the-goblet-of-fire-6.jpg" alt ="Harry Potter" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Add to Cart</Button>
        </CardBody>
      </Card>
      </Col>

      <Col md={3}>
      <Card>
        <CardImg top width="10%" src="https://images-na.ssl-images-amazon.com/images/I/51jyI6lYi1L._SX342_BO1,204,203,200_.jpg" alt ="Harry Potter" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Add to Cart</Button>
        </CardBody>
      </Card>
      </Col>

      </Row>
      </Container>
    </div>
  );
};

export default Example;
//<img src = "https://m.media-amazon.com/images/I/51g7fkELjaL._SL500_.jpg"></img>
//<img src = "https://kbimages1-a.akamaihd.net/74b5c21d-35e1-4b25-bd97-010d3afc885a/1200/1200/False/harry-potter-and-the-goblet-of-fire-6.jpg"></img>
//<img src = "https://images-na.ssl-images-amazon.com/images/I/51jyI6lYi1L._SX342_BO1,204,203,200_.jpg"></img>
//<img src = "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg"></img>

