import React from "react";
//import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FixedSizeList as List } from "react-window";

export default class Form extends React.Component {
  state = {
    reviewText: "",
    checkBoxValue: false,
    rating: 0,
    raw_data: []
  };

  //save and disable inputs
  onClickSave(e) {
    e.preventDefault();

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "userToken"
    );
    axios
      .post("/book/addreview", {
        //may be book/addreview instead
        reviewText: this.state.reviewText,
        showUsername: this.state.checkBoxValue,
        starRating: this.state.rating,
        _id: "5e559a1c1c9d440000350f9c"
      })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  boxChange = e => {
    this.setState({
      checkBoxValue: !this.state.checkBoxValue
    });
  };

  onSubmit = () => {
    console.log(this.state);
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  componentDidMount = () => {
    this.getReviewInfo();
  };

  getReviewInfo = () => {
    //have to make a new Books.js endpoint
    //in server to for .get(). endpoint
    //must be for reading, not writing
    axios
      .get("./server/routes/Books.js")
      .then(response => {
        const data = response.data;
        this.setState({ raw_data: data });
        console.log("Data has been received!");
      })
      .catch(() => {
        alert("Error Retrieving data!");
      });
  };

  render() {
    const { rating } = this.state;

    const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

    return (
      <form>
        <List height={150} itemCount={1000} itemSize={35} width={300}>
          {Row}
        </List>

        <div className="Review text">
          Review text: {String(this.state.reviewText)}
        </div>
        <div className="Checkbox">
          Checkbox: {String(this.state.checkBoxValue)}
        </div>
        <div className="Rating">Rating: {String(this.state.rating)}</div>
        <textarea
          name="reviewText"
          placeholder="Review text here."
          rows={window.innerHeight / 50}
          value={this.state.reviewText}
          onChange={e => this.change(e)}
        />
        <input
          name="showUsername"
          type="checkbox"
          defaultChecked={this.state.checkBoxValue}
          onChange={e => this.boxChange(e)}
        />
        <button onClick={e => this.onClickSave(e)}>Submit</button>
        <div>
          <h2>Rating from state: {rating}</h2>
          <StarRatingComponent
            name="rate1"
            starCount={10}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
      </form>
    );
  }
}
