import React from 'react';
import {
	Media, Row, Button, 
  } from 'reactstrap';

export default class CartItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
			products: []
		}
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	render(){
		const { product } = this.props;
		return (
			<Media style={{ marginBottom: "10px",  marginLeft: "100px"}}>
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
								<br></br>
								<button className="btn btn-sm btn-warning float-right" value={this.state.quantity} onChange={this.handleInputChange} >Change quantity</button>
								<input type="number" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} className="float-right" style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
							</div> : 
							<p> </p>
						}

				<Button onClick={() => this.props.remove(product)} >Remove from cart</Button>
				</Media>
				</Media>
			
		)
	}
}



	// componentWillMount(){
	// 	console.log("Hiiiii")
	// 		var book = this.props.product.books;
	// 		console.log(book);

	// 	  this.setState({ book:{name: book.bookTitle, description: book.description, price: book.price}, quantity: this.props.product.quantity  });

	// }

    // getSave = () => {
	// 	const save = window.localStorage.getItem('save');
	// 	console.log(save)
	// }

	// componentWillMount(){
	// 	let save = localStorage.getItem('save');
	// 	if (!save) return; 
	// 	getSaveproducts(save).then((products) => {
	// 		let total = 0;
	// 		for (var i = 0; i < products.length; i++) {
	// 			total += products[i].price * products[i].qty;
	// 		}
	// 		console.log('hiiiii')
	//     	this.setState({ products, total, save });
	// 	});
	// }

