import React, { useEffect } from 'react'
import classnames from 'classnames'
import connectChannels from '../../connectors/channels'
import Channel from './Channel'
import NewDeviceForm from '../NewDeviceForm'

import styles from './styles.css'

function ChannelList(props) {
  const channels = props.channels.map((channel) => (
    <Channel
      key={channel.id}
      channel={channel}
      addNoteDevice={() => props.openNewDeviceForm(channel.id, 'NOTE_DEVICE')}
      addInstrumentDevice={() => props.openNewDeviceForm(channel.id, 'INSTRUMENT_DEVICE')}
      addEffectDevice={() => props.openNewDeviceForm(channel.id, 'EFFECT_DEVICE')}
      updateTable={props.updateTable}
      updateParam={props.updateParam}
    />
  ))

  return (
    <div>
      <ul className={styles.channelList}>
        {channels}
      </ul>
      <button onClick={props.listChannels}>List channels</button>
      <button onClick={props.createChannel}>Create channel</button>
      <NewDeviceForm />
    </div>
  );
}

export default connectChannels(ChannelList)
