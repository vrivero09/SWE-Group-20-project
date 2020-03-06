import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
    Col, Card, Row
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import MaterialIcon from 'react-google-material-icons';


class CreditCards extends Component{
    constructor(){
        super();
        this.state = {
            cards:[]
        };

    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.setState({user_id:decoded._id});
            //TODO get user data
        }
        
    }

    render(){
        return(
            <div>
                <div style={{marginTop:'20px'}}>
                    <CreditCardForm Add ></CreditCardForm> 
                    </div>
                    <h5 className="text-left" style={{marginTop:'20px'}}>Your saved cards:</h5>
                    <div style={{marginTop:'20px'}}>
                        <CreditCardForm Edit ></CreditCardForm> 
                    </div>
            </div>
        );
    }


}


class  CreditCardForm extends Component {
    constructor(){
        super();
        this.state = {
            cardHolderName:"",
            cardNumber:"",
            expirationMonth:"",
            expirationYear:"",
            securityCode:"",
        };

        this.onChange = this.onChange.bind(this);
    }

    // componentDidMount(){
    //     const token = localStorage.getItem("userToken");
    //     if(token){
    //         const decoded = jwt_decode(token)
    //         this.setState({user_id:decoded._id});
    //         //TODO get user data
    //     }
        
    // }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    

    render(){
        var button = null;
        if(this.props.Add){
            button = <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}}>Add</Button>;
        }else{
            button = (
                <div>
                    <Button className="float-right" size="sm" color="danger"> <MaterialIcon icon="delete_forever" size={18} /></Button>
                    <Button className="float-right mr-2" size="sm" color="secondary" style={{padding:"5px 15px"}}>Edit</Button>
                </div>
            );
        }
        return(
            <div>
                <Card style={{width:'600px'}}>
                    <Form > 
                        <div style={{margin:'30px'}} className="text-left">
                            <FormGroup>
                                <Label for="cardHolderName">Card Holder Name</Label>
                                <Input  type="text" name="cardHolderName" id="cardHolderName" placeholder="Card Holder Name" value={this.state.cardHolderName} onChange={this.onChange} />
                                <FormFeedback> </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label  for="cardNumber">Card Number</Label>
                                <Input  type="text" name="cardNumber" id="cardNumber" placeholder="Enter card number" value={this.state.cardNumber} onChange={this.onChange}/>
                                <FormFeedback></FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label for="expirationMonth">Exp. Month</Label>
                                    </Col>
                                    <Col>
                                        <Label  for="expirationYear">Exp. Year</Label>
                                    </Col>
                                    <Col>   
                                        <Label  for="securityCode">Security Code</Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Input  type="text" name="expirationMonth" id="expirationMonth" placeholder="Exp. Month" value={this.state.expirationMonth} onChange={this.onChange}/>
                                        <FormFeedback></FormFeedback>
                                    </Col>
                                    <Col >
                                        <Input  type="text" name="expirationYear" id="expirationYear" placeholder="Exp. year" value={this.state.expirationYear} onChange={this.onChange}/>
                                        <FormFeedback></FormFeedback>
                                    </Col>
                                    <Col >
                                        <Input  type="text" name="securityCode" id="securityCode" placeholder="Enter security code" value={this.state.securityCode} onChange={this.onChange}/>
                                        <FormFeedback></FormFeedback>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={4}></Col>
                                <Col  sm={8}>
                                    {button}
                                </Col>
                            </FormGroup>
                        </div>
                    </Form>
                </Card>
                
            </div>
        );
    }
    
}

export default CreditCards;