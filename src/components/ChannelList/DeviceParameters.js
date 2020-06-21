import React from 'react'
import RangeInput from '../RangeInput'
import styles from './DeviceParameters.css'

function DeviceParameter({ param, updateParam }) {
  const [value, setValue] = React.useState(param.value || 0)

  const min = param.min || 0;
  const max = param.max || 0;

  function handleChange(e) {
    const v = Number(e.target.value)
    setValue(v)
    updateParam(param.name, v)
  }


  return (
    <li key={param.name} className={styles.parameter}>
      <label>{param.name}</label>
      <RangeInput
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <span>{value}</span>
    </li>
  )
}

function DeviceParameters({ parameters, updateParam }) {
  const items = parameters.map((param) => (
    <DeviceParameter key={param.name} param={param} updateParam={updateParam} />
  ));

  return (
    <ul className={styles.parameters}>
      {items}
    </ul>
  );
}

export default DeviceParameters
