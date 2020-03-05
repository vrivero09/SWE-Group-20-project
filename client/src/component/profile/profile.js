import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import Divider from '@material-ui/core/Divider';
import LoginCrendentialsForm from "./loginCredentials";
import PersonalInfoForm from './personalInfoForm';
import CreditCardForm from './creditCards';
import {Card} from 'reactstrap';
import './profile.css';

class  Profile extends Component {
    constructor(){
        super();
        this.state = {
            user_id:""
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        const token = localStorage.getItem("userToken");
        if(token){
            const decoded = jwt_decode(token)
            this.setState({user_id:decoded._id});
        }
        
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    

    render(){
        return(
            <div>
                <h2 style={{margin:'60px'}}>Manage Profile</h2>
                <div className="container">
                    <h3 className="text-left">Login Credentials</h3>
                    <Divider/>
                    <LoginCrendentialsForm></LoginCrendentialsForm>
                    <h3 className="text-left" style={{marginTop:'100px'}}>Personal Information</h3>
                    <Divider/>
                    <PersonalInfoForm></PersonalInfoForm>
                    <h3 className="text-left" style={{marginTop:'100px'}}>Credit Cards</h3>
                    <Divider/>
                    <div style={{marginTop:'20px'}}>
                        <CreditCardForm ></CreditCardForm> 
                    </div>
                    
                    
                                  
                    
                </div>
                
            </div>
        );
    }
    
}

export default Profile;