import React, { Component, PropTypes } from 'react';
import ChannelList from '../components/ChannelList'
import { connect } from 'react-redux';


class ChannelContainer extends Component {
  componentWillMount() {

  	const { dispatch } = this.props;

  }
  render() {
    console.log(this.props);
    return (
      <ChannelList {...this.props} />
    );
  }
}

ChannelContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(ChannelContainer)