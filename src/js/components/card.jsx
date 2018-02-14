import React, { Component } from "react";
import { connect } from "react-redux";
import { flip } from "../actions/card.action";
import { click_answer } from "../actions/card.action";
import Answers from "./Answers";

class Card extends Component {

  render() {
    return <div className={`card card__${this.props.card.face}`}>
        <div className="card__side card__side--front">
          <div className="card__front-symbol">
            {this.props.card.symbolObj.symbol}
          </div>
          <Answers 
            symbolObj={this.props.card.symbolObj}
            click={this.props.click_answer}
          />
        </div>
        <div className="card__side card__side--back" />
      </div>;
  }
}

export default connect(state => ({ card: state.card }), {
  flip,
  click_answer
})(Card);