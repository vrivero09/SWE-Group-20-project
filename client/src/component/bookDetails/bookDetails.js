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
import "./bookDetails.css"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Form from '../Form';

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

  addToCart = () => {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let productId = this.props.product._id.toString();
    cart[productId] = (cart[productId] ? cart[productId] : 0);
    let qty = cart[productId] + parseInt(this.state.quantity);
    if (this.props.product.quantity < qty) {
        cart[productId] = this.props.product.quantity;
    } else {
        cart[productId] = qty
    }
    localStorage.setItem('cart', JSON.stringify(cart));
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

  addToCart = () => {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let productId = this.props.product._id.toString();
    cart[productId] = (cart[productId] ? cart[productId] : 0);
    let qty = cart[productId] + parseInt(this.state.quantity);
    if (this.props.product.quantity < qty) {
        cart[productId] = this.props.product.quantity;
    } else {
        cart[productId] = qty
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}


    render() {
        return (
            <div>
                <Container>
                    <Row className = "row">
                        <Col sm={4}>
                            <Card>
                            <Zoom>
                              <img
                                alt="that wanaka tree"
                                src= {this.state.product.bookCoverAddress}
                                />
                            </Zoom>
                                <CardBody>
                                    <CardTitle><strong>{this.state.product.bookTitle}</strong></CardTitle>
                                    <CardSubtitle>Author:&nbsp;<Link to={"/authorBooks/"+this.state.product.author}>{this.state.product.author}</Link></CardSubtitle>

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
                  <Link to="/Cart" className="btn btn-sm btn btn-info float-right mx-3" onClick={this.addToCart}
                                    onChange={this.handleInputChange}><AddShoppingCartIcon/></Link>
                    
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
