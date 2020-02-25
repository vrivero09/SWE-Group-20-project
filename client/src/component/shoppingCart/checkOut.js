import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { addShipping } from './actions/cartActions'
//import card from './card/card'

class Checkout extends React.Component {
    componentWillUnmount() {
      if(this.refs.shipping.checked)
          this.props.substractShipping()
}
handleChecked = (e)=>{
  if(e.target.checked){
      this.props.addShipping();
  }
  else{
      this.props.substractShipping();
  }
}

render(){
  
  return(
  <div>
    <div className="collection">
    <ul className="collection-item"><b>Total: $ {this.props.total}</b></ul>
    </div>
    <div className="checkout">
        <button>Checkout</button>
    </div>
  </div>
  )
}
}

const mapStateToProps = (state)=>{
return{
  addedItems: state.addedItems,
  total: state.total
  }
}

const mapDispatchToProps = (dispatch)=>{
return{
  addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
  substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
}
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)