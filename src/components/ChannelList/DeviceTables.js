import React from 'react'
import styles from './DeviceTables.css'
import TableEditor from '../TableEditor'

function DeviceTable({ table, updateTable }) {
  const [showTable, setShowTable] = React.useState(false)

  const data = (table.data || []).map((value, i) => (
    <li key={i}>{value}</li>
  ))

  return (
    <li className={styles.table}>
      <label>{table.name}</label>
      <button onClick={setShowTable.bind(null, true)}>Edit</button>
      <ul className={styles.tableData}>
        {data}
      </ul>
      {showTable && (
        <TableEditor
          table={table}
          updateTable={updateTable.bind(null, table.name)}
          onClose={() => setShowTable(false)}
        />
      )}
    </li>
  )
}

function DeviceTables({ tables, updateTable }) {
  const items = tables.map((table) => (
    <DeviceTable key={table.name} table={table} updateTable={updateTable} />
  ));

  return (
    <ul className={styles.tables}>
      {items}
    </ul>
  );
}

export default DeviceTables
