import React from 'react';
import {
	Row, Button, 
  } from 'reactstrap';

export default class CartItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
	}


	handleInputChange = event => this.setState({[event.target.name]: event.target.value});


	saveCartItem = (product) =>{
		let save = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        let productId = this.props.product._id.toString();
        save[productId] = (save[productId] ? save[productId] : 0);
        let qty = save[productId] + parseInt(this.state.quantity);
        if (this.props.product.quantity < qty) {
            save[productId] = this.props.product.quantity;
        } else {
            save[productId] = qty
		}
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product._id];
		localStorage.setItem('save', JSON.stringify(save));	
		window.location.reload(save);

	}

	increment = () => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		console.log(cart)
		let productId = this.props.product._id.toString();
		console.log(productId)
        cart[productId] = (cart[productId] ? cart[productId] : 0);
		console.log(cart[productId])
		let qty = cart[productId] + parseInt(this.state.quantity) * 2;
		console.log(qty)
		console.log(cart)
        if (this.props.product.quantity < qty) {
            cart[productId] = this.props.product.quantity + 1;
        } else {
            cart[productId] = qty;
		}
			localStorage.setItem('cart', JSON.stringify(cart));
			window.location.reload(cart);

		};

		decrement = () => {
			let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
			console.log(cart)
			let productId = this.props.product._id.toString();
			console.log(productId)
			cart[productId] = (cart[productId] ? cart[productId] : 0);
			console.log(cart[productId])
			let qty = cart[productId] + parseInt(this.state.quantity) * 2;
			console.log(qty)
			console.log(cart)
			if (this.props.product.quantity < qty) {
				cart[productId] = this.props.product.quantity - 1;
			} else {
				cart[productId] = qty;
			}
			if(this.props.product.quantity == 1){
				delete cart[productId];
			} else {
					
			}
				localStorage.setItem('cart', JSON.stringify(cart));
				window.location.reload(cart);

			};
	

	render(){
		const { product } = this.props;
		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
				<Row>
					<img src={product.bookCoverAddress} width="120px" alt="image holder" />
					<div className="flex-grow-1">
						<h4 className="card-title text-center">{product.bookTitle}</h4>
						<h6 className="card-text text-center">price: ${product.price}</h6>
						<br></br>
						<br></br>
						<br></br>
						<br></br>
						<div className="d-flex justify-content-end align-items-center">
							<h5>Quantity: {product.quantity}</h5>&nbsp;&nbsp;
							<button onChange={this.handleInputChange} onClick={this.increment} >+</button>&nbsp;
							<button onClick={this.decrement}>-</button>&nbsp;
							<Button className="ml-3" onClick={() => this.props.remove(product)} >Remove from cart</Button>&nbsp;
							<Button onClick={this.saveCartItem} onChange={this.handleInputChange}>Save for Later</Button>
						</div>
					</div>
				</Row>
			  </div>
			</div>
		)
	}
}