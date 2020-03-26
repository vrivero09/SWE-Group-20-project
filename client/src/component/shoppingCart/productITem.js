import React from 'react';
import {
	Media, Button
  } from 'reactstrap';

export default class ProductItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	//we’re using the setState method to keep the component’s state up-to-date every time a change occurs in our form
	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	addToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
		let id = this.props.product.id.toString();
		cart[id] = (cart[id] ? cart[id]: 0);
		let qty = cart[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			cart[id] = this.props.product.available_quantity; 
		} else {
			cart[id] = qty
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	}

		// //needs to be here DONT REMOVE
	// //componentWillMount not needed
	saveForLater = () =>{
		console.log('hello from product item')
		let save = localStorage.getItem('save') ? JSON.parse(localStorage.getItem('save')) : {};
		let id = this.props.product.id.toString();
		save[id] = (save[id] ? save[id]: 0);
		let qty = save[id] + parseInt(this.state.quantity);
		if (this.props.product.available_quantity < qty) {
			save[id] = this.props.product.available_quantity; 
		} else {
			save[id] = qty
		}
		
		localStorage.setItem('save', JSON.stringify(save));
	}


	render(){
		const { product } = this.props;
		return (
				<Media style={{ marginBottom: "20px"}}>
					<Media left href="">
						<Media src={product.img} width="50%" alt="image holder" />
					</Media>
					<Media body>
						<Media heading>
						{product.name}
					</Media>
						<p >{product.description}</p>
						<p>Author: {product.author}</p>
						<h5 className="card-text"><small>price: </small>${product.price}</h5>
			    		<span className="card-text"><small>Available Quantity: </small>{product.available_quantity}</span>
						{ product.available_quantity > 0 ?
							<div>
								<button className="btn btn-sm btn-warning float-right" onClick={this.addToCart}  onChange={this.handleInputChange} >Add to cart</button>
								<Button onClick={this.saveForLater}  onChange={this.handleInputChange}>Save for Later</Button>
								<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
							</div> : 
							<p className="text-danger"> product is out of stock </p>
						}
					</Media>
				</Media>
			
				
		)
	}
}
