import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import ChannelListItem from './ChannelListItem';
import * as actions from '../actions/actions';

export default class ChannelList extends Component {

    static propTypes = {
      channels: PropTypes.array.isRequired,
      dispatch: PropTypes.func.isRequired
    };

     componentDidMount() {
        
     }

     changeActiveChannel(newChannel) {
        const { dispatch } = this.props;

         //dispatch(actions.createChannel(newChannel));
         //socket.emit('new channel', newChannel);
         dispatch(actions.changeChannel(newChannel));
         dispatch(actions.changeProgram(newChannel.onair));
     }

    render() {
      const { channels } = this.props;

      return (
        <div>
            <h1>Channel List</h1>
            <ul style={{display: 'flex', flexDirection: 'column', listStyle: 'none', margin: '0', overflowY: 'auto', padding: '0'}}>
              {channels.map(channel =>
                <ChannelListItem
                  style={{paddingLeft: '0.8em', background: '#2E6DA4', height: '0.7em'}}
                  channel={channel}
                  key={channel.name}
                  onClick={::this.changeActiveChannel} />
              )}
{/*              <Link to='/chat'>
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
             */}         
            </ul>
        </div>
      );
    }
  }
