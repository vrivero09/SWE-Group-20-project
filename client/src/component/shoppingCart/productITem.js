import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import getProduct from './Product'
import { addToCart } from './actions/action-types/cartActions';
//import card from './card/card';
    
  class productItem extends React.Component {
         constructor(props) {
         super(props);
         this.state = {
           product: []
           }
        }
      
      componentDidMount() {
      getProduct().then((product) =>this.setState({ product }));
      }
      
        render() {
          const { product } =  this.state;
          return (
            <div className=" container">
              <h3 className="card-title">List of Available Products</h3><hr/>
            {product.map((product, index) => <productItem product={product} key={index}/>)}
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

    const mapStateToProps = (state)=>{
      return {
          items: state.items
           }
      }
    const mapDispatchToProps= (dispatch)=>{
        
    return{
      addToCart: (id)=>{dispatch(addToCart(id))}
      }
    }
     
     
    export default connect(mapStateToProps, mapDispatchToProps)(productItem)