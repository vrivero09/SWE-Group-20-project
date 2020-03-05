
import React, { Component } from 'react';
import { Button, Container, Card } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Carts extends Component{

    render(){
              
        let addedItems = this.props.items ?
            (  
                this.props.items.map(item=>{
                    return(
                       
                        <li className="collection-item avatar" key={item.id}>
                                    <div className="item-img"> 
                                        <img src={item.bookCoverAddress} alt={item.bookCoverAddress} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{item.bookTitle}</span>
                                        <p>{item.description}</p>
                                        <p><b>Price: {item.price}$</b></p> 
                                        <div className="add-remove">
                                            <Link to="/Cart"><Button  onClick={()=>{this.handleAddQuantity(item.id)}}>+</Button></Link>
                                            <Link to="/Cart"><Button onClick={()=>{this.handleSubtractQuantity(item.id)}}></Button></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove">Remove</button>
                                    </div>
                                    
                               </li>                        
                    )
                })
            ):

             (
                <p>Nothing.</p>
             )
       return(
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                      <Container>
                        <Card>
                        {addedItems}
                        </Card>
                      
                      </Container>
                        
                    </ul>
                    <h5>Total price: $</h5>
                </div>

            </div>
       )
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.addedItems
    }
}

export default connect(mapStateToProps)(Carts)