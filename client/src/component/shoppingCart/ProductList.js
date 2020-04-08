import React from 'react';
import ProductItem from './productITem';
import {getProducts} from './repository';
import { MDBInput, MDBCol } from "mdbreact";

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
                    
                        <MDBCol style={{marginLeft: '300px'}} sm="6">
                             <MDBInput hint="Browse: Under Construction" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
                         </MDBCol>                        
                         <div height='1px' className="col d-flex align-content-start flex-wrap" style={{margin: '35px'}}>
                                                {
                            products.map((product, index) => <ProductItem wishlists={this.props.wishlists} setWishlists={this.props.setWishlists} product={product} key={index}/>)
                        }

                        </div>
                    </div>



        );
    }
}
