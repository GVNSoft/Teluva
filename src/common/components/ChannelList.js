import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import * as actions from '../actions/actions';

export default class ChannelList extends Component {

    static propTypes = {
    };

     componentDidMount() {
        
     }

     changeActiveChannel(event1) {
        const { dispatch } = this.props;

        const newChannel = {
          name: event1,
          id: Date.now(),
          private: false
        };

         dispatch(actions.createChannel(newChannel));
         //socket.emit('new channel', newChannel);
         dispatch(actions.changeChannel(newChannel));
     }

    render() {
      return (
        <div>
            <h1>Channel List</h1>
            <ul style={{display: 'flex', flexDirection: 'column', listStyle: 'none', margin: '0', overflowY: 'auto', padding: '0'}}>
              <Link to='/chat'>
                  <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}
                            onClick={() => { this.changeActiveChannel('KBS') }}>
                    <h5>KBS</h5> 
                  </li>
              </Link>

              <Link to='/chat' channel='MBC'>
                  <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}
                          onClick={() => { this.changeActiveChannel('MBC') }}>
                    <h5>MBC</h5>
                  </li>
              </Link>

              <Link to='/chat'channel='SBS'>
                  <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}
                          onClick={() => { this.changeActiveChannel('SBS') }}>
                    <h5>SBS</h5>
                  </li>
              </Link>

              <Link to='/chat'channel='JTBC'>
                  <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}
                          onClick={() => { this.changeActiveChannel('JTBC') }}>
                    <h5>JTBC</h5>
                  </li>
              </Link>
              
            </ul>
        </div>
      );
    }
  }
