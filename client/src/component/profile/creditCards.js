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

        const user_id = "";
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            this.getInfo();
        } 
    }

    //get credit cards list and set state
    getInfo(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.get('users/profile')
        .then(res => {
            if(res.data.user){
                this.setState({cards:res.data.user.creditCards});
                console.log(this.state.cards);
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    //render each credit card item in the list
    renderItem(){
        if(this.state.cards.length > 0){
           return( this.state.cards.map((item, index) => (
                    <div key={item._id} style={{marginBottom:'20px'}}>
                        <CreditCardForm disabled style={{paddingBottom:'50px'}} item={item}  Edit />
                    </div> 
                ))
            );
        }else{
            return <div className="text-left">You have no saved credit cards</div>;
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
                        {this.renderItem()}
                    </div>
            </div>
        );
    }


}


class  CreditCardForm extends Component {
    constructor(){
        super();
        this.state = {
            item:{
                cardHolderName:"",
                cardNumber:"",
                expirationMonth:"",
                expirationYear:"",
                securityCode:"",
            },
            disabled:false
            
        };

        this.onChange = this.onChange.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    componentDidMount(){
        if(this.props.item){
            this.setState({item:this.props.item, disabled:this.props.disabled});
        }  
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    //enable inputs
    onClickEdit(e){
        e.preventDefault();
        this.setState({disabled:false});
    }

    //save and disable inputs
    onClickSave(e){
        e.preventDefault();
        this.setState({disabled:true});
    }

    

    render(){
        //determine to show add, edit, or save button
        var button = null;
        if(this.props.Add){
            button = <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}}>Add</Button>;
        }else if(this.state.disabled){
            button = (
                <div>
                    <Button className="float-right" size="sm" color="danger"> <MaterialIcon icon="delete_forever" size={18} /></Button>
                    <Button className="float-right mr-2" size="sm" color="secondary" style={{padding:"5px 15px"}} onClick={this.onClickEdit}>Edit</Button>
                </div>
            );
        }else{
            button = (
                <div>
                    <Button className="float-right" size="sm" color="danger"> <MaterialIcon icon="delete_forever" size={18} /></Button>
                    <Button className="float-right mr-2" size="sm" color="primary" style={{padding:"5px 15px"}} onClick={this.onClickSave}>Save</Button>
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
                                <Input  type="text" name="cardHolderName" disabled={this.state.disabled} placeholder="Card Holder Name" value={this.state.item.cardHolderName} onChange={this.onChange} />
                                <FormFeedback> </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label  for="cardNumber">Card Number</Label>
                                <Input  type="text" name="cardNumber" disabled={this.state.disabled} placeholder="Enter card number" value={this.state.item.cardNumber} onChange={this.onChange}/>
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
                                        <Input  type="text" name="expirationMonth" disabled={this.state.disabled} placeholder="Exp. Month" value={this.state.item.expirationMonth} onChange={this.onChange}/>
                                        <FormFeedback></FormFeedback>
                                    </Col>
                                    <Col >
                                        <Input  type="text" name="expirationYear" disabled={this.state.disabled} placeholder="Exp. year" value={this.state.item.expirationYear} onChange={this.onChange}/>
                                        <FormFeedback></FormFeedback>
                                    </Col>
                                    <Col >
                                        <Input  type="text" name="securityCode" disabled={this.state.disabled} placeholder="Enter security code" value={this.state.item.securityCode} onChange={this.onChange}/>
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