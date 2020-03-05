import React from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Container, CardImg, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import { ADD_TO_CART } from './actions/types'
import { connect } from 'react-redux'


export function addToCart(_id) {
  const request = axios.push(`book/products/Cart?productId=${_id}`)
      .then(response => response.data);

  return {
      type: ADD_TO_CART,
      payload: request
  }
}



class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    products: [],
    }
  }


  handleAdd = (id) =>{
    this.props.addToCart(this.props.products.id);
  }

  // handleClick = (_id) => {
  //   this.props.addToCart(_id); 
  //   }

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
    <div><h1>Product Page</h1></div>
    <Container>
    <Row>
      <Col md={4}>
      <Card >
      <CardImg src={item.bookCoverAddress} flex/>

      <CardText>
        <p><b>Price: $</b>{item.price}</p>
        <p><b>Description: </b>{item.description}</p>
      </CardText>
        
      <Link to="/Cart"><Button  onClick={()=>{this.handleAdd(item.id)}}>Add to Cart</Button></Link>
      &nbsp;

      </Card>
      </Col>
      </Row>

    </Container>
    </div>

 })
}
}

const mapStateToProps = (state)=>{
  return{
      items: state.addedItems
  }
}

export default connect(mapStateToProps)(Product)

