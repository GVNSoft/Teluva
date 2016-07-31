import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
import {receiveAuth} from '../actions/authActions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const socket = io('', { path: '/api/chat' });
const initialChannel = 'KBS'; // NOTE: I hard coded this value for my example.  Change this as you see fit


let idCounter = 0;
const tmpUser =   
{
    username: 'Anonymous' + Math.floor((Math.random() * 100) + 1),
    id: idCounter++,
    socketID: null
}

class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch, activeChannel, activeProgram } = this.props;

    console.log('[Chat_Container] activeChannel : ', activeChannel);
    console.log('[Chat_Container] activeProgram : ', activeProgram);
    /*if(!user.username) {
      dispatch(receiveAuth());
    }*/
    //dispatch(actions.fetchMessages(initialChannel));
    //dispatch(actions.fetchChannels(user.username));
  }
  render() {
    return (
      <Chat {...this.props} socket={socket} user={tmpUser} />
    );
  }
}
ChatContainer.propTypes = {
  //user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  //channels: PropTypes.array.isRequired,
  activeChannel: PropTypes.string.isRequired,
  activeProgram: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
      //channels: state.channels.data,
      messages: state.messages.data,
      activeChannel: state.activeChannel.name,
      activeProgram: state.activeProgram,
      //user: state.auth.user,
      //user: 'Test-User',
      screenWidth: state.environment.screenWidth
  }
}
export default connect(mapStateToProps)(ChatContainer)
