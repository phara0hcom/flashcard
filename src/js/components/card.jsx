import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  flip,
  click_answer,
  initiate_app,
  update_scores,
  reset_last_answer,
  next_question
} from "../actions/card.action";
import Answers from "./Answers";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { store } = this.context;
    store.dispatch(initiate_app(this.props.card));
  }

  wrongAnsw(last_answer) {
    const { store } = this.context;

    console.log(last_answer);
    if (last_answer === false) {
      setTimeout(() => {
        store.dispatch(reset_last_answer());
      }, 800);
      return "wrong";
    } else if (last_answer === true) {
      setTimeout(() => {
        store.dispatch(reset_last_answer());
      }, 800);
      return "correct";
    } else {
      return "nothing";
    }
  }

  render() {
    const cardProp = this.props.card;
    console.log("cardProp.cardState", cardProp.cardState);
    if (cardProp.cardState === "LOADING") {
      return (
        <div className="card card__UP card__nothing">
          <div className="card__side card__side--front">LOADING</div>
        </div>
      );
    }

    return (
      <div
        className={
          `card card__${cardProp.face} card__` +
          this.wrongAnsw(cardProp.last_answer)
        }
      >
        <div className="card__side card__side--front">
          <div className="card__score">
            <div className="row">
              <div className="col-1-of-3 card__score--current u-margin-bottom-small">
                <div className="">Session Score</div>
                <div className="">
                  <span>&radic; </span>
                  {cardProp.score.questions_correct}
                </div>
                <div className="">
                  <span>&times; </span>
                  {cardProp.score.questions_failed}
                </div>
              </div>
              <div className="col-1-of-3 card__score--currentCard u-margin-bottom-small">
                <div className="">This Card</div>
                <div className="">
                  <span>&radic; </span>
                  {cardProp.cardScore.questions_correct}
                </div>
                <div className="">
                  <span>&times; </span>
                  {cardProp.cardScore.questions_failed}
                </div>
              </div>
              <div className="col-1-of-3 card__score--currentCard u-margin-bottom-small">
                <div className="">Total Score</div>
                <div className="">
                  <span>&radic; </span>
                  {cardProp.pastScore.questions_correct}
                </div>
                <div className="">
                  <span>&times; </span>
                  {cardProp.pastScore.questions_failed}
                </div>
              </div>
            </div>
          </div>

          <div className="card__front--symbol">{cardProp.symbolObj.symbol}</div>
          <Answers
            lastAnswer={cardProp.last_answer}
            answers={cardProp.answers}
            answered={cardProp.answered}
            symbolObj={cardProp.symbolObj}
            click={this.props.click_answer}
          />
        </div>
        <div
          className="card__side card__side--back"
          onClick={() => this.props.next_question(cardProp)}
        >
          <div className="card__back--inner">
            <div className="card__back--symbol card__back--flex">
              {cardProp.symbolObj.symbol}
            </div>
            <div className="card__back--equal card__back--flex">=</div>
            <div className="card__back--answer card__back--flex">
              {cardProp.symbolObj.roman}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Card.contextTypes = {
  store: PropTypes.object
};

export default connect(state => ({ card: state.card }), {
  flip,
  click_answer,
  initiate_app,
  reset_last_answer,
  next_question
})(Card);
