import React from 'react'
import styles from './DeviceTables.css'

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

export default DeviceTables
