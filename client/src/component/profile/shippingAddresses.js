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

        const user_id = "";

    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            this.getInfo();
        }
    }

    //get shipping address list and set state
    getInfo(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.get('users/profile')
        .then(res => {
            if(res.data.user){
                this.setState({addresses:res.data.user.shippingAddress});
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    //render each shipping address item in the list
    renderItem(){
        if(this.state.addresses.length > 0){
           return( this.state.addresses.map((item, index) => (
                    <div key={item._id} style={{marginBottom:'20px'}}>
                        <ShippingAddrForm disabled style={{paddingBottom:'50px'}} item={item} />
                    </div> 
                ))
            );
        }else{
            return <div className="text-left">You have no saved shipping addresses</div>;
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
                        {this.renderItem()}
                    </div>
            </div>
        );
    }


}


class  ShippingAddrForm extends Component {
    constructor(){
        super();
        this.state = {
            item:{
                street:"",
                city:"",
                state:"",
                zip:"",
            },
            disabled: false
            
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
                            <FormGroup row>
                                <Label sm={3} for="street">Street</Label>
                                <Col >
                                    <Input  type="text" name="street" disabled={this.state.disabled} placeholder="Enter street" value={this.state.item.street} onChange={this.onChange} />
                                    <FormFeedback> </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="city">City</Label>
                                <Col>
                                    <Input  type="text" name="city" disabled={this.state.disabled}  placeholder="Enter city" value={this.state.item.city} onChange={this.onChange}/>
                                    <FormFeedback></FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="state">State</Label>
                                <Col>
                                    <Input  type="text" name="state" disabled={this.state.disabled}  placeholder="Enter state" value={this.state.item.state} onChange={this.onChange}/>
                                    <FormFeedback></FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3} for="zip">Zip</Label>
                                <Col>
                                    <Input  type="text" name="zip" disabled={this.state.disabled} placeholder="Enter zip" value={this.state.item.zip} onChange={this.onChange}/>
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