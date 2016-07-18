import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

const ChannelListItem = (props) => {
  const { onClick, channel } = props;

  return (
    <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}>
         <Link to='/chat' onClick= {() => onClick(channel)}>
              <h4> { channel.name } </h4> 
              <h5> { channel.onair } </h5>
         </Link>
    </li>
    
   );

  /*const { channel: selectedChannel, onClick, channel } = props;
  return (
    <Button bsSize="xsmall" bsStyle="primary" >
      <a className={classnames({ selected: channel === selectedChannel })}
         style={{ cursor: 'hand', color: 'white'}}
         onClick={() => onClick(channel)}>
        <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}>
          <h5>{channel.name}</h5>
        </li>
      </a>
    </Button>
  );*/
}

ChannelListItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ChannelListItem;
