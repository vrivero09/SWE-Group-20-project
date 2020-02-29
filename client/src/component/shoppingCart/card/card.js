import './card.css';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Container, Button, Row
} from 'reactstrap';
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addToCart } from '../actions/action-types/cartActions';
import CardImg from 'react-bootstrap/Image'
import Checkout from '../checkOut'

class card extends Component {
  constructor(props){
    super(props);
    this.state={
      total:100
    }
  }

  handleClick = (id)=>{
    this.props.addToCart(id);

  }
  
  render(){
    let itemList = this.props.items.map(item=>{
      return(
      <div>

      <Container className="container">
        <div>
      <Card className ="purchase-card" style={{width:"49%", height:"40%"}}>
          <CardImg src={item.img} alt={item.title} fluid/>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>{item.title}</CardSubtitle>
            <CardText><b>Price: ${item.price}</b></CardText>
              <Button onClick={()=>{this.handleClick(item.id)}}><AddShoppingCartIcon/></Button>
          </CardBody>
        </Card>
        </div>
        </Container>
       

      </div>
      )
     
    })
  return (
        <div>
          <h3 className="center">Our products</h3>
          <Checkout href="/Cart" price={this.state.total} /> 
        <Container>
        <div className="col">
        {itemList}
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
    addToCart: (id)=>{dispatch(addToCart(id))}
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(card);



