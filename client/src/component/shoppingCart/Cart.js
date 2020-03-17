import React from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts } from './repository';
import CartItem from './CartItem';


    
    export default class Cart extends React.Component {
      constructor(props) {
        super(props);
        this.state = { products: [{
          _id: "",
          bookTitle: "",
          description: "",
          bookCoverAddress: "",
          price:""
      }], cart: [], total: 0 }
      }
      
      // componentDidMount() {
      //   let cart = localStorage.getItem('cart');
      //   if (!cart) return; 

      //   getCartProducts(cart).then((products) => {
      //     let total = 0;
      //     for (var i = 0; i < products.length; i++) {
      //       total += products[i].price * products[i].qty;
      //     }
      //     this.setState({ products, total });
      //     });
      // }

    //remove method is provided by the parent Cart component


      removeFromCart = (product) => {
        let products = this.state.products.filter((item) => item.id !== product.id);
        let cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[product.id];
        localStorage.setItem('cart', JSON.stringify(cart));
        let total = this.state.total - (product.qty * product.price) 
        this.setState({products, total});
      }

      //The removeFromCart method in this component is passed to the CartItem component.

      clearCart = () => {
        localStorage.removeItem('cart');
        this.setState({products: []});
      }
      render() {
        const { products, total } =  this.state;
        return (
          <div className=" container">
            <h3 className="card-title">Cart</h3>
            {
              products.map((product, index) => 
                <CartItem product={product} remove={this.removeFromCart} key={index}/>)
            } 
            { products.length ? 
              <div><h4>
                <small>Total Amount: </small>
                <span className="float-right text-primary">${total}</span>
              </h4></div>: ''}
            { !products.length ?<h3 className="text-warning">No item in the cart</h3>: ''}
            <Link to="/checkout">
                <button className="btn btn-success float-right">Checkout</button></Link>
            <button className="btn btn-danger float-right" onClick={this.clearCart} 
                style={{ marginRight: "10px" }}>Clear Cart</button><br/><br/><br/>
          </div>
        );
      }
    }