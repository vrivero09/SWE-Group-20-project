import React from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Container, CardImg, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import { addToCart, removeItem } from './actions/cart-actions';
import { connect } from 'react-redux'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Item from './CartItem'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    products: [],
    total:100
    }
    this.addedItems = this.addedItems.bind(this);
  }


handleClick = (id)=>{
    this.props.addToCart(id); 
}

handleRemove = (id)=>{
  this.props.removeItem(id);
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
        
      <Link to="/Cart"><Button onClick={()=>{this.handleClick(item.id)}}><AddShoppingCartIcon/></Button></Link>
      &nbsp;&nbsp;&nbsp;
      <Link to="/Cart"><Button onClick={()=>{this.handleRemove(item.id)}}>Remove</Button></Link>
      &nbsp;&nbsp;&nbsp;
      </Card>
      </Col>
      </Row>

    </Container>
    </div>

 })
}
}

const mapStateToProps = (state)=>{
  return {
      items: state.items
       }
  }
const mapDispatchToProps= (dispatch)=>{
    
return{
  addToCart: (id)=>{dispatch(addToCart(id))},
  removeItem: (id)=>{dispatch(removeItem(id))}
  // addQuantity: (id)=>{dispatch(addQuantity(id))},
  // subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Product);


