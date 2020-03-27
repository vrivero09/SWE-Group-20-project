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

	handleInputChange = event => this.setState({[event.target.name]: event.target.value});

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
						<div className="d-flex justify-content-end align-items-center">
							<div className="card-text text-success">Quantity: {product.quantity}</div>
							<Button className="ml-3" onClick={() => this.props.remove(product)} >Remove from cart</Button>
						</div>
					</div>
				</Row>
			  </div>
			</div>
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

