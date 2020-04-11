import React from 'react';
import ProductItem from './productITem';
import {getProducts} from './repository';
import {Input, Row, Col} from 'reactstrap';

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
                        <Row>
                            <Col sm="12" md={{ size: 6, offset: 3 }}>
                                <Input type="text" name="text" placeholder="Browse: Under Construction" />  
                            </Col>
                        </Row>
                         <div height='1px' className="col d-flex align-content-start flex-wrap" style={{margin: '35px'}}>
                                                {
                            products.map((product, index) => <ProductItem wishlists={this.props.wishlists} setWishlists={this.props.setWishlists} product={product} key={index}/>)
                        }

                        </div>
                    </div>



        );
    }
}
