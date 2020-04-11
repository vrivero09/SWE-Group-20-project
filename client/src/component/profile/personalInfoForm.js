import React, {Component} from 'react';
import {
    Form, FormGroup, Label, Input,Button, FormFeedback,
    Col
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {AvForm,AvField} from 'availity-reactstrap-validation';

class  PersonalInfoForm extends Component {
    constructor(){
        super();
        this.state = {
            info:{
            },
            disabled:true,
            saved:false,
            foundAddress: true
        };

        const user_id = "";

        // this.onChange = this.onChange.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.user_id = decoded._id;
            this.getInfo();
        }
        
    }

    //get user information and set the state
    getInfo(){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken');
        axios.get('http://localhost:5000/users/profile')
        .then(res => {
            if(res.data.user){
                if(res.data.user.homeAddress){
                    this.setState({info:res.data.user});
                }else{
                    this.setState({info:res.data.user,foundAddress:false});
                }
                
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    // onChange(e){
    //     this.setState({
    //         info: {                   // object that we want to update
    //             ...this.state.info,    // keep all other key-value pairs
    //             [e.target.name]: e.target.value       // update the value of specific key
    //         }
    //     });
    // }

    //enable inputs
    onClickEdit(e){
        e.preventDefault();
        this.setState({disabled:false,saved:false});
    }

    //save and disable inputs
    onClickSave(e,values){
        //e.preventDefault();

        axios.post('http://localhost:5000/users/changePersonalInfo',{
            firstName : values.firstName,
            lastName: values.lastName,
            email:values.email,
            nickname:values.nickname,
            street:values.homeAddress.street,
            city:values.homeAddress.city,
            state:values.homeAddress.state,
            zip:values.homeAddress.zip
        })
        .then(res=>{
            console.log("success");
            this.setState({disabled:true,saved:true,info:values,foundAddress:true});
            
        })
        .catch(err=>{
            console.log(err);
        });

    }


       

    render(){
        var button = null;
        //determine to show save or edit button
        if(this.state.disabled){
            button = (
                    <Button className="float-right" size="sm" color="secondary" style={{padding:"5px 15px"}} onClick={this.onClickEdit}>Edit</Button>
            );
        }else{
            button = (
                    <Button className="float-right" size="sm" color="primary" style={{padding:"5px 15px"}} >Save</Button>
            );
        }

        var homeAddress = this.state.info.homeAddress;
        if(!homeAddress){
            homeAddress={
                street:'',
                city:'',
                state:'',
                zip:''
            }
        }

        return(
            <div>
                <AvForm onValidSubmit={this.onClickSave} id="personalForm" > 
                    <div style={{margin:'30px'}} className="text-left">
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="firstName">First Name</Label>
                            <Col sm={4}>
                                <AvField required type="text" name="firstName" id="firstName" disabled={this.state.disabled} placeholder="firstName" value={this.state.info.firstName || ''} errorMessage='This field is required!' />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="lastName">Last Name</Label>
                            <Col sm={4}>
                                <AvField required  type="text" name="lastName" id="lastName" disabled={this.state.disabled} placeholder="lastName" value={this.state.info.lastName||''} errorMessage='This field is required!'/>
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="nickname">Nickname</Label>
                            <Col sm={4}>
                                <AvField required  type="text" name="nickname" id="nickname" disabled={this.state.disabled}  placeholder="nickname" value={this.state.info.nickname||''} errorMessage='This field is required!' />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'40px'}}>
                            <Label sm={2} for="email">Email</Label>
                            <Col sm={4}>
                                <AvField  type="email" name="email" id="email"  disabled={this.state.disabled} placeholder="email" value={this.state.info.email||''} validate={{
                                    required:{value:true, errorMessage:'This field is required!'},
                                    email:{value:true, errorMessage:'Incorrect email format'}
                                }}/>
                            </Col>
                        </FormGroup>
                        <p hidden={this.state.foundAddress} style={{color:'red'}}>You have no saved home address, please edit.</p>
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="homeAddress.street">Street</Label>
                            <Col sm={4}>
                                <AvField required  type="text" name="homeAddress.street" disabled={this.state.disabled}  placeholder="Street" value={homeAddress.street} errorMessage='This field is required!' />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="homeAddress.city">City</Label>
                            <Col sm={4}>
                                <AvField required  type="text" name="homeAddress.city" disabled={this.state.disabled}  placeholder="City" value={homeAddress.city} errorMessage='This field is required!' />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="homeAddress.state">State</Label>
                            <Col sm={4}>
                                <AvField required  type="text" name="homeAddress.state" disabled={this.state.disabled}  placeholder="State" value={homeAddress.state} errorMessage='This field is required!' />
                            </Col>
                        </FormGroup>
                        <FormGroup row style={{marginBottom:'0'}}>
                            <Label sm={2} for="homeAddress.zip">Zip</Label>
                            <Col sm={4}>
                                <AvField  type="text" name="homeAddress.zip" disabled={this.state.disabled}  placeholder="Zip" value={homeAddress.zip} validate={{
                                    required:{value:true,errorMessage:'This field is required!'},
                                    pattern:{value:'^[0-9]*$'},
                                    minLength:{value:5, errorMessage:'Enter 5 digits'},
                                    maxLength:{value:5, errorMessage:'Enter 5 digits'}
                                }}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={4}>
                                <div style={{color:"#32CD32"}} hidden={!this.state.saved}>Info Saved!</div>
                            </Col>
                            <Col  sm={2}>
                            {button}
                            </Col>
                        </FormGroup>
                    </div>
                </AvForm>
            </div>
        );
    }
    
}

export default PersonalInfoForm;