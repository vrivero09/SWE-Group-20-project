import React from 'react';
import './ProductList.css';
import Product from './Product';

class ProductList extends React.Component {
  render() {
    let items = [this.state.products];
    
          for (let key of Object.keys(items)) {
              console.log(`$key: ${items[key]}`);
          }

    return <div key={items._id}>
  <h3>{items.price}</h3>
        <p>{items.description}</p>
    </div>
  }
}

export default ProductList;