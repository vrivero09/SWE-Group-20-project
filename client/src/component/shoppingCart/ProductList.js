
import React from 'react';
import ProductItem from './productITem';
import { getProducts} from './repository';
import { Link } from 'react-router-dom';
import './repository'
//import Axios from 'axios';

 export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [{
            _id: "",
            bookTitle: "",
            description: "",
            bookCoverAddress: "",
            price:""
        }]
      };
        
    }

    componentDidMount() {
      getProducts().then((products) =>this.setState({ products }));
    }

   //fetches the array of available products using the getProducts...
   // from the repository module in the componentDidMount lifecycle provided by React

   render() {
     let { products }  =  this.state; //you can not use object in render method
     //console.log(products);

     return (
       <React.Fragment>
       <div className=" container">
         <h3 className="card-title">List of Available Products</h3><hr/>
         <h1>{products.bookTitle}</h1>
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
       </React.Fragment>
     );
   }
 }







// import React from 'react';
// import './ProductList.css';
// import Product from './Product';

// class ProductList extends React.Component {
//   render() {
//     let items = [this.state.products];
    
//           for (let key of Object.keys(items)) {
//               console.log(`$key: ${items[key]}`);
//           }

//     return <div key={items._id}>
//   <h3>{items.price}</h3>
//         <p>{items.description}</p>
//     </div>
//   }
// }

// export default ProductList;