import React from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts, getSaveproducts } from './repository';
import CartItem from './CartItem';
import { Button, Row, Col } from 'reactstrap'
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
	// saveForLater = (products) =>{
	// 	let save = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
	// 	localStorage.setItem('save', JSON.stringify(save));
	// 	this.setState({products})
	// }

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
		console.log('welcome Cart Mount section')
	}

	removeFromCart = (product) => {
		let products = this.state.products.filter((item) => item.id !== product.id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product.id.toString()];
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = this.state.total - (product.qty * product.price) 
		this.setState({products, total});
	}



	clearCart = () => {
		localStorage.removeItem('cart');
		this.setState({products: []});
	};

	render() {
		const { products, total } =  this.state;
	return (
			<Row>
				<Col md="8">
					<h3 className="card-title">Your shopping cart</h3>
					<hr/>
					{
						products.map((product, index) => <CartItem product={product} remove={this.removeFromCart} key={index}  onChange={this.handleInputChange}/>)
					}
					<hr/>
					{ products.length ? <div><h4><small>Total Amount: <b>${total}</b></small></h4><hr/></div>: ''}

					{ !products.length ? <h3 style = {{marginBottom: "100px"}}>Empty cart</h3>: ''}

					<Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link>
					<Link to="/Products" style = {{marginRight: '40%'}}><Button>Continue shopping</Button></Link>
					<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>

					<br/><br/><br/>

				</Col>
				<Col md="4">
					<h3>Saved items</h3>
						<Save />
					<hr/>
				</Col>
			</Row>
			
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

