import React from 'react';
import {
	Media, Button
  } from 'reactstrap';

  import { getSaveproducts } from './repository'

export default class saveItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	//we’re using the setState method to keep the component’s state up-to-date every time a change occurs in our form
	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	saveForLater = () =>{
		console.log('hello from save item')
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

    componentWillMount() {
        console.log('hello from save item')
        let save = localStorage.getItem('cart');
		if (!save) return; 
		getSaveproducts(save).then((products) => {
		  this.setState({ products });
		});
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
					</Media>
				</Media>
			
				
		)
	}
}
