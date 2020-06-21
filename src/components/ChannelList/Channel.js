import React from 'react'
import classnames from 'classnames'
import Header from '../Header'
import DeviceParameters from './DeviceParameters'
import DeviceTables from './DeviceTables'
import styles from './Channel.css'

function Device({ device, updateTable, updateParam }) {
  if (!device) {
    return null;
  }

  return (
    <li className={styles.device}>
      <Header title={`${device.id}. ${device.name}`} />
      <DeviceParameters
        parameters={device.parameters}
        updateParam={updateParam.bind(null, device.id)}
      />
      <DeviceTables
        tables={device.tables}
        updateTable={updateTable.bind(null, device.id)}
      />
    </li>
  );
}

function DeviceList({ title, devices, addDevice, updateTable, updateParam }) {
  const items = devices.map(device => (
    device && <Device key={device.id} device={device} updateTable={updateTable} updateParam={updateParam} />
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

function Channel({ channel, addNoteDevice, addInstrumentDevice, addEffectDevice, updateTable, updateParam }) {
  return (
    <li key={channel.id} className={styles.channel}>
      <span>{channel.id}. {channel.name}</span>
      <ul className={styles.deviceListList}>
        <DeviceList
          title="Note devices"
          devices={channel.noteDevices}
          addDevice={addNoteDevice}
          updateTable={updateTable}
          updateParam={updateParam}
        />
        <DeviceList
          title="Instrument"
          devices={[channel.instrument]}
          addDevice={addInstrumentDevice}
          updateTable={updateTable}
          updateParam={updateParam}
        />
        <DeviceList
          title="Effects"
          devices={channel.effectDevices}
          addDevice={addEffectDevice}
          updateTable={updateTable}
          updateParam={updateParam}
        />
      </ul>
    </li>
  )
}

export default Channel
