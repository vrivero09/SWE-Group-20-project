import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
    Col, Card, Row
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import MaterialIcon from 'react-google-material-icons';

class ShippingAddreses extends Component{
    constructor(){
        super();
        this.state = {
            addresses:[]
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
                    <ShippingAddrForm Add ></ShippingAddrForm> 
                    </div>
                    <h5 className="text-left" style={{marginTop:'20px'}}>Your saved shipping addresses:</h5>
                    <div style={{marginTop:'20px'}}>
                        <ShippingAddrForm Edit ></ShippingAddrForm> 
                    </div>
            </div>
        );
    }


}


class  ShippingAddrForm extends Component {
    constructor(){
        super();
        this.state = {
            address:"",
            city:"",
            state:"",
            zip:"",
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
                            <FormGroup row>
                                <Label sm={3} for="address">Address</Label>
                                <Col >
                                    <Input  type="text" name="address" id="address" placeholder="Enter address" value={this.state.address} onChange={this.onChange} />
                                    <FormFeedback> </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="city">City</Label>
                                <Col>
                                    <Input  type="text" name="city" id="city" placeholder="Enter city" value={this.state.city} onChange={this.onChange}/>
                                    <FormFeedback></FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="state">State</Label>
                                <Col>
                                    <Input  type="text" name="state" id="state" placeholder="Enter state" value={this.state.state} onChange={this.onChange}/>
                                    <FormFeedback></FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="zip">Zip</Label>
                                <Col>
                                    <Input  type="text" name="zip" id="zip" placeholder="Enter zip" value={this.state.zip} onChange={this.onChange}/>
                                    <FormFeedback></FormFeedback>
                                </Col>
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

export default ShippingAddreses;