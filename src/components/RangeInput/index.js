import React from 'react'
import classnames from 'classnames'
import styles from './styles.css'

function RangeInput({ min, max, value, onChange, className }) {
  return (
    <input
      type="range"
      min={min || 0}
      max={max || 0}
      value={value || 0}
      onChange={onChange}
      className={classnames(styles.rangeInput, className)}
    />
  )
}

export default RangeInput
