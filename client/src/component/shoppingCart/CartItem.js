import React from 'react';
import {
	Button, Media
  } from 'reactstrap';
  import StarRatingComponent from "react-star-rating-component";
  import { Link } from "react-router-dom";


export default class CartItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
		}
    }

    //we’re using the setState method to keep the component’s state up-to-date every time a change occurs in our form
    handleInputChange = (e) => this.setState({quantity: e.target.value});


	saveCartItem = () =>{
		let save = localStorage.getItem('save') ? JSON.parse(localStorage.getItem('save')) : {};
        let productId = this.props.product._id.toString();
        save[productId] = (save[productId] ? save[productId] : 0);
        let qty = save[productId] + parseInt(this.state.quantity);
        if (this.props.product.quantity < qty) {
            save[productId] = this.props.product.quantity;
        } else {
            save[productId] = qty
		}
		localStorage.setItem('save', JSON.stringify(save))
		let cart = JSON.parse(localStorage.getItem('cart'));
		cart[productId] = (cart[productId] ? cart[productId] : 0);
		delete cart[productId];
		localStorage.setItem('cart', JSON.stringify(cart));
		window.location.reload();

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
			let productId = this.props.product._id.toString();
			cart[productId] = (cart[productId] ? cart[productId] : 0);
			let qty = cart[productId] + parseInt(this.state.quantity) * 2;
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
			<Media className="my-3">
				<Media left href="">
                    <img src={product.bookCoverAddress} width="200px" alt="image holder"/>
                </Media>
				<Media style={{ marginLeft: "50px"}} body>
					<div className="text-md-left">
					<h2><strong>{product.bookTitle}</strong></h2>
                    <p><h6>Description: <small>{product.description}</small></h6></p>
					<h6>by: <Link to={"/authorBooks/" + product.author}>
                    {product.author}
                  </Link></h6>
					<p>
					<b>Average Rating:</b>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    editing={false}
                    value={product.averageRating}/>
					</p>

                    <p><h6 className="card-text">Price: ${product.price}</h6></p>

					<p ><button onClick={this.handleInputChange} onClick={this.increment}>+</button>&nbsp;&nbsp;Quantity: {product.quantity}&nbsp;&nbsp;<button onClick={this.handleInputChange} onClick={this.decrement}>-</button>
							<div className="float-right"><Button className="ml-3" onClick={() => this.props.remove(product)} >Remove from cart</Button>&nbsp;&nbsp;
							<Button onClick={this.saveCartItem} onChange={this.handleInputChange}>Save for Later</Button></div></p>

					</div>

				</Media>
			</Media>
		)
	}
}