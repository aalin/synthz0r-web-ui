import React from 'react'
import classnames from 'classnames'
import RangeInput from '../RangeInput'
import styles from './Channel.css'

function DeviceParameter({ param }) {
  const min = param.min || 0;
  const max = param.max || 0;
  const value = param.value || 0;

  return (
    <li key={param.name} className={styles.parameter}>
      <label>{param.name}</label>
      <RangeInput
        min={min}
        max={max}
        value={value}
        onChange={() => { console.error("TODO: Implement me!") }}
      />
      <span>{value}</span>
    </li>
  )
}

function DeviceParameters({ parameters }) {
  const items = parameters.map((param) => (
    <DeviceParameter key={param.name} param={param} />
  ));

  return (
    <ul className={styles.parameters}>
      {items}
    </ul>
  );
}

function DeviceTable({ table }) {
  const data = (table.data || []).map((value, i) => (
    <li key={i}>{value}</li>
  ))

  return (
    <li className={styles.table}>
      <label>{table.name}</label>
      <ul className={styles.tableData}>{data}</ul>
    </li>
  )
}

function DeviceTables({ tables }) {
  const items = tables.map((table) => (
    <DeviceTable key={table.name} table={table} />
  ));

  return (
    <ul className={styles.tables}>
      {items}
    </ul>
  );
}

function Device({ device }) {
  if (!device) {
    return null;
  }

  return (
    <li className={styles.device}>
      <h3 className={styles.title}>{device.id}. {device.name}</h3>
      <DeviceParameters parameters={device.parameters} />
      <DeviceTables tables={device.tables} />
    </li>
  );
}

function DeviceList({ title, devices }) {
  const items = devices.map(device => (
    device && <Device key={device.id} device={device} />
  ))

  return (
    <div className={styles.deviceListContainer}>
      <h3 className={styles.title}>
        {title}
        {' '}
        <button className={styles.addButton}>+ Add</button>
      </h3>
      <ul className={styles.deviceList}>
        {items}
      </ul>
    </div>
  )
}

function Channel({ channel }) {
  return (
    <li key={channel.id} className={styles.channel}>
      <span>{channel.id}. {channel.name}</span>
      <ul className={styles.deviceListList}>
        <DeviceList title="Note devices" devices={channel.noteDevices} />
        <DeviceList title="Instrument" devices={[channel.instrument]} />
        <DeviceList title="Effects" devices={channel.effectDevices} />
      </ul>
    </li>
  )
}

export default Channel
