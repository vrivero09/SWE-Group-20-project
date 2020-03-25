import React from 'react';
import ProductItem from './productITem';
import { getProducts } from './repository';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import CartSummary from './cartSummary'

export default class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			save: [],
			total: 0
		}
	}

	componentWillMount() {
		getProducts().then((products) => {
		  this.setState({ products });
		});
	}

	render() {
		const { products } =  this.state;
		return (
			<Row>
				<Col>
				<div>
				<h3 className="card-title">Product List</h3>
				<Link to="/cart"><button className="btn btn-primary float-right" style={{  marginRight: "30px",  marginBottom: "20px" }}>View Cart</button></Link>

				<hr/>
				{
					products.map((product, index) => <ProductItem product={product} key={index}/>)
				}
				
				</div>
				</Col>
				<Col xs="3">
				<CartSummary />

				</Col>
			</Row>
			
			
		);
	}
}
