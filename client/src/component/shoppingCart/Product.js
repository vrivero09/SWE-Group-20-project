import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addToCart, removeItem } from './actions/action-types/cartActions';
import Checkout from './checkOut'
import {
  Card, CardText, CardBody,CardImg,
  CardTitle, CardSubtitle, Container, Button, Row, Col
} from 'reactstrap';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';



//import Book from 'C:\Users\river\OneDrive\Documents\GitHub\SWE-Group-20-project\server\models\Book.js'

// const schema= new this.schema({
// bookTitle:{type: String, required:true},
// price:{type: Number, required:true},
// author:{type: String, required:true},
// authorBio:{type: String, required:true},
// averageRating:{type: Number, required:true},
// description:{type: String, required:true},
// genre:{type: String, required:true},
// publisher:{type: String, required:true},
// bookImage:{type: String, required:true}

// });
//module.exports = mongoose.model('Product', Book);


class Product extends Component {

  constructor(props){
    super(props);
    this.state={
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
        <Container className="container">
        <div >
      <Card className ="purchase-card" style={{width:"49%", height:"40%"}}>
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
       
      )
  })
  return(
    <div className="container_cards">
          <h3 className="center">Our products</h3>
          <Checkout href="/Cart" price={this.state.total} item={this.props.items} /> 
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
  // addQuantity: (id)=>{dispatch(addQuantity(id))},
  // subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Product);



