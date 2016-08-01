import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import {Form, Input, Button, FormGroup, ControlLabel, HelpBlock, FormControl, Col } from 'react-bootstrap';
import uuid from 'node-uuid';

export default class MessageComposer extends Component {

  static propTypes = {
    activeChannel: PropTypes.string.isRequired,
    activeProgramId : PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    socket: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      typing: false
    };
  }
  handleSubmit(event) {
    const { user, socket, activeChannel} = this.props;
    const text = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      var newMessage = {
        id: `${Date.now()}${uuid.v4()}`,
        channelID: this.props.activeChannel,
        activeProgramId : this.props.activeProgramId,
        text: text,
        user: user,
        time: moment.utc().format('lll')
      };
      socket.emit('new message', newMessage);
      socket.emit('stop typing', { user: user.username, channel: activeChannel });
      this.props.onSave(newMessage);
      this.setState({ text: '', typing: false });
    }
  }
  handleOnClick() {
    const { user, socket, activeChannel} = this.props;
    const text = this.state.text;

    var newMessage = {
      id: `${Date.now()}${uuid.v4()}`,
      channelID: this.props.activeChannel,
      text: text,
      user: user,
      time: moment.utc().format('lll')
    };
    socket.emit('new message', newMessage);
    socket.emit('stop typing', { user: user.username, channel: activeChannel });
    this.props.onSave(newMessage);
    this.setState({ text: '', typing: false });
  }

  handleChange(event) {
    const { socket, user, activeChannel } = this.props;
    this.setState({ text: event.target.value });
    if (event.target.value.length > 0 && !this.state.typing) {
      socket.emit('typing', { user: user.username, channel: activeChannel });
      this.setState({ typing: true});
    }
    if (event.target.value.length === 0 && this.state.typing) {
      socket.emit('stop typing', { user: user.username, channel: activeChannel });
      this.setState({ typing: false});
    }
  }
  render() {
    return (
      <div style= {{ width: '100%',order: '2'}}>
        <Form horizontal>
          <FormGroup controlId="formBasicText">
            <Col sm={10}>
              <FormControl
                type="text"
                name="message"
                ref="messageComposer"
                value={this.state.text}
                placeholder="Enter text"
                onChange={::this.handleChange}
                onKeyDown={::this.handleSubmit}
              />
            </Col>
            <Col sm={2}>
              <Button bsStyle="primary" onClick={::this.handleOnClick}>
                Send
              </Button>
            </Col>          
          </FormGroup>        
        </Form>
      </div>


/*
      <div style={{
        zIndex: '52',
        left: '21.1rem',
        right: '1rem',
        width: '100%',
        flexShrink: '0',
        order: '2',
        marginTop: '0.5em'
      }}>
      <form>
        <Input
          style={{
            height: '100%',
            fontSize: '2em',
            width: '80%',
            marginBottom: '1em'
          }}
          type="textarea"
          name="message"
          ref="messageComposer"
          autoFocus="true"
          placeholder="Type here to chat!"
          value={this.state.text}
          onChange={::this.handleChange}
          onKeyDown={::this.handleSubmit}
        />

        <Button> send </Button>
        </form>
      </div>
*/
    );
  }
}
