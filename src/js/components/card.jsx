import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  flip,
  click_answer,
  initiate_scores,
  update_scores
} from "../actions/card.action";
import Answers from "./Answers";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const { store } = this.context;

    store.dispatch(initiate_scores(store, update_scores));
  }

  render() {
    return (
      <div className={`card card__${this.props.card.face}`}>
        <div className="card__side card__side--front">
          <div className="card__score">
            <div className="row">
              <div className="col-1-of-3 card__score-current">
                <div className="">
                  <span>&radic; </span>
                  {this.props.card.score.questions_correct}
                </div>
                <div className="">
                  <span>&times; </span>
                  {this.props.card.score.questions_failed}
                </div>
              </div>
              <div className="col-1-of-3 card__score-currentCard">
                <div className="">
                  <span>&radic; </span>
                  {this.props.card.cardScore.questions_correct}
                </div>
                <div className="">
                  <span>&times; </span>
                  {this.props.card.cardScore.questions_failed}
                </div>
              </div>
            </div>
          </div>

          <div className="card__front-symbol">
            {this.props.card.symbolObj.symbol}
          </div>
          <Answers
            symbolObj={this.props.card.symbolObj}
            click={this.props.click_answer}
          />
        </div>
        <div className="card__side card__side--back" onClick={this.props.flip}>
          <div className="card__back-symbol">
            {this.props.card.symbolObj.symbol}
          </div>
          <div className="card__back-answer">
            {this.props.card.symbolObj.roman}
          </div>
        </div>
      </div>
    );
  }
}
Card.contextTypes = {
  store: PropTypes.object
}


export default connect(state => ({ card: state.card }), {
  flip,
  click_answer
})(Card);