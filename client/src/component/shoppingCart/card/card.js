import './card.css';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Container
} from 'reactstrap';
// import HP1 from './component/shoppingCart/photos/HP1.jpg';
// import HP22 from './component/shoppingCart/photos/HP22.jpg';
// import HP33 from './component/shoppingCart/photos/HP33.jpg';
// import SW11 from './component/shoppingCart/photos/SW1.jpg';
import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addToCart } from '../actions/action-types/cartActions';
import CardImg from 'react-bootstrap/Image'

class card extends Component {
  handleClick = (id)=>{
    this.props.addToCart(id);
  }
  render(){
    let itemList = this.props.items.map(item=>{
      return(
      <div>
      <Container>
        <Row>
        <Card sm={3}>
          <CardImg src={item.img} alt={item.title} fluid/>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>{item.title}</CardSubtitle>
            <CardText><b>Price: ${item.price}</b></CardText>
            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add to cart</i></span>
          </CardBody>
        </Card>
        </Row>
        </Container>
        </div>
      )
     
    })
  return (
        <div className="container">
        <h3 className="center">Our products</h3>
          <div className="center">
              {itemList}
          </div>
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



