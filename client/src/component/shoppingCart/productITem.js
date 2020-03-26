import React from 'react';
import { Media } from 'reactstrap';
import axios from "axios";
import ButtonAddToWishList from "../common/ButtonAddToWishlist";

export default class ProductItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
    }

    //we’re using the setState method to keep the component’s state up-to-date every time a change occurs in our form
    handleInputChange = event => this.setState({[event.target.name]: event.target.value});

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

    // //needs to be here DONT REMOVE
    // //componentWillMount not needed
    saveForLater = (bookId) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.post('wishlist/addbook', {
            book_id: bookId,
            wishlist_id: this.props.wishlist._id
        })
            .then(res => {
                this.props.setWishlists(res.data.wishlists);
            })
            .catch(err => { });
    };
    render() {
        const {product} = this.props;
        return (
            <Media className="my-3">
                <Media left href="">
                    <img src={product.bookCoverAddress} width="120px" alt="image holder"/>
                </Media>
                <Media body>
					<h3>{product.bookTitle}</h3>
                    <p>{product.description}</p>
                    <p>Author: {product.author}</p>
                    <h5 className="card-text"><small>price: </small>${product.price}</h5>
                    <span className="card-text"><small>Available Quantity: </small>{product.quantity}</span>
                    {product.quantity > 0 ?
                        <div className="d-flex justify-content-end">
                            <input type="number" value={this.state.quantity} name="quantity"
                                   onChange={this.handleInputChange} className="float-right"
                                   style={{width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
                            <button className="btn btn-sm btn-warning float-right mx-3" onClick={this.addToCart}
                                    onChange={this.handleInputChange}>Add to cart
                            </button>
                            <ButtonAddToWishList productId={product._id} wishlists={this.props.wishlists} setWishlists={this.props.setWishlists}/>
                        </div> :
                        <p className="text-danger"> Product is out of stock. </p>
                    }
                </Media>
            </Media>
        )
    }
}
