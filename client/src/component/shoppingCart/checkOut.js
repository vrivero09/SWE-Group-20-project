import React from 'react';
import { isAuthenticated, getCartProducts, pay } from './repository';
import {  Redirect, Link } from 'react-router-dom';

//will only be rendered if the user authenticated (logged in).

export default class Checkout extends React.Component {
  constructor(props) {
  super(props);
    this.state = { products: [], total: 0 }
  }
  componentDidMount() {
    let cart = localStorage.getItem('cart');

    if (!cart) return; 
    getCartProducts(cart).then((products) => {
      let total = 0;
      for (var i = 0; i < products.length; i++) {
        total += products[i].price * products[i].qty;
      }
      this.setState({ products, total });
    });
  }

  pay = () => pay().then(data => alert(data)).catch(err => console.log(err))
  
  render() {
    const { products, total } =  this.state;
    return (
    <div className=" container">
      <h3 className="card-title">Checkout</h3><hr/>
      { products.map((product, index) => 
          <div key={index}>
          <p>{product.name} <small> (quantity: {product.qty})</small>
             <span className="float-right text-primary">${product.qty * product.price}
          </span></p><hr/>
          </div>
      )} <hr/>
      { products.length ? 
      <div><h4><small>Total Amount:</small><span className="float-right text-primary">
            ${total}</span></h4><hr/></div>: ''}
      { !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
      { products.length ? <button className="btn btn-success float-right" 
            onClick={this.pay}>Pay</button>: '' }
      <Link to="/"><button className="btn btn-danger float-right" 
        style={{ marginRight: "10px" }}>Cancel</button></Link><br/><br/><br/>
    </div>
    );
  }
}