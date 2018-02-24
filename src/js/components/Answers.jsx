import React, { Component } from "react";
import { connect } from "react-redux";

class Answers extends Component {
  createAnswerJSX(answer, key) {
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
        {this.props.answers.map((data, i) => this.createAnswerJSX(data, i))}
      </div>
    );
  }
}

export default connect()(Answers);
