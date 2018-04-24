import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('Settings this', this);
        console.log('Settings this.props', this.props);
        return <div>Settings YOOOOOOOOO</div>;
    }
}

export default connect()(Settings);
