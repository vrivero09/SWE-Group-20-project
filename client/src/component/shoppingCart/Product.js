import React, {Component} from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/action-types/cartActions';


class Product extends Component {
  handleClick = (id)=>{
    this.props.addToCart(id); 
}
  render() {
    let itemList = this.props.items.map(item=>{
      return(
          <div>
            <div className="card-image">
                <img src={item.img} alt={item.title}/>
                <span className="card-title">{item.title}</span>
                <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
            </div>

            <div className="card-content">
                <p>{item.desc}</p>
                <p><b>Price: ${item.price}</b></p>
            </div>
           </div>
      )
  })
  return(
          <div className="container">
            <h3 className="center">Our products</h3>
              <div className="col-md-8">
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
export default connect(mapStateToProps, mapDispatchToProps)(Product);



