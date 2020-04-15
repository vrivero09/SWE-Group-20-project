import React from "react";
//import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FixedSizeList as List } from "react-window";

export default class Form extends React.Component {
  state = {
    firstNameOfUser: "",
    nicknameOfUser: "",
    reviewText: "",
    checkBoxValue: false,
    rating: 1,
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
        this.state.nicknameOfUser + ": " + this.state.reviewText;
    } else {
      this.state.reviewText =
        this.state.firstNameOfUser + ": " + this.state.reviewText;
    }

    axios
      .post("http://localhost:5000/book/addreview", {
        //may be book/addreview instead
        reviewText: this.state.reviewText,
        showUsername: this.state.checkBoxValue,
        starRating: this.state.rating,
        _id: this.props.ID_Of_Book,
      })
      .then((res) => {
        this.setState({
          reviewText: "",
          raw_data: res.data.reviews,
          checkBoxValue: false,
          rating: 1,
        });
        this.props.refreshBook();
      })
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

  onStarClick_Disabled(nextValue, prevValue, name) {
    this.setState({ rating: prevValue });
  }

  ownsBook = (bookID) => {
    for (var i = 0; i < this.state.purchased_books.length; i++) {
      if (this.state.purchased_books[i] == bookID) {
        return true;
      }
    }

    return false;
  };

  userOwnsBook() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "userToken"
    );
    return axios
      .get("http://localhost:5000/users/getPurchases")
      .then((res) => {
        console.log("PURCHASED BOOKS: ");
        this.setState({ purchased_books: res.data.purchases });
        console.log("length " + this.state.purchased_books.length);
        //        console.log("value: " + this.state.purchased_books[0]);
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

  getFirstName = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "userToken"
    );
    return axios
      .get("http://localhost:5000/users/profile")
      .then((res) => {
        console.log("Getting first name...");
        this.setState({ firstNameOfUser: res.data.user.firstName });
        console.log("USER FIRST NAME " + this.state.firstNameOfUser);
      })
      .catch((err) => {
        console.log("Error. Cannot retreive profile information.");
        console.log(err);
      });
  };

  getNickName = () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "userToken"
    );
    return axios
      .get("http://localhost:5000/users/profile")
      .then((res) => {
        console.log("Getting nick name...");
        this.setState({ nicknameOfUser: res.data.user.nickname });
        console.log("USER NICK NAME " + this.state.nicknameOfUser);
      })
      .catch((err) => {
        console.log("Error. Cannot retreive profile information.");
        console.log(err);
      });
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
    this.userOwnsBook();
    this.getFirstName();
    this.getNickName();
    console.log("From Form: " + this.props.ID_Of_Book);
  };

  getReviewInfo = () => {
    //have to make a new Books.js endpoint
    //in server to for .get(). endpoint
    //must be for reading, not writing

    axios
      .post("http://localhost:5000/book/getReviews", {
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

        <StarRatingComponent
          name="rate1"
          starCount={5}
          onStarClick_Disabled={
            (currentReview.starRating, currentReview.starRating, "Rating")
          }
          value={currentReview.starRating}
        />
        <p>{String(currentReview.starRating)}</p>
      </div>
    ));
  };

  render() {
    const { rating } = this.state;

    const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

    return (
      <form>
        {/* <List height={150} itemCount={1000} itemSize={35} width={300}>
          {Row}
        </List> */}
<<<<<<< HEAD
=======

        <div className="Review text">
          Review text: {String(this.state.reviewText)}
        </div>
        <div className="Checkbox">
          Checkbox: {String(this.state.checkBoxValue)}
        </div>
        <div className="Rating">Rating: {String(this.state.rating)}</div>
>>>>>>> 17669669c32546a07231abc63e4695feda695661
        <textarea
          name="reviewText"
          placeholder="Review text here."
          rows={window.innerHeight / 50}
          value={this.state.reviewText}
          onChange={(e) => this.change(e)}
        />
<<<<<<< HEAD

        <button
          disabled={!this.state.userOwnsBook}
          onClick={(e) => this.onClickSave(e)}
        >
          Submit
        </button>
        <div className="Checkbox label">Show Username:</div>
=======
>>>>>>> 17669669c32546a07231abc63e4695feda695661
        <input
          name="showUsername"
          type="checkbox"
          checked={this.state.checkBoxValue}
          defaultChecked={this.state.checkBoxValue}
          onChange={(e) => this.boxChange(e)}
        />
<<<<<<< HEAD
        <div>
=======

        <button
          disabled={!this.state.userOwnsBook}
          onClick={(e) => this.onClickSave(e)}
        >
          Submit
        </button>

        <div>
          <h2>Rating from state: {rating}</h2>
>>>>>>> 17669669c32546a07231abc63e4695feda695661
          <StarRatingComponent
            name="rate1"
            starCount={5}
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
