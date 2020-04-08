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
                        <Col sm={4} style={{marginTop: "30px"}}>
                            <Zoom>
                              <img
                                alt="that wanaka tree"
                                src= {this.state.product.bookCoverAddress} width="315px flex"
                                />
                            </Zoom>
                          </Col>
                        <Col colSpan="100" style={{marginLeft: "50px", marginTop: "50px"}}>
                            <div className="text-md-left">
                              <h2><strong>{this.state.product.bookTitle}</strong></h2>
                            <p><b>by:</b>&nbsp;<Link to={"/authorBooks/"+this.state.product.author}>{this.state.product.author}</Link></p>

                                <p><b>Description:</b>&nbsp;
                                {this.state.product.description}</p>
                                <p><b>Genre:</b>&nbsp;
                                {this.state.product.genre}</p>
                                <p><b>Publisher:</b>&nbsp;
                                {this.state.product.publisher}</p>
                                <p> <b>Price : </b>${this.state.product.price}</p>
                                <p><b>Average Rating:</b>&nbsp;
                                {this.state.product.averageRating}</p>
                                <p><b>Author Bio:</b>&nbsp;
                                {this.state.product.authorBio}</p>
                            </div>
                            <div className="d-flex">
                          <Link to="/Cart" className="btn btn-md btn btn-info" onClick={this.addToCart}
                                            onChange={this.handleInputChange}>&nbsp; Add to Cart &nbsp;</Link>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            
                            <ButtonAddToWishList
                              productId={this.props.match.params.bookId}
                              wishlists={this.props.wishlists}
                              setWishlists={this.props.setWishlists}/>
                          </div>
                        </Col>
                    </Row>
          <h1><hr/>Comments and Rating<hr/></h1>
          <Form ID_Of_Book={this.props.match.params.bookId}> </Form>

        </Container>
      </div>
    );
  }
}

export default bookDetails;
