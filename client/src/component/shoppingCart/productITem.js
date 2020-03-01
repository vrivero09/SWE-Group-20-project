import React from 'react';
import ProductItem from './productItem';
import { getProducts } from '';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

//import card from './card/card';
    
  class productItem extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
          products: []
          }
        }
      
      componentDidMount() {
      getProducts().then((products) =>this.setState({ products }));
      }
      
        render() {
          const { products } =  this.state;
          return (
            <div className=" container">
              <h3 className="card-title">List of Available Products</h3><hr/>
            {products.map((product, index) => <ProductItem product={product} key={index}/>)}
              <hr/>
              <Link to="/checkout">
                <button className="btn btn-success float-right">Checkout</button>
              </Link>
              <Link to="/cart">
                <button className="btn btn-primary float-right" 
                    style={{  marginRight: "10px" }}>View Cart</button>
              </Link><br/><br/><br/>
            </div>
          );
        }
      }

      const mapStateToProps = (state) => {
 
        return {
            products: state.product.products
        }
    };
     
     
    export default connect(mapStateToProps)(productItem)