import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import * as actions from '../actions/actions';
import * as authActions from '../actions/authActions';
import TypingListItem from './TypingListItem';
import { Modal, DropdownButton, MenuItem, Button, Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';

export default class Chat extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    //channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.string.isRequired,
    //typers: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { socket, user, dispatch, activeChannel } = this.props;

    console.log('[Chat] activeChannel : ' + activeChannel);

    socket.emit('chat mounted', user);
    socket.emit('join channel', activeChannel);
    
    //Triggering when other user sends message
    socket.on('new bc message', function(msg ) {
      console.log('[Chat]' +  user.username  +  'get new bc message ' + msg);
      dispatch(actions.receiveRawMessage(msg))
    });
    
    /*socket.on('new channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
    socket.on('receive socket', socketID =>
      dispatch(authActions.receiveSocket(socketID))
    );
    socket.on('receive private channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );*/
  }

  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }

  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }

  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }

/*  changeActiveChannel(channel) {
    const { socket, activeChannel, dispatch } = this.props;
    socket.emit('leave channel', activeChannel);
    socket.emit('join channel', channel);
    dispatch(actions.changeChannel(channel));
    dispatch(actions.fetchMessages(channel.name));
  }*/

  handleClickOnUser(user) {
    this.setState({ privateChannelModal: true, targetedUser: user });
  }

  render() {
    const { socket, activeChannel, dispatch, user, screenWidth, messages} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    const username = this.props.user.username;
    const dropDownMenu = (
      <div style={{'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1'}}>
        <DropdownButton key={1} style={{'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" title={username}>
          <MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={::this.handleSignOut}>Sign out</MenuItem>
        </DropdownButton>
      </div>
    );

/*
    const mobileNav = (
      <Navbar fixedTop style={{background: '#337ab7', color: 'white'}}>
          <span style={{fontSize: '2em'}}>{username}</span>
          <Navbar.Toggle />
        <Navbar.Collapse style={{maxHeight: '100%'}}>
          <Button bsStyle="primary" onSelect={::this.handleSignOut}> Sign out
          </Button>
          <section style={{order: '2', marginTop: '1.5em'}}>
            <Channels socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} />
          </section>
        </Navbar.Collapse>
      </Navbar>
    );

    const bigNav = (
      <div className="nav">
        {dropDownMenu}
        <section style={{order: '2', marginTop: '1.5em'}}>
          <Channels socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} dispatch={dispatch} />
        </section>
      </div>
    );
*/

    return (
      <div style={{margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box'}}>
        {/*screenWidth < 500 ? mobileNav : bigNav*/ }
        
        <div className="main">
          <header style={{background: '#FFFFFF', color: 'black', flexGrow: '0', order: '0', fontSize: '2.3em', paddingLeft: '0.2em'}}>
            <div>
            {activeChannel}
            </div>
          </header>

        
          {/* Message List */}
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem handleClickOnUser={::this.handleClickOnUser} message={message} key={message.id} />
            )}
          </ul>

          {/* Text Input form */}
          <MessageComposer socket={socket} activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
        </div>

{/*        <footer style={{fontSize: '1em', position: 'fixed', bottom: '0.2em', left: '21.5rem', color: '#000000', width: '100%', opacity: '0.5'}}>
          {typers.length === 1 &&
            <div>
              <span>
                <TypingListItem username={typers[0]} key={1}/>
                <span> is typing</span>
              </span>
            </div>}
          {typers.length === 2 &&
          <div>
            <span>
              <TypingListItem username={typers[0]} key={1}/>
              <span> and </span>
              <TypingListItem username={typers[1]} key={2}/>
              <span> are typing</span>
            </span>
          </div>}
          {typers.length > 2 &&
          <div>
            <span>Several people are typing</span>
          </div>}
        </footer>
*/ }
      </div>
    );
  }
}
