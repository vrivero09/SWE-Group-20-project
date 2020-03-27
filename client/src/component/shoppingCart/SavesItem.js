import React from 'react';
import {
	Media, Button, Row
  } from 'reactstrap';

import {Link} from "react-router-dom";


export default class saveItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
		}
	}

	//we’re using the setState method to keep the component’s state up-to-date every time a change occurs in our form
	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

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
		localStorage.removeItem('save');

    }


	render(){
		const { product } = this.props;
		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
				<Row>
				<Media src={product.bookCoverAddress} width="10%" alt="image holder" />
			    <h5 className="card-title">{product.bookTitle}</h5>
				<Button color="danger" size="md" onClick={() => this.props.remove(product)} style={{marginLeft: "85%"}}>Remove</Button>
				<Link to="/Cart" className="btn btn-sm btn-warning float-right mx-3" onClick={this.addToCart}
                    onChange={this.handleInputChange}>Move To cart</Link>

				</Row>
			  </div>
			</div>
		)		
	}
}
