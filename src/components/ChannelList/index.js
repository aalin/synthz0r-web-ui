import React, { useEffect } from 'react'
import classnames from 'classnames'
import connectChannels from '../../connectors/channels'
import Channel from './Channel'

import styles from './styles.css'

function ChannelList(props) {
  const channels = props.channels.channels.map((channel) => (
    <Channel key={channel.id} channel={channel} />
  ))

  return (
    <div>
      <ul className={styles.channelList}>
        {channels}
      </ul>
      <button onClick={props.listChannels}>List channels</button>
      <button onClick={props.createChannel}>Create channel</button>
    </div>
  );
}

export default connectChannels(ChannelList)
