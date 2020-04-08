import React from 'react';
import { Media } from 'reactstrap';
import axios from "axios";
import ButtonAddToWishList from "../common/ButtonAddToWishlist";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {Link} from "react-router-dom";

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

    render() {
        const {product} = this.props;
        return (
                <div className="flex-wrap align-content-start-xs-2" style={{margin: '15px'}}>
                <p style={{height:"60%"}}>
                <Link to={`/bookDetails/${product._id}`} className="btn btn-link"><img src={product.bookCoverAddress} width="200px" alt="image holder"/></Link>
                <h6>By: {product.author}</h6>

                <p><ButtonAddToWishList productId={product._id} wishlists={this.props.wishlists} setWishlists={this.props.setWishlists}/></p>&nbsp;&nbsp;

                <Link to="/Cart" className="btn btn-sm btn btn-info" onClick={this.addToCart}
                                    onChange={this.handleInputChange}><AddShoppingCartIcon/></Link>


                </p>
            </div>

        )
    }
}
