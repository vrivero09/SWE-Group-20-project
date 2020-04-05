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
    raw_data: [],
    current_username: "",
    purchased_books: [],
    userOwnsBook: false,
  };

  //save and disable inputs
  onClickSave(e) {
    e.preventDefault();

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "userToken"
    );

    if (this.state.checkBoxValue) {
      this.state.reviewText =
        this.state.current_username + ": " + this.state.reviewText;
    }

    axios
      .post("/book/addreview", {
        //may be book/addreview instead
        reviewText: this.state.reviewText,
        showUsername: this.state.checkBoxValue,
        starRating: this.state.rating,
        _id: this.props.ID_Of_Book,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  boxChange = (e) => {
    this.setState({
      checkBoxValue: !this.state.checkBoxValue,
    });
  };

  onSubmit = () => {
    console.log(this.state);
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  ownsBook = (bookID) => {
    for (var i = 0; i < this.state.purchased_books.length; i++) {
      if (this.state.purchased_books[i] == bookID) {
        return true;
      }
    }

    return false;
  };

  userOwnsBook(listOfBooks) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "userToken"
    );
    return axios
      .get("Users/getPurchases")
      .then((res) => {
        this.setState({ purchased_books: res.data.purchases });
        console.log("PURCHASED BOOKS: ");
        console.log("length " + this.state.purchased_books.length);
        console.log("value: " + this.state.purchased_books[0]);
        this.state.userOwnsBook = this.ownsBook(this.props.ID_Of_Book);
        console.log("owns book: " + this.state.userOwnsBook);
      })
      .catch((err) => {
        console.log("Error. Cannot find purchased books.");
        console.log(err);
      });
  }

  getUsername = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decoded = jwt_decode(token);
      this.state.current_username = decoded._id;
      console.log("Test 2: " + this.state.current_username);
    }
  };

  componentDidMount = () => {
    setTimeout(
      function () {
        //Start the timer
        this.setState({ render: true }); //After 1 second, set render to true
      }.bind(this),
      1000
    );
    this.getReviewInfo();
    this.getUsername();
    this.userOwnsBook(this.state.purchased_books);
    console.log("From Form: " + this.props.ID_Of_Book);
  };

  getReviewInfo = () => {
    //have to make a new Books.js endpoint
    //in server to for .get(). endpoint
    //must be for reading, not writing

    axios
      .post("/book/getReviews", {
        _id: this.props.ID_Of_Book,
      })
      .then((response) => {
        const data = response.data.reviews;
        this.state.raw_data = data;
      })
      .catch(() => {
        alert("Error Retrieving data!");
      });
  };

  displayReviewInfo = (reviewInfo) => {
    if (!reviewInfo.length) return null;

    return reviewInfo.map((currentReview, index) => (
      <div key={index}>
        <h3>{currentReview.reviewText}</h3>
        <p>{String(currentReview.starRating)}</p>
      </div>
    ));
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
          onChange={(e) => this.change(e)}
        />
        <input
          name="showUsername"
          type="checkbox"
          defaultChecked={this.state.checkBoxValue}
          onChange={(e) => this.boxChange(e)}
        />
        <button onClick={(e) => this.onClickSave(e)}>Submit</button>
        <div>
          <h2>Rating from state: {rating}</h2>
          <StarRatingComponent
            name="rate1"
            starCount={10}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
        <div className="Review info">
          {this.displayReviewInfo(this.state.raw_data)}
        </div>
      </form>
    );
  }
}
