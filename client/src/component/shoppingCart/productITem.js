import React from 'react';
import axios from 'axios'
//import { getProducts} from './repository';

//will be used to render each product on the product list.

export default class ProductItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: {
                bookTitle: "",
                description: "",
                bookCoverAddress: "",
                price:"",
                quantity: 1}
            };
            
        }
    
    //     async componentDidMount() {
    //     getProducts().then((products) => {
    //       return this.setState({ products });
    //     });
    //   }
    componentDidMount() {
        this.getBook()
       }

  getBook(){
     return axios.get('book/products',{
        _id:"5e50b8101c9d4400000eed83"
    })
     .then(res=>{
        console.log(res);
         this.setState({products:res.data})
        console.log(this.state);
     })
     .catch(err=>{
         console.log(err);
     });
  }    

    // handleInputChange = event => 
    // this.setState({[event.target.name]: event.target.value})

    addToCart = () => {
    let cart = localStorage.getItem('cart') 
                    ? JSON.parse(localStorage.getItem('cart')) : {};

    let id = this.props.products.id.toString();
    cart[id] = (cart[id] ? cart[id]: 0);
    let qty = cart[id] + parseInt(this.state.quantity);
    if (this.props.products.quantity < qty) {
        cart[id] = this.props.products.quantity; 
    } else {
        cart[id] = qty
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    }

    render(){
    let products = [this.state.products];
    
    for (let key of Object.keys(products)) {
        console.log(`$key: ${products[key]}`);
    }
    //console.log(products)
    return (
        <div className="card" style={{ marginBottom: "10px"}}>
        <div className="card-body">
            <h4 className="card-title">{products.bookTitle}</h4>
            <p className="card-text">{products.description}</p>
            <h5 className="card-text"><small>price: </small>${products.price}</h5>
            <span className="card-text">
            <small>Available Quantity: </small>{products.quantity}
            </span>
            { products.available_quantity > 0 ?
            <div>
                <button className="btn btn-sm btn-warning float-right" 
                onClick={this.addToCart}>Add to cart</button>
                <input type="number" value={this.state.quantity} name="quantity" 
                onChange={this.handleInputChange} className="float-right" 
                style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
            </div> : 
            <p className="text-danger"> product is out of stock </p>
        }
        </div>
    </div>
    )
    }
}