import React, { Component } from "react";
import { connect } from "react-redux";
let answers = [];

class Answers extends Component {
  componentWillMount() {
    const correctKey = Math.floor(Math.random() * 4);

    for (let i = 0; i < 4; i++) {
      if (i === correctKey) {
        answers.push({
          symbol: this.props.symbolObj.roman,
          correct: true
        });
      } else {
        answers.push({
          symbol: this.props.symbolObj.wrong_answers[i],
          correct: false
        });
      }
    }
    console.log("answers", answers);
  }

  createAnswer(answer, key) {
    console.log("createAnswer > answer", answer);
    console.log("createAnswer > key", key);
    const stringKey = key + "";
    const correctAnsClass = answer.correct ? " btn-prime-correct" : "";

    return (
      <input
        type="button"
        data-btnnr={stringKey}
        disabled={this.btnDisabled(stringKey, this.props.lastAnswer)}
        className={`btn btn-prime ${correctAnsClass}`}
        onClick={this.props.click}
        key={`answerBtnKey_${key}`}
        value={answer.symbol}
      />
    );
  }

  btnDisabled(e, lastAnswer) {
    if (lastAnswer === true) {
      return true;
    }
    if (this.props.answered.indexOf(e) !== -1) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <div className="card__btn-box">
        {answers.map((data, i) => this.createAnswer(data, i))}
      </div>
    );
  }
}

export default connect()(Answers);
