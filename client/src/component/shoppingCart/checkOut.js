import React from 'react';
import { isAuthenticated, getCartProducts } from './repository';
import {  Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0
		}

		this.purchase = this.purchase.bind(this);
	}

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

	purchase(){
		this.purchaseBooks().then(res =>{
			if(res.status == 1){
				alert('Thank you for your purchase!');
				localStorage.removeItem('cart');
				console.log(res.purchases);
				this.setState({products:[], total:0});
			}else{
				alert("Could not purchase, error occured");
			}
		});
	}

	purchaseBooks(){
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
		return axios.post('users/purchaseBooks',{
            cartBooks: this.state.products
        })
        .then(res=>{
            return res.data
        })
        .catch(err=>{
            console.log(err);
        });

	}


	render() {
		const { products, total } =  this.state;
		return (
			<div className=" container">
				<h3 className="card-title">Checkout</h3>
				<hr/>
				{
					products.map((product, index) => 
						<div key={index}>
						{product.bookTitle} 
							<p>
								<small> (quantity: {product.quantity})</small>
								<span className="float-right text-primary">${product.quantity * product.price}</span>
							</p><hr/>
						</div>
					)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${total}</span></h4><hr/></div>: ''}
				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				{ products.length ? <button className="btn btn-success float-right" onClick={this.purchase}>Pay</button>: '' }
				<Link to="/"><button className="btn btn-danger float-right" style={{ marginRight: "10px" }}>Cancel</button></Link>
				<br/><br/><br/>
			</div>
		);
	}
}
