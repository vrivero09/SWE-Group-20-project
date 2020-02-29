import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/action-types/cartActions';
import Checkout from './checkOut'
import {Container, Col} from 'reactstrap'
//import card from './card/card'
import Book from 'C:\Users\river\OneDrive\Documents\GitHub\SWE-Group-20-project\server\models\Book.js'

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

});
module.exports = mongoose.model('Product', Book);


class Product extends Component {
  handleClick = (id)=>{
    this.props.addToCart(id); 
}


  render() {
    let itemList = this.props.items.map(item=>{
      return(
          <div className="rows">
            <div className="card-image">
                <img src={item.img} alt={item.title}/>
                <span className="card-title">{item.title}</span>
                <span to="/" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
            </div>

            <div className="card-content">
                <p>{item.desc}</p>
                <p><b>Price: ${item.price}</b></p>
            </div>
           </div>
      )
  })
  return(
    <div className="container_cards">
      <Checkout price={this.state.total} />
      <h3 className="center">Our productssss</h3>
      <Container>
          <Col className="row">
            <Col>
              {itemList}
            </Col>
          </Col>        
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
export default connect(mapStateToProps, mapDispatchToProps)(Product);



