import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class bookDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.bookId);
        this.state = {
            product: [{
                bookTitle: "",
                description: "",
                genre: "",
                publisher: "",
                averageRating: "",
                bookCoverAddress: "",
                author: "",
                authorBio: "",
                price: ""
            }],
            dropDownOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.getBook();
    }

    getBook() {
        return axios.get(`/api/book?id=${this.props.match.params.bookId}`)
            .then(res => {
                this.setState({product: res.data});
            })
            .catch(err => {
                console.log(err);
            });
    }

    toggle() {
        this.setState({dropDownOpen: !this.state.dropDownOpen});
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={3}>
                            <Card>
                                <CardImg src={this.state.product.bookCoverAddress}/>
                                <CardBody>
                                    <CardTitle>{this.state.product.bookTitle}</CardTitle>
                                    <CardSubtitle>Author:&nbsp;<Link to={"/authorBooks/"+this.state.products.author}>{this.state.products.author}</Link></CardSubtitle>

                                    <CardText>
                                        <div>
                                            {this.state.product.description}
                                        </div>
                                        <div>{this.state.product.genre}
                                        </div>
                                        <div>
                                            {this.state.product.publisher}
                                        </div>
                                        <div>
                                            {this.state.product.authorBio}
                                        </div>
                                        <div>
                                            <b>Price : </b>$
                                            {this.state.product.price}
                                        </div>

                                        <div>
                                            Average Rating :
                                            {this.state.product.averageRating}
                                        </div>
                                    </CardText>
                                    <div className="d-flex justify-content-between">
                                        <Button>add to cart</Button>
                                        <Button wishlists={this.props.wishlists} setWishlists={this.props.setWishlists}>Add to Wishlist</Button>
                                    </div>
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

