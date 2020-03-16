
    import React from 'react';


    //will be used to render each product on the cart.
    export default class CartItem extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            products: [{
              id: "",
              bookTitle: "",
              description: "",
              genre: "",
              publisher: "",
              averageRating: "",
              bookCoverAddress: "",
              author: "",
              authorBio: "",
              price:""
          }],
            cart:[],
            quantity: 1
        }
      }
      //component uses the remove method provided as a prop..
      // to remove the item from the cart completely.
      render(){
        let products = this.state.products;
        return (
          <div className="card" style={{ marginBottom: "10px"}}>
            <div className="card-body">
              <h4 className="card-title">{products.bookTitle}</h4>
              <h5 className="card-text"><small>price: </small>${products.price}</h5>
              <span className="card-text text-success">
                  <small>Quantity: </small>{products.quantity}</span>
              <button className="btn btn-sm btn-warning float-right" 
                  onClick={() => this.props.remove(products)}>Remove from cart</button>
            </div>
          </div>
         )
      }
    }