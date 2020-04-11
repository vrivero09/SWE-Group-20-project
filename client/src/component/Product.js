import React, {Component} from 'react';
import Card from './card/card';

//need to render Sortbar and Search bar under product.

class Product extends Component {
    render() {
      return(
      <div className="Add to Cart">
        <div  className ="example">
            <h1>Product Page</h1> 

            <Card />
        </div>
        
      </div>
   
     );
     
    }
    
  }
  
  export default Product;