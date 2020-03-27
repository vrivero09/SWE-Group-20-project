import React from 'react';
import {
	Media, Button, Row
  } from 'reactstrap';
export default class saveItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
		}
	}

	//we’re using the setState method to keep the component’s state up-to-date every time a change occurs in our form
	handleInputChange = event => this.setState({[event.target.name]: event.target.value})

	render(){
		const { product } = this.props;
		return (
		    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
				<Row>
				<Media src={product.img} width="10%" alt="image holder" />
			    <h5 className="card-title">{product.name}</h5>
				<Button color="danger" size="md" onClick={() => this.props.remove(product)} style={{marginLeft: "85%"}}>Remove</Button>
				</Row>
			  </div>
			</div>
		)		
	}
}
