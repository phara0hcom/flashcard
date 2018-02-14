import React, { Component } from "react";
import { connect } from "react-redux";

class Answers extends Component {
  render() {
    return (
      <div className="card__btn-box">
        <input 
          type="button"
          className="card__btn"
          onClick={this.props.click}
          value={this.props.symbolObj.roman}
        />
        <input 
          type="button"
          className="card__btn"
          onClick={this.props.click}
          value="SU"
        />
        <input 
          type="button"
          className="card__btn"
          onClick={this.props.click}
          value="RA"
        />
      </div>
    );
  }
}

export default connect()(Answers);
