import React from 'react';
import {
	Media, Row, Button
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
		    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
				<Row>
				<Media src={product.img} width="10%" alt="image holder" />
			    <h5 className="card-title">{product.name}</h5>
			    <p><h6 className="card-text"><small>price:</small>${product.price}</h6></p> 
				<br></br>
			    <p><span className="card-text text-success"><small>Quantity: </small>{product.qty}</span>
				<Button onClick={() => this.props.remove(product)} >Remove from cart</Button>
				</p>
				<br></br>
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

