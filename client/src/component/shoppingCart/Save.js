import React from 'react';
import { getCartProducts } from './repository';
import SavesItem from './SavesItem'
import { Row } from 'reactstrap'

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
		let save = localStorage.getItem('save');
		if (!save) return; 
		getCartProducts(save).then((products) => {
	    	this.setState({ products });
		});
		console.log('welcome Cart Mount section')
	}

	removedSaved = (product) => {
		let products = this.state.products.filter((item) => item.id !== product.id);
		let cart = JSON.parse(localStorage.getItem('save'));
		delete cart[product.id];
		localStorage.removeItem('save');
		this.setState({products});
	}
	




	render() {
		const { products } =  this.state;
		return (
				<div className="row" style={{marginLeft: "10px"}}>
				<hr/>
				{
				products.map((product, index) => <SavesItem product={product} key={index} onChange={this.handleInputChange} remove={this.removedSaved}/>)
				}
				
				{ !products.length ? <h3 style = {{marginBottom: "100px"}}><hr/>No saved items<hr/></h3>: ''}
				<hr/>

				</div>


			
			
		);
	}
}
