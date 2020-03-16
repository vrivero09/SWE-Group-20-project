
import React, { Component } from 'react';
import { Button, Container, Card } from 'reactstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Carts extends Component{

    render(){
        let items = [this.state.products];
    
          for (let key of Object.keys(items)) {
              console.log(`$key: ${items[key]}`);
          }
              
        // let addedItems = this.props.items ?
        //     (  
        //         this.props.items.map(item=>{
                    return<li className="collection-item avatar" key={items.id}>
                                    <div className="item-img"> 
                                        <img src={items.bookCoverAddress} alt={items.bookCoverAddress} className=""/>
                                    </div>
                                
                                    <div className="item-desc">
                                        <span className="title">{items.bookTitle}</span>
                                        <p>{items.description}</p>
                                        <p><b>Price: {items.price}$</b></p> 
                                        <div className="add-remove">
                                            <Link to="/Cart"><Button  onClick={()=>{this.handleAddQuantity(items.id)}}>+</Button></Link>
                                            <Link to="/Cart"><Button onClick={()=>{this.handleSubtractQuantity(items.id)}}></Button></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn pink remove">Remove</button>
                                    </div>
                                    
                               </li>                        
                     
                
            

            (
                <p>Nothing.</p>
            )
            return<div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                      <Container>
                        <Card>
                        {items}
                        
                        </Card>
                      
                      </Container>
                        
                    </ul>
                    <h5>Total price: $</h5>
                </div>

            </div>
       
       
    
    }
}

const mapStateToProps = (state)=>{
    return{
        items: state.addedItems
    }
}

export default connect(mapStateToProps)(Carts)