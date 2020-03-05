import React from 'react';
// import './CartItemList.css';
import axios from 'axios';
import {Component} from 'react'
import { Card, Row, Col, Button } from 'reactstrap'


class CartItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        products: []
        }
      }
    componentDidMount() {
           this.getBook()
          }
     getBook(){
        return axios.post('book/products',{
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
  render() {
    let items = [this.state.products];
    
          for (let key of Object.keys(items)) {
              console.log(`$key: ${items[key]}`);
          }

          return items.map(item => {
            return <div key={item._id}>
            <div><h1>Cart List</h1></div>
            <Row>
            <Col sm={10}>
            <Card>
            <ul>
                <ul><p><b>Price: $</b>{item.price}</p></ul>
                <ul><p><b>Description: </b>{item.description}</p></ul>
                <Button onClick={() => this.props.addToCartHandler(this.props.item)}>Add to Cart</Button>
              </ul>

            </Card>
            </Col>

</Row>
              </div>
          
          })
            }
}

export default CartItemList;