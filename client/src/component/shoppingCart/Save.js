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
		let save = JSON.parse(localStorage.getItem('save'));
		delete save[product._id];
		localStorage.setItem('save', JSON.stringify(save));
	};
	




	render() {
		const { products } =  this.state;
		return (
				<div className="row" style={{marginLeft: "10px"}}>
				<hr/>
				{
				products.map((product, index) => <SavesItem product={product} key={index} onChange={this.handleInputChange} remove = {() => this.removeFromSave(product)} />)
				}
				
				{ !products.length ? <h3 style = {{marginBottom: "100px"}}><hr/>No saved items<hr/></h3>: ''}
				<hr/>

				</div>


			
			
		);
	}
}
