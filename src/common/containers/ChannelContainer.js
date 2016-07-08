import React, { Component, PropTypes } from 'react';
import ChannelList from '../components/ChannelList'
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


class ChannelContainer extends Component {
  componentWillMount() {

  	const { dispatch } = this.props;
    dispatch(actions.fetchChannels());

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

function mapStateToProps(state) {
  return {     
      channels: state.channels.data
  }
}
export default connect(mapStateToProps)(ChannelContainer)