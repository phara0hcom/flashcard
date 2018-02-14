import React, { Component } from "react";
import { connect } from "react-redux";

class Answers extends Component {
  render() {
    return <div className="card__btn-box">
        <input type="button" className="card__btn" value={this.props.symbolObj.roman} />
        <input type="button" className="card__btn" value="RA" />
        <input type="button" className="card__btn" value="SU" />
      </div>;
  }
}

export default connect()(Answers);
