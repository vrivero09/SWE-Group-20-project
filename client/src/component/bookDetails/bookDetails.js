
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';
import React, {Component} from 'react';
import axios from 'axios';

class bookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        products: {
            bookTitle: "",
            description: "",
            genre: "",
            publisher: "",
            averageRating: "",
            bookCoverAddress: "",
            author: "",
            authorBio: "",
        }
        }}
    componentDidMount() {
           this.getBook()
          }
     getBook(){
        return axios.post('book/products',{
            _id:"5e50b8101c9d4400000eed83"
        })
        .then(res=>{
           console.log(res);
            this.setState({products:res.data})
           console.log(this.state);
        })
        .catch(err=>{
            console.log(err);
        });
     }     
  render(){
  return (
    <div>
    <Container>
    <Row>
      <Col sm={3}>
      <Card>
        <CardImg src={this.state.products.bookCoverAddress} />
        <CardBody>
          <CardTitle>{this.state.products.bookTitle}</CardTitle>
          <CardSubtitle>{this.state.products.author}</CardSubtitle>

          <CardText><div>
          {this.state.products.description}
              </div>
              <div>{this.state.products.genre}
                  </div>
              <div>
              {this.state.products.publisher}
                  </div>
             <div>
            {this.state.products.authorBio}
                  </div>
             <div>
                 Average Rating :
              {this.state.products.averageRating}
            </div>
                  
                  </CardText>
          <Button href="/Cart">Add to Cart</Button>
        </CardBody>
      </Card>
      </Col>

      </Row>
      </Container>
    </div>
    );
  }
}

export default bookDetails;
