import React, { Component } from "react";
import { connect } from "react-redux";

class Answers extends Component {
  btnDisabled(e, lastAnswer)
  {
    if ( lastAnswer === true ) {
      return true;
    }
    if ( this.props.answered.indexOf( e ) !== -1 ) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <div className="card__btn-box">
        <input 
          type="button"
          data-btnnr="0"
          disabled={ this.btnDisabled('0', this.props.lastAnswer) }
          className="btn btn-prime btn-prime-correct"
          onClick={this.props.click}
          value={this.props.symbolObj.roman}
        />
        <input 
          type="button"
          data-btnnr="1"
          disabled={  this.btnDisabled('1', this.props.lastAnswer) }
          className="btn btn-prime"
          onClick={this.props.click}
          value="SU"
        />
        <input 
          type="button"
          data-btnnr="2"
          disabled={ this.btnDisabled('2', this.props.lastAnswer) }
          className="btn btn-prime"
          onClick={this.props.click}
          value="RA"
        />
      </div>
    );
  }
}

export default connect()(Answers);
