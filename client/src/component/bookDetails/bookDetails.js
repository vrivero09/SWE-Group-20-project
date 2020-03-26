import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';
import React, {Component} from 'react';
import axios from 'axios';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ButtonAddToWishList from "../common/ButtonAddToWishlist";

class BookDetails extends Component {
    constructor(props) {
        super(props);
        console.log(`hel: ${this.props.hello}`);
        console.log(`wishlists: ${JSON.stringify(props)}`);
        this.state = {
            products: [{
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
        return axios.post('book/products', {
            _id: "5e50b8101c9d4400000eed83"
        })
            .then(res => {
                console.log(res);
                this.setState({products: res.data})
                console.log(this.state);
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
                                <CardImg src={this.state.products.bookCoverAddress}/>
                                <CardBody>
                                    <CardTitle>{this.state.products.bookTitle}</CardTitle>
                                    <CardSubtitle>{this.state.products.author}</CardSubtitle>

                                    <CardText>
                                        <div>
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
                                            <b>Price : </b>$
                                            {this.state.products.price}
                                        </div>

                                        <div>
                                            Average Rating :
                                            {this.state.products.averageRating}
                                        </div>
                                    </CardText>
                                    <div className="d-flex justify-content-between">
                                        <Button><AddShoppingCartIcon/></Button>
                                        <ButtonAddToWishList wishlists={this.props.wishlists} setWishlists={this.props.setWishlists}/>
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

export default BookDetails;

