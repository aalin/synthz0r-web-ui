import React from 'react'
import RangeInput from '../RangeInput'
import styles from './DeviceParameters.css'

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

export default DeviceParameters
