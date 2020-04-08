import React from 'react';
import ProductItem from './productITem';
import {getProducts} from './repository';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';

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
                    <div>
                        <h3><hr/>Book List<hr/></h3>
                        <div className="col d-flex align-content-start flex-wrap" style={{}}>
                                                {
                            products.map((product, index) => <ProductItem wishlists={this.props.wishlists} setWishlists={this.props.setWishlists} product={product} key={index}/>)
                        }

                        </div>
                    </div>



        );
    }
}
