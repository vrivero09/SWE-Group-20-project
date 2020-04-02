import React from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts } from './repository';
import CartItem from './CartItem';
import { Button, Container } from 'reactstrap'
import Save from './Save'

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0
		}
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	// //Saving data in the localStorage
	// //localStorage.setItem method to store the value of products

	componentWillMount() {
		let cart = localStorage.getItem('cart');
		if (!cart) return; 
		getCartProducts(cart).then((products) => {
			let total = 0;
			for (var i = 0; i < products.length; i++) {
				total += products[i].price * products[i].quantity;
			}
	    	this.setState({ products, total });
		});
	}

	removeFromCart = (product) => {
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product._id];
		localStorage.setItem('cart', JSON.stringify(cart));
		getCartProducts(localStorage.getItem('cart')).then((products) => {
			let total = 0;
			for (let i = 0; i < products.length; i++) {
				total += products[i].price * products[i].quantity;
			}
			this.setState({ products, total });
		});
	};

	clearCart = () => {
	localStorage.removeItem('cart');
	this.setState({products: []});
	};

	render() {
		const { products, total } =  this.state;
	return (
			<Container>
					<h3 className="card-title"><hr/>Your shopping cart<hr/></h3>
					{
						products.map((product, index) => <CartItem product={product} key={index} remove={() => this.removeFromCart(product)} onChange={this.handleInputChange}/>)
					}
					<hr/>
					{ products.length ? <div><h4><small>Total Amount: <b>${total}</b></small></h4><hr/></div>: ''}

					{ !products.length ? <h3 style = {{marginBottom: "100px"}}>Empty cart</h3>: ''}

					<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
					<Link to="/Products" style = {{marginRight: '40%'}}><Button>Continue shopping</Button></Link>
					<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>

					<br/><br/><br/>

					<h3><hr/>Saved items<hr/></h3>
					
						<Save />
					<hr/>
			</Container>
			

			
			
		);
		
	}
}


		// let cart = localStorage.getItem('cart');
		// if (!cart) return; 
		// getCartProducts(cart).then((products) => {
		// 	console.log("Hiiiyyyaaaii")
		// 	let total = 0;
		// 	for (var i = 0; i < products.length; i++) {
		// 		console.log(products[i].books.price)
		// 		console.log(products[i].quantity)
		// 		total += products[i].books.price * products[i].quantity;
		// 	}
		// 	this.setState({ products, total });
	    // });

