import React, { Component } from "react";
import { connect } from "react-redux";

class Answers extends Component {
  createAnswerJSX(answer, key) {
    // console.log("createAnswer > answer", answer);
    // console.log("createAnswer > key", key);
    let disblesAttr = false;
    const stringKey = key + "";
    const correctAnsClass = answer.correct ? " btn-prime-correct" : "";

    if (this.props.lastAnswer === true) {
      disblesAttr = true;
    }
    if (this.props.answered.indexOf(stringKey) !== -1) {
      disblesAttr = true;
    }

    return (
      <input
        type="button"
        data-btnnr={stringKey}
        disabled={disblesAttr}
        className={`btn btn-prime ${correctAnsClass}`}
        onClick={this.props.click}
        key={`answerBtnKey_${key}`}
        value={answer.symbol}
      />
    );
  }

  render() {
    return (
      <div className="card__btn-box">
        {this.props.answers.map((data, i) => this.createAnswerJSX(data, i))}
      </div>
    );
  }
}

export default connect()(Answers);
