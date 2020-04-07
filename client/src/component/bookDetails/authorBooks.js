  import React, {Component} from 'react';
  import axios from 'axios';
 
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
        <h1>Books by: {this.authorName} </h1>
        {books.map(function(d, idx){
         return (<ul key={idx}>

         <img alt="images" src= {d.bookCoverAddress} width="200px"/>
           Title: {d.bookTitle}
           </ul>)
       })}
      </div>
      );
    }
  }
  
  export default authorBooks;
  
  