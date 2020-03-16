import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { addToCart, removeItem } from './actions/cart-actions';
import Checkout from './checkOut'
import {
  Card, CardText, CardBody,CardImg,
  CardTitle, CardSubtitle, Container, Button, Row, Col
} from 'reactstrap';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

class Product extends Component {
  // render() {
  //   let items = [this.state.products];
    
  //         for (let key of Object.keys(items)) {
  //             console.log(`$key: ${items[key]}`);
  //         }

  //   return <div key={items._id}>
  //       <h3>{items.price}</h3>
  //       <p>{items.description}</p>
  //   </div>
  // }

  constructor(props){
    super(props);
    this.state={
      addedItems: String,
      cart: [],
      total:100
    }
  }

  handleClick = (id)=>{
    this.props.addToCart(id); 
}

handleRemove = (id)=>{
  this.props.removeItem(id);
}


render() {
    let itemList = this.props.items.map(item=>{
      return(
        <Fragment>
        <Container className="container">
        <div >
      <Card className ="purchase-card" style={{width:"20%", height:"40%"}}>
          <CardImg src={item.img} alt={item.title} fluid/>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>{item.title}</CardSubtitle>
            <CardText><b>Price: ${item.price}</b></CardText>
              <Button onClick={()=>{this.handleClick(item.id)}}><AddShoppingCartIcon/></Button>
              
              <Button onClick={()=>{this.handleRemove(item.id)}}>Remove</Button>
          </CardBody>
        </Card>
        </div>
        </Container>
        </Fragment>
      )
  })
  return(
    <div className="container_cards">
          <h3 className="center">Our products</h3>
          <Checkout href="/Cart" price={this.state.total} title={this.state.addedItems} /> 
        <Container className="items">
        <div className="col-xs-6">
        <Col gutter ={[3 ,3]}>
          {itemList}
        </Col>  
        </div>
        </Container>   
    </div>    
        );
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
  //addQuantity: (id)=>{dispatch(addQuantity(id))},
  // subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Product);



