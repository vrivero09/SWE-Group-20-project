import React from 'react';
import { getSaveproducts } from './repository';

export default class saveList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			save: [],
			total: 0
		}
	}

	componentWillMount() {
		getSaveproducts().then((products) => {
		  this.setState({ products });
		});
	}

	render() {
		const { products } =  this.state;
		return (

				<div>
				{
					products.map((product, index) => <saveItem product={product} key={index} onChange={this.handleInputChange} />)
				}

				{ !products.length ? <h3 style = {{marginBottom: "100px"}}>No saved items</h3>: ''}
				
				<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Remove</button>

				</div>


			
			
		);
	}
}
