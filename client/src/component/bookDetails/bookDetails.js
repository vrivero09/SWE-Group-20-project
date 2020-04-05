import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Container,
} from "reactstrap";
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ButtonAddToWishList from "../common/ButtonAddToWishlist";
import Form from "../Form";

class bookDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.bookId);
    this.state = {
      product: [
        {
          bookTitle: "",
          description: "",
          genre: "",
          publisher: "",
          averageRating: "",
          bookCoverAddress: "",
          author: "",
          authorBio: "",
          price: "",
        },
      ],
      dropDownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getBook();
    console.log("From bookdetails: " + this.props.match.params.bookId);
  }

  getBook() {
    return axios
      .get(`/api/book?id=${this.props.match.params.bookId}`)
      .then((res) => {
        this.setState({ product: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggle() {
    this.setState({ dropDownOpen: !this.state.dropDownOpen });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={4}>
              <Card>
                <CardImg src={this.state.product.bookCoverAddress} />
                <CardBody>
                  <CardTitle>
                    <strong>{this.state.product.bookTitle}</strong>
                  </CardTitle>
                  <CardSubtitle>
                    Author:&nbsp;
                    <Link to={"/authorBooks/" + this.state.product.author}>
                      {this.state.product.author}
                    </Link>
                  </CardSubtitle>

                  <CardText>
                    <div>
                      Description:&nbsp;
                      {this.state.product.description}
                    </div>
                    <div>
                      Genre:&nbsp;
                      {this.state.product.genre}
                    </div>
                    <div>
                      Publisher:&nbsp;
                      {this.state.product.publisher}
                    </div>
                    <div>
                      Author Bio:&nbsp;
                      {this.state.product.authorBio}
                    </div>
                    <div>
                      <b>Price : </b>${this.state.product.price}
                    </div>

                    <div>
                      Average Rating:&nbsp;
                      {this.state.product.averageRating}
                    </div>
                  </CardText>
                  <div className="d-flex justify-content-between">
                    <Button>
                      <AddShoppingCartIcon />
                    </Button>
                    <ButtonAddToWishList
                      productId={this.props.match.params.bookId}
                      wishlists={this.props.wishlists}
                      setWishlists={this.props.setWishlists}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Form ID_Of_Book={this.props.match.params.bookId}> </Form>
      </div>
    );
  }
}

export default bookDetails;
