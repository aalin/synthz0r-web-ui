import React from 'react'
import classnames from 'classnames'
import Header from '../Header'
import DeviceParameters from './DeviceParameters'
import DeviceTables from './DeviceTables'
import styles from './Channel.css'

function Device({ device, updateTable }) {
  if (!device) {
    return null;
  }

  return (
    <li className={styles.device}>
      <Header title={`${device.id}. ${device.name}`} />
      <DeviceParameters parameters={device.parameters} />
      <DeviceTables
        tables={device.tables}
        updateTable={updateTable.bind(null, device.id)}
      />
    </li>
  );
}

function DeviceList({ title, devices, addDevice, updateTable }) {
  const items = devices.map(device => (
    device && <Device key={device.id} device={device} updateTable={updateTable} />
  ))

  return (
    <div className={styles.deviceListContainer}>
      <Header
        title={title}
        buttons={[
          <button
            key="add"
            className={styles.addButton}
            onClick={addDevice}
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

function Channel({ channel, addNoteDevice, addInstrumentDevice, addEffectDevice, updateTable }) {
  return (
    <li key={channel.id} className={styles.channel}>
      <span>{channel.id}. {channel.name}</span>
      <ul className={styles.deviceListList}>
        <DeviceList
          title="Note devices"
          devices={channel.noteDevices}
          addDevice={addNoteDevice}
          updateTable={updateTable}
        />
        <DeviceList
          title="Instrument"
          devices={[channel.instrument]}
          addDevice={addInstrumentDevice}
          updateTable={updateTable}
        />
        <DeviceList
          title="Effects"
          devices={channel.effectDevices}
          addDevice={addEffectDevice}
          updateTable={updateTable}
        />
      </ul>
    </li>
  )
}

export default Channel
