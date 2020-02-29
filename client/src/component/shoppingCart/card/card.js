import './card.css';
<<<<<<< HEAD
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Container, Button, Row
} from 'reactstrap';
=======
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Container
} from 'reactstrap';
// import HP1 from './component/shoppingCart/photos/HP1.jpg';
// import HP22 from './component/shoppingCart/photos/HP22.jpg';
// import HP33 from './component/shoppingCart/photos/HP33.jpg';
// import SW11 from './component/shoppingCart/photos/SW1.jpg';
>>>>>>> dev
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addToCart } from '../actions/action-types/cartActions';
import CardImg from 'react-bootstrap/Image'
<<<<<<< HEAD
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
  
=======

class card extends Component {
  handleClick = (id)=>{
    this.props.addToCart(id);
  }
>>>>>>> dev
  render(){
    let itemList = this.props.items.map(item=>{
      return(
      <div>
<<<<<<< HEAD

      <Container className="container">
        <div>
      <Card className ="purchase-card" style={{width:"49%", height:"40%"}}>
=======
      <Container>
        <Row>
        <Card sm={3}>
>>>>>>> dev
          <CardImg src={item.img} alt={item.title} fluid/>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>{item.title}</CardSubtitle>
            <CardText><b>Price: ${item.price}</b></CardText>
<<<<<<< HEAD
              <Button onClick={()=>{this.handleClick(item.id)}}><AddShoppingCartIcon/></Button>
          </CardBody>
        </Card>
        </div>
        </Container>
       

      </div>
=======
            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add to cart</i></span>
          </CardBody>
        </Card>
        </Row>
        </Container>
        </div>
>>>>>>> dev
      )
     
    })
  return (
<<<<<<< HEAD
        <div>
          <h3 className="center">Our products</h3>
          <Checkout href="/Cart" price={this.state.total} /> 
        <Container>
        <div className="col">
        {itemList}
        </div>
       

        </Container>   
=======
        <div className="container">
        <h3 className="center">Our products</h3>
          <div className="center">
              {itemList}
          </div>
>>>>>>> dev
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
<<<<<<< HEAD
    addToCart: (id)=>{dispatch(addToCart(id))}
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(card);
=======
addToCart: (id)=>{dispatch(addToCart(id))}
 }
 }
export default connect(mapStateToProps)(card);
>>>>>>> dev



