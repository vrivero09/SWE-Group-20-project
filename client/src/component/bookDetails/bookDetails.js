
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
      <Col sm={4}>
      <Card>
        <CardImg src={this.state.products.bookCoverAddress} />
        <CardBody>
          <CardTitle><strong>{this.state.products.bookTitle}</strong></CardTitle>
              
          <CardSubtitle>Author:&nbsp;{this.state.products.author}</CardSubtitle>

          <CardText><div>
               Description:&nbsp; 
          {this.state.products.description}
              </div>
              <div>
                  Genre:&nbsp;  
              {this.state.products.genre}
              </div>
              <div>
                Publisher:&nbsp; 
              {this.state.products.publisher}
                  </div>
             <div>
               Author Bio:&nbsp;  
            {this.state.products.authorBio}
                  </div>
             <div>
                 Average Rating:&nbsp;  
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

