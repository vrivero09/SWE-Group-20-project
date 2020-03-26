import React from 'react';
import { getCartProducts } from './repository';
import SavesItem from './SavesItem'
import { Button } from 'reactstrap'

export default class saveList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0
		}
	}

	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	componentWillMount() {
		let cart = localStorage.getItem('save');
		if (!cart) return; 
		getCartProducts(cart).then((products) => {
	    	this.setState({ products });
		});
		console.log('welcome Cart Mount section')
	}

	removedSaved = (product) => {
		let products = this.state.products.filter((item) => item.id !== product.id);
		let cart = JSON.parse(localStorage.getItem('save'));
		delete cart[product.id.toString()];
		localStorage.setItem('save', JSON.stringify(cart));
		this.setState({products});
	}




	render() {
		const { products } =  this.state;
		return (

				<div>
				{
					products.map((product, index) => <SavesItem product={product} key={index} onChange={this.handleInputChange} remove={this.removedSaved}/>)
				}

				{ !products.length ? <h3 style = {{marginBottom: "100px"}}>No saved items</h3>: ''}


				</div>


			
			
		);
	}
}
