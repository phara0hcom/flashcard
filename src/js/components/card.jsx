import React, { Component } from "react";
import { connect } from "react-redux";
import { flip } from "../actions/card.action";

class Card extends Component {

  render() {

    return (
      <div 
        className={`card card__${this.props.card.face}`}
      >
        <div className="card__side card__side--front">
          <div className="card__front-symbol">あ</div>
          <div className="card__btn-box">
            <input type="button" className="card__btn" value="A" />
            <input type="button" className="card__btn" value="RA" />
            <input type="button" className="card__btn" value="SU" />
          </div>
        </div>
        <div className="card__side card__side--back" />
      </div>
    )
  }
}

export default connect( state => ({ card: state.card }), {
  flip
})( Card );