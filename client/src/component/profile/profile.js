import React, {Component} from 'react';
import jwt_decode from 'jwt-decode'

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
                <h2>Testing User Session</h2>
                <h2>User id: {this.state.user_id ? this.state.user_id : "User not found"}</h2>
            </div>
        );
    }
    
}

export default Profile;