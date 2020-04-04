import React from 'react';
import {
	Media, Button
  } from 'reactstrap';
import DeleteForever from '@material-ui/icons/DeleteForever';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';



export default class saveItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
		}
	}

	//we’re using the setState method to keep the component’s state up-to-date every time a change occurs in our form
	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	moveToCart = () => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        let productId = this.props.product._id.toString();
        cart[productId] = (cart[productId] ? cart[productId] : 1);
        let qty = cart[productId] + parseInt(this.state.quantity);
        if (this.props.product.quantity < qty) {
            cart[productId] = this.props.product.quantity;
        } else {
            cart[productId] = qty
		}
		localStorage.setItem('cart', JSON.stringify(cart))
		let save = JSON.parse(localStorage.getItem('save'));
		save[productId] = (save[productId] ? save[productId] : 0);
		delete save[productId];
		localStorage.setItem('save', JSON.stringify(save));
		window.location.reload();

    }
	removeFromSave = () => {
		let save = JSON.parse(localStorage.getItem('save'));
		let productId = this.props.product._id.toString();
		save[productId] = (save[productId] ? save[productId] : 0);
		delete save[productId];
		localStorage.setItem('save', JSON.stringify(save));
		window.location.reload();

	}

	render(){
		const { product } = this.props;
		return (
			<Media className="my-3">
				<Media left href="">
					<img src={product.bookCoverAddress} width="120px" alt="image holder" />
				</Media>
				<Media body>
				<h3>Title: {product.bookTitle}</h3>
				<p><h6>Description: {product.description}</h6></p>
				<h6>Author: {product.author} </h6>
				<h6>Rating: {product.averageRating}</h6>
				</Media>
				<p><Button outline color="danger"  onClick={this.removeFromSave}><DeleteForever/></Button></p>&nbsp;
				<Button outline color="success" onClick={this.moveToCart}
						onChange={this.handleInputChange}><AddShoppingCart/></Button>
			</Media>
		)		
	}
}
