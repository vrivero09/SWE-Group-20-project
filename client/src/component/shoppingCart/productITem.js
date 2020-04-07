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
            <Media style={{marginBottom: "10px"}}className="my-6">                
                <Media left href="" >
                    <img src={product.bookCoverAddress} width="200px" alt="image holder"/>
                </Media>
                
                <Media body>
					<h3>{product.bookTitle}</h3>
                    <p><b>Description:</b> {product.description}</p>
                    <p><b>Author:</b> {product.author}</p>
                    <p>Rating: {product.averageRating} </p>
                    <h6 className="card-text"><b>Price: </b>${product.price}</h6>
                    <span className="card-text"><small>Available Quantity: </small>{product.quantity}</span>
                    {product.quantity > 0 ?
                        <div className="d-flex justify-content-end">
                          <Link to={`/bookDetails/${product._id}`} className="btn btn-link">Details</Link>
                            <input type="number" value={this.state.quantity} name="quantity"
                                   onChange={this.handleInputChange} className="float-right"
                                   style={{width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
                            <Link to="/Cart" className="btn btn-sm btn btn-info float-right mx-3" onClick={this.addToCart}
                                    onChange={this.handleInputChange}><AddShoppingCartIcon/></Link>
                                    
                            <ButtonAddToWishList productId={product._id} wishlists={this.props.wishlists} setWishlists={this.props.setWishlists}/>
                        </div> :
                        <p className="text-danger"> Product is out of stock. </p>
                    }
                </Media>
            </Media>
        )
    }
}
