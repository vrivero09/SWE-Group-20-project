import React from 'react'
import { connect } from 'react-redux'
import { Button} from 'reactstrap'

class Checkout extends React.Component {

render(){
  
  return(
  <div className="purchase-card"> 
    <div className="collection"><b>Total: $ {this.props.total} </b>
        <Button href ="/Cart">Checkout</Button>
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



// const mapDispatchToProps = (dispatch)=>{
// return{
//   addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
//   substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
// }
// }

export default connect(mapStateToProps)(Checkout)