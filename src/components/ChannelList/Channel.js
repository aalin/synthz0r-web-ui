import React from 'react'
import classnames from 'classnames'
import Header from './Header'
import DeviceParameters from './DeviceParameters'
import DeviceTables from './DeviceTables'
import styles from './Channel.css'

function Device({ device }) {
  if (!device) {
    return null;
  }

  return (
    <li className={styles.device}>
      <Header title={`${device.id}. ${device.name}`} />
      <DeviceParameters parameters={device.parameters} />
      <DeviceTables tables={device.tables} />
    </li>
  );
}

function DeviceList({ title, devices, addDevice }) {
  const items = devices.map(device => (
    device && <Device key={device.id} device={device} />
  ))

  return (
    <div className={styles.deviceListContainer}>
      <Header
        title={title}
        buttons={[
          <button
            key="add"
            className={styles.addButton}
            onClick={() => { console.log("hello"); addDevice("Sequencer") }}
          >
            + Add
          </button>
        ]}
      />
      <ul className={styles.deviceList}>
        {items}
      </ul>
    </div>
  )
}

function Channel({ channel, addNoteDevice, addInstrumentDevice, addEffectDevice }) {
  return (
    <li key={channel.id} className={styles.channel}>
      <span>{channel.id}. {channel.name}</span>
      <ul className={styles.deviceListList}>
        <DeviceList
          title="Note devices"
          devices={channel.noteDevices}
          addDevice={addNoteDevice}
        />
        <DeviceList
          title="Instrument"
          devices={[channel.instrument]}
          addDevice={addInstrumentDevice}
        />
        <DeviceList
          title="Effects"
          devices={channel.effectDevices}
          addDevice={addEffectDevice}
        />
      </ul>
    </li>
  )
}

export default Channel
