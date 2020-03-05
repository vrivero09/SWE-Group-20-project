import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
    Col, Card, Row
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';


class  CreditCardForm extends Component {
    constructor(){
        super();
        this.state = {
            cardHolderName:"",
            cardNumber:"",
            expirationMonth:"",
            expirationYear:"",
            securityCode:""
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.setState({user_id:decoded._id});
            //TODO get user data
        }
        
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    

    render(){
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
                        <FormGroup row>
                            
                           
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
                                    <Input  type="text" name="expirationMonth" id="expirationMonth" placeholder="Enter expiration month" value={this.state.expirationMonth} onChange={this.onChange}/>
                                    <FormFeedback></FormFeedback>
                                </Col>
                                <Col >
                                    <Input  type="text" name="expirationYear" id="expirationYear" placeholder="Enter expiration year" value={this.state.expirationYear} onChange={this.onChange}/>
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
                            <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}}>Add</Button>
                            </Col>
                        </FormGroup>
                       
                    </div>
                    
                </Form>
                </Card>
                
            </div>
        );
    }
    
}

export default CreditCardForm;