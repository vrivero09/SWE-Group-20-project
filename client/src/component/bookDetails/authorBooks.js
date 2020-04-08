  import React, {Component} from 'react';
  import axios from 'axios';
  import {Link} from "react-router-dom";

 
  class authorBooks extends Component {
      constructor(props) {
          super(props);
          this.authorName = props.match.params.authorName;
          this.state = {
          books:[]
          }}
      componentDidMount() {
        console.log(this.authorName)
        console.log(this.props.match.params.authorName)
             this.getBooks()
            }
       getBooks(){
        return axios.post('http://localhost:5000/book/authorLink',{
            authorName: this.authorName,
            
        })
        .then(res=>{
           console.log(res);
            this.setState({books:res.data})
           console.log(this.state);
        })
        .catch(err=>{
            console.log(err);
        });
       }     
    render(){
      const { books } = this.state;
     return (
       <div>
         <h1>Books by: <h3>{this.authorName}</h3></h1>
        <div className="d-flex flex-wrap align-content-start">
        
        {books.map(function(d, idx){
         return (<ul key={idx}>

                <div className="d-flex flex-wrap align-content-start">
                <p>
                <Link to={`/bookDetails/${d._id}`} className="btn btn-link"><img src={d.bookCoverAddress} width="200px" alt="image holder"/></Link>

                </p>
            </div>
           </ul>)
       })}
      </div>

       </div>
      );
    }
  }
  
  export default authorBooks;
  
  