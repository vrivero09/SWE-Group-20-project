import React from 'react';
import ProductItem from './productITem';
import {getProducts} from './repository';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
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
            this.setState({products});
        });
    }


    render() {
        const {products} = this.state;
        return (
            <Row>
                <Col>
                    <div className="d-flex flex-column">
                        <h3 className="card-title">Product List</h3>
                        <div>
                            <Link to="/cart" className="btn btn-primary float-right">View Cart</Link>
                        </div>
                        {
                            products.map((product, index) => <ProductItem wishlists={this.props.wishlists} setWishlists={this.props.setWishlists} product={product} key={index}/>)
                        }
                    </div>
                </Col>
            </Row>


        );
    }
}
