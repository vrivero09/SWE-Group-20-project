import React from "react";
//import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component";

class Form extends React.Component {
  state = {
    reviewText: "",
    labelText: "",
    checkBoxValue: false,
    rating: 0
  };

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

  render() {
    const { rating } = this.state;

    return (
      <form>
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
        <button onClick={() => this.onSubmit()}>Submit</button>

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
export default Form;